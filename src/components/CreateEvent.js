/** @jsx jsx */

import { jsx } from "theme-ui"
import { firestore } from "gatsby-theme-firebase"
import { useState, useCallback } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import PrimaryButton from "./PrimaryButton"

const CreateEvent = () => {
  const [date, setDate] = useState(new Date())
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const attendees = []
  let eventID =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)

  const handleSubmit = useCallback(
    (eventID, title, date, comment, attendees) => {
      firestore
        .collection("events")
        .doc(eventID)
        .get()
        .then(function(doc) {
          if (!doc.exists) {
            console.log("event is available")
            firestore
              .collection("events")
              .doc(eventID)
              .set({
                eventID: eventID,
                title: title,
                date: date,
                comment: comment,
                attendees: attendees,
              })
              .then(() => {
                console.log("event added.")
              })
          } else {
            console.log("this event already exists")
          }
        })
    },
    [eventID, date, title, comment]
  )

  return (
    
    <div className="content-wrapper-wide" sx={{marginBottom: "50px"}}>
      <div className="management-block">
        <form>
          <DatePicker
            className="input-default"
            showTimeSelect
            name="date"
            onChange={event => setDate(event)}
            selected={date}
            value={date}
            dateFormat="MMMM Do yyyy, h:mm:ss"
          />
          <br />
          <select
            className="input-default input-dark"
            name="title"
            placeholder="Molten Core / BWL"
            onChange={event => setTitle(event.target.value)}
          >
            <option>Select a raid</option>
            <option>Molten Core</option>
            <option>Blackwing Lair</option>
            <option>Temple of Ahn'Qiraj</option>
            <option>Naxxramas</option>
          </select>
          <br />
          <textarea
            className="input-default input-dark"
            name="comment"
            placeholder="Description for the event."
            onBlur={event => setComment(event.target.value)}
            raws="3"
            sx={{width: 'calc(100% - 40px)', resize: "vertical", minHeight: "50px", maxHeight: "200px"}}
          />
          <br />
          <PrimaryButton
            type="submit"
            onClick={e => {
              e.preventDefault()
              if (date == null || title == "" || comment == "") {
                console.log("Fill out the whole form")
              } else {
                handleSubmit(eventID, title, date, comment, attendees)
              }
            }}
          >
            Create New Event
          </PrimaryButton>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent
