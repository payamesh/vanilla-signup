/** @jsx jsx */

import { jsx } from "theme-ui"
import { firestore, firebase } from "gatsby-theme-firebase"
import { useState, useEffect, useCallback } from "react"
import BackgroundImage from "gatsby-background-image"
import { PropTypes } from "prop-types"
import AttendeeList from "./AttendeeList"
import EventInfo from "./EventInfo"
import PrimaryButton from "./PrimaryButton"
import CharForRaid from "./utils/CharForRaid"

const EventRender = ({ ragImg, nefImg, selectedChar, setSelectedChar }) => {
  let addedChar = []
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

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
          if (addedChar.length === 0) {
            setErrorMsg("Choose a Character")
            setTimeout(() => {
              setErrorMsg("")
            }, 3000)
          } else {
            setSelectedChar(addedChar)
            firestore
              .collection("events")
              .get()
              .then(function(doc) {
                if (!doc.exists) {
                  firestore
                    .collection("events")
                    .doc(eventID)
                    .get()
                    .then(function(doc) {
                      const docData = doc.data()

                      firestore
                        .collection("events")
                        .doc(eventID)
                        .set(
                          {
                            ...docData,
                            attendees: {
                              ...docData.attendees,
                              [addedChar.name]: {
                                name: addedChar.name,
                                class: addedChar.class,
                                talents: addedChar.talents,
                              },
                            },
                          },
                          {
                            merge: true,
                          }
                        )
                        // .update({
                        //   attendees: firebase.firestore.FieldValue.arrayUnion(
                        //     {
                        //       name: addedChar.name,
                        //       class: addedChar.class,
                        //       talents: addedChar.talents,
                        //     }
                        //   ),
                        // })
                        .then(() => {
                          setSuccessMsg("Character added to raid.")
                          setTimeout(() => {
                            setSuccessMsg("")
                          }, 3000)
                        })

                      for (const key in docData.attendees) {
                        if (key == selectedChar) {
                          setErrorMsg(
                            "this char is already signed to this raid"
                          )
                          let atts = docData

                          delete docData.attendees[addedChar.name]

                          firestore
                            .collection("events")
                            .doc(eventID)
                            .set(atts)
                        }
                      }
                    })
                }
              })
          }
        })
    },
    [selectedChar]
  )

  const [events, setEvent] = useState([])
  useEffect(() => {
    firestore.collection("events").onSnapshot(function(snapshot) {
      const eventList = []
      snapshot.forEach(function(doc) {
        eventList.push(doc.data())
      })
      setEvent(eventList)
    })
  }, [])
  return (
    <div className="content-wrapper-wide">
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
              marginBottom: "50px",
              borderRadius: "5px",
            }}
            key={event.date}
            fluid={event.title == "Molten Core" ? ragImg : nefImg}
          >
            <div
              sx={{
                backgroundColor: "rgba(16,26,52,.7)",
                zIndex: -5,
              }}
            >
              <EventInfo
                eventName={event.title}
                eventDate={eventDate}
                eventTime={eventTime}
                eventComment={event.comment}
              />{" "}
              <AttendeeList attendees={event.attendees} />{" "}
              <div className="event-controls">
                <CharForRaid setSelectedChar={setSelectedChar} />{" "}
                <PrimaryButton
                  onClick={() => signToRaid(selectedChar, event.eventID)}
                >
                  Signup to raid{" "}
                </PrimaryButton>{" "}
                <PrimaryButton
                  onClick={() => signToRaid(selectedChar, event.eventID)}
                >
                  remove from raid{" "}
                </PrimaryButton>{" "}
                <p
                  sx={{
                    color: "#bb2124",
                  }}
                >
                  {" "}
                  {errorMsg}{" "}
                </p>{" "}
                <p
                  sx={{
                    color: "#22bb33",
                  }}
                >
                  {" "}
                  {successMsg}{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </BackgroundImage>
        )
      })}{" "}
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
