/** @jsx jsx */

import { jsx } from "theme-ui"
import { firestore, firebase } from "gatsby-theme-firebase"
import { useState, useEffect, useCallback } from "react"
import BackgroundImage from "gatsby-background-image"
import { PropTypes } from "prop-types"
import AttendeeList from "./AttendeeList"
import EventInfo from "./EventInfo"
import PrimaryButton from "./PrimaryButton"
import SecondaryButton from "./SecondaryButton"
import CharForRaid from "./utils/CharForRaid"

import mcImg from "../img/events/mc.jpg"
import bwlImg from "../img/events/bwl.jpg"
import aq40Img from "../img/events/aq40.jpg"
import naxxImg from "../img/events/naxx.jpg"
import aq20Img from "../img/events/aq20.jpg"
import zgImg from "../img/events/zg.jpg"

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

  const eventBackgroundImg = eventName => {

    let src = "";

    if (eventName == "Molten Core") src = mcImg;
    else if (eventName == "Blackwing Lair") src = bwlImg;
    else if (eventName == "Temple of Ahn'Qiraj") src = aq40Img;
    else if (eventName == "Naxxramas") src = naxxImg;
    else if (eventName == "Zul'Gurub") src = zgImg;
    else if (eventName == "Ruins of Ahn'Qiraj") src = aq20Img;

    return {
      image: <img src={src} />,
      imgsrc: src 
    }
  }

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
              backgroundImage: "url(" + eventBackgroundImg(event.title).imgsrc + ")"
            }}
            key={event.date}
            fluid={eventBackgroundImg(event.title).image}
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
                  Sign Up{" "}
                </PrimaryButton>{" "}
                <SecondaryButton
                  onClick={() => signToRaid(selectedChar, event.eventID)}
                >
                  Remove{" "}
                </SecondaryButton>{" "}
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
