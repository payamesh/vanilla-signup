/** @jsx jsx */

import { jsx } from "theme-ui"
import { PropTypes } from "prop-types"

import imgTank from "../img/icons/role_tank.png"
import imgDPS from "../img/icons/role_dps.png"
import imgHealer from "../img/icons/role_healer.png"

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

  for (const key in attendees) {
    switch (attendees[key].class) {
      case "Druid":
        signUps.druids.push(attendees[key])
        break
      case "Hunter":
        signUps.hunters.push(attendees[key])
        break
      case "Mage":
        signUps.mages.push(attendees[key])
        break
      case "Paladin":
        signUps.paladins.push(attendees[key])
        break
      case "Priest":
        signUps.priests.push(attendees[key])
        break
      case "Rogue":
        signUps.rogues.push(attendees[key])
        break
      case "Warlock":
        signUps.warlocks.push(attendees[key])
        break
      case "Warrior":
        signUps.warriors.push(attendees[key])
        break
      default:
        break
    }
  }

  const capitalize = s => {
    if (typeof s !== "string") return ""
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  const getRoleImg = wowRole => {
    if (wowRole == "Tank") return imgTank
    if (wowRole == "DPS") return imgDPS
    if (wowRole == "Healer") return imgHealer

    return false
  }

  const printClass = classToRender => {
    return (
      <div>
        {classToRender.map(players => {
          return (
            <div key={players.name}>
              <li>
                <img className="role-image" src={getRoleImg(players.talents)} />{" "}
                {capitalize(players.name.toLowerCase())}
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
