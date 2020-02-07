/** @jsx jsx */

import { jsx } from "theme-ui"
import { PropTypes } from "prop-types"

const AttendeeList = ({ attendees }) => {
  const signUps = {
    priests: [],
    paladins: [],
    hunters: [],
    rogues: [],
    warlocks: [],
    druids: [],
    mages: [],
    warriors: [],
  }

  attendees.map(attendee => {
    switch (attendee.addedChar.class) {
      case "Priest":
        signUps.priests.push(attendee)
        break
      case "Paladin":
        signUps.paladins.push(attendee)
        break
      case "Hunter":
        signUps.hunters.push(attendee)
        break
      case "Rogue":
        signUps.rogues.push(attendee)
        break
      case "Druid":
        signUps.druids.push(attendee)
        break
      case "Warlock":
        signUps.warlocks.push(attendee)
        break
      case "Mage":
        signUps.mages.push(attendee)
        break
      case "Warrior":
        signUps.warriors.push(attendee)
        break

      default:
        break
    }
  })

  const printClass = classToRender => {
    return (
      <div>
        {classToRender.map(players => {
          return (
            <div key={players.addedChar.name}>
              <li sx={{ color: "#fff", listStyleType: "none" }}>
                {players.addedChar.name} -{players.addedChar.talents}
              </li>
              <hr sx={{ marginY: "2px", borderWidth: "0.5px" }} />
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <div
      sx={{
        width: "100%",
        height: ["30vh"],
        display: "grid",
        gridTemplateColumns: ["repeat(4, 1fr)", "repeat(8, 1fr)"],
        "&>div>h4": {
          textShadow: "0px 0px 10px #fff",
        },
      }}
    >
      <div>
        <h4>Priests</h4>
        <ul sx={{ margin: "0", padding: "0" }}>
          {printClass(signUps.priests)}
        </ul>
      </div>
      <div>
        <h4 sx={{ color: "pink" }}>Paladins</h4>
        <ul sx={{ margin: "0", padding: "0" }}>
          {printClass(signUps.paladins)}
        </ul>
      </div>
      <div>
        <h4 sx={{ color: "darkgreen" }}>Hunters</h4>
        <ul sx={{ margin: "0", padding: "0" }}>
          {printClass(signUps.hunters)}
        </ul>
      </div>
      <div>
        <h4 sx={{ color: "yellow" }}>Rogues</h4>
        <ul sx={{ margin: "0", padding: "0" }}>{printClass(signUps.rogues)}</ul>
      </div>
      <div>
        <h4 sx={{ color: "purple" }}>Warlocks</h4>
        <ul sx={{ margin: "0", padding: "0" }}>
          {printClass(signUps.warlocks)}
        </ul>
      </div>
      <div>
        <h4 sx={{ color: "orange" }}>Druids</h4>
        <ul sx={{ margin: "0", padding: "0" }}>{printClass(signUps.druids)}</ul>
      </div>
      <div>
        <h4 sx={{ color: "brown" }}>Warriors</h4>
        <ul sx={{ margin: "0", padding: "0" }}>
          {printClass(signUps.warriors)}
        </ul>
      </div>
      <div>
        <h4 sx={{ color: "blue" }}>Mages</h4>
        <ul sx={{ margin: "0", padding: "0" }}>{printClass(signUps.mages)}</ul>
      </div>
    </div>
  )
}

AttendeeList.propTypes = {
  attendees: PropTypes.array.isRequired,
}
export default AttendeeList
