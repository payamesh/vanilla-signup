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
      case "Druid":
        signUps.druids.push(attendee)
        break
      case "Hunter":
        signUps.hunters.push(attendee)
        break
      case "Mage":
        signUps.mages.push(attendee)
        break
      case "Paladin":
        signUps.paladins.push(attendee)
        break
      case "Priest":
        signUps.priests.push(attendee)
        break
      case "Rogue":
        signUps.rogues.push(attendee)
        break
      case "Warlock":
        signUps.warlocks.push(attendee)
        break
      case "Warrior":
        signUps.warriors.push(attendee)
        break
      default:
        break
    }
  })

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  const printClass = classToRender => {
    return (
      <div>
        {classToRender.map(players => {
          return (
            <div key={players.addedChar.name}>
              <li>
                {capitalize(players.addedChar.name.toLowerCase())} - {players.addedChar.talents}
              </li>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="attendee-list">
      <div>
        <h4 className="text-druid">Druids</h4>
        <ul>{printClass(signUps.druids)}</ul>
      </div>
      <div>
        <h4 className="text-hunter">Hunters</h4>
        <ul>{printClass(signUps.hunters)}</ul>
      </div>
      <div>
        <h4 className="text-mage">Mages</h4>
        <ul>{printClass(signUps.mages)}</ul>
      </div>
      <div>
        <h4 className="text-paladin">Paladins</h4>
        <ul>{printClass(signUps.paladins)}</ul>
      </div>
      <div>
        <h4 className="text-priest">Priests</h4>
        <ul>{printClass(signUps.priests)}</ul>
      </div>
      <div>
        <h4 className="text-rogue">Rogues</h4>
        <ul>{printClass(signUps.rogues)}</ul>
      </div>
      <div>
        <h4 className="text-warlock">Warlocks</h4>
        <ul>{printClass(signUps.warlocks)}</ul>
      </div>
      <div>
        <h4 className="text-warrior">Warriors</h4>
        <ul>{printClass(signUps.warriors)}</ul>
      </div>
    </div>
  )
}

AttendeeList.propTypes = {
  attendees: PropTypes.array.isRequired,
}
export default AttendeeList
