/** @jsx jsx */

import { jsx } from "theme-ui"
import { firestore, firebase } from "gatsby-theme-firebase"
import { useState, useEffect, useCallback } from "react"
import BackgroundImage from "gatsby-background-image"
import { PropTypes } from "prop-types"
import CharacterList from "./CharacterList"
import AttendeeList from "./AttendeeList"
import EventInfo from "./EventInfo"
import PrimaryButton from "./PrimaryButton"

const EventRender = ({ ragImg, nefImg, selectedChar, setSelectedChar }) => {
  let addedChar

  const signToRaid = useCallback(
    (selectedChar, eventID) => {
      firestore
        .collection("profile")
        .where("name", "==", selectedChar)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            addedChar = doc.data()
          })
          setSelectedChar(addedChar)
        })
      firestore
        .collection("events")
        .get()
        .then(function(doc) {
          if (!doc.exists) {
            console.log("name is available")
            firestore
              .collection("events")
              .doc(eventID)
              .update({
                attendees: firebase.firestore.FieldValue.arrayUnion({
                  addedChar,
                }),
              })
              .then(() => {
                console.log("Character added to raid.")
              })
          } else {
            console.log("this char is already signed to this raid")
          }
        })
    },
    [selectedChar]
  )

  const [events, setEvent] = useState([])
  useEffect(() => {
    firestore
      .collection("events")
      .get()
      .then(function(querySnapshot) {
        const eventList = []
        querySnapshot.forEach(function(doc) {
          eventList.push(doc.data())
        })
        setEvent(eventList)
      })
  }, [])
  return (
    <div
      sx={{
        width: "90vw",
        height: "auto",
        margin: "0 auto",
        textAlign: "center",
        marginTop: "150px",
      }}
    >
      <h2>UPCOMING RAIDS</h2>
      {/* print eventSection here :-)) */}
      {events.map(event => {
        const time = new Date(1970, 0, 1)
        time.setSeconds(event.date.seconds + 7200)
        const eventDate = time.toLocaleDateString("en-GB", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        const eventTime = time.toJSON().substring(11, 16)

        return (
          <BackgroundImage
            style={{
              height: `50vh`,
              width: `100%`,
              backgroundColor: `transparent`,
              backgroundSize: `cover`,
              backgroundPosition: `center center`,
              display: `flex`,
              flexDirection: "column",
              alignItems: `center`,
              marginBottom: "50px",
            }}
            key={event.date}
            fluid={event.title == "Molten Core" ? ragImg : nefImg}
          >
            <div
              sx={{
                height: "100%",
                width: "100%",
                backgroundColor: "rgba(16,26,52,.7)",
                zIndex: -5,
              }}
            >
              <EventInfo
                eventDate={eventDate}
                eventTime={eventTime}
                eventComment={event.comment}
              />
              <AttendeeList attendees={event.attendees} />

              <CharacterList
                setSelectedChar={setSelectedChar}
                showDelete={false}
              />
              <div sx={{ margin: "10px 0" }}>
                <PrimaryButton
                  onClick={() => signToRaid(selectedChar, event.eventID)}
                >
                  Signup to raid
                </PrimaryButton>
              </div>
            </div>
          </BackgroundImage>
        )
      })}
    </div>
  )
}
EventRender.propTypes = {
  ragImg: PropTypes.object.isRequired,
  nefImg: PropTypes.object.isRequired,
  selectedChar: PropTypes.array.isRequired,
  setSelectedChar: PropTypes.func.isRequired,
}
export default EventRender
