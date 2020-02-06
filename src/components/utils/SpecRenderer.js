/** @jsx jsx */

import { jsx } from "theme-ui"
import { useState, useCallback } from "react"
import { PropTypes } from "prop-types"
import { firestore } from "gatsby-theme-firebase"
import PrimaryButton from "../PrimaryButton"

const SpecRenderer = ({ profile, createCharacter }) => {
  const [name, setName] = useState("")
  const [vocation, setVocation] = useState("")
  const [spec, setSpec] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const specList = vocation => {

    const generateSpecsArray = wowClass => {
      switch (wowClass) {
        case "Druid":
          return ({dps: true, tank: true, healer: true})
        case "Hunter":
          return ({dps: true, tank: false, healer: false})
        case "Mage":
          return ({dps: true, tank: false, healer: false})
        case "Paladin":
          return ({dps: true, tank: true, healer: true})
        case "Priest":
          return ({dps: true, tank: false, healer: true})
        case "Rogue":
          return ({dps: true, tank: false, healer: false})
        case "Warlock":
          return ({dps: true, tank: false, healer: false})
        case "Warrior":
          return ({dps: true, tank: true, healer: false})
        default:
          return ({dps: false, tank: false, healer: false})
      }
    }

    const generateSelectInterface = specsArray => {
      if (!specsArray.dps) return false;
      return (
        <span>
          <select className="list-default" onChange={event => setSpec(event.target.value)}>
            <option defaultValue hidden>Choose your role</option>
            {specsArray.dps ? <option>DPS</option> : ""}
            {specsArray.tank ? <option>Tank</option> : ""}
            {specsArray.healer ? <option>Healer</option> : ""}
          </select>
        </span>
      )
    }

    return generateSelectInterface(generateSpecsArray(vocation));
  }
  const classList = (
    <span>
      <select 
        className="list-default"
        onChange={event => {
          setVocation(event.target.value)
        }}
      >
        <option defaultValue hidden>Select your class</option>
        <option className="text-druid">Druid</option>
        <option className="text-hunter">Hunter</option>
        <option className="text-mage">Mage</option>
        <option className="text-paladin">Paladin</option>
        <option className="text-priest">Priest</option>
        <option className="text-rogue">Rogue</option>
        <option className="text-warlock">Warlock</option>
        <option className="text-warrior">Warrior</option>
      </select>
    </span>
  )
  const handleSubmit = useCallback(
    (name, vocation, spec) => {
      firestore
        .collection("profile")
        .doc(name)
        .get()
        .then(function(doc) {
          if (!doc.exists) {
            console.log("name is available")
            firestore
              .collection("profile")
              .doc(name)
              .set({
                name: name,
                class: vocation,
                talents: spec,
                uid: profile.uid,
              })
              .then(() => {
                setSuccessMsg("Character added.")
                setTimeout(() => {
                  setSuccessMsg("")
                }, 3000)
              })
          } else {
            setErrorMsg("this name already exists")
            setTimeout(() => {
              setErrorMsg("")
            }, 3000)
          }
        })
    },
    [name, vocation, spec]
  )

  return (
    <div sx={{ display: createCharacter ? "block" : "none" }}>
      <span>
        <input className="input-default"
          placeholder="Character name"
          onChange={event => setName(event.target.value)}
        />
      </span>
      <span>{classList}</span>
      <span>{specList(vocation)}</span>
      <div>
        <PrimaryButton
          type="submit"
          onClick={e => {
            e.preventDefault()
            if (name == "" || vocation == "" || spec == "") {
              setErrorMsg("Please fill out the whole form")
              setTimeout(() => {
                setErrorMsg("")
              }, 3000)
            } else {
              handleSubmit(name, vocation, spec)
              setSuccessMsg("Character created!")
              setTimeout(() => {
                window.location.reload()
              }, 3000)
            }
          }}
        >
          Add
        </PrimaryButton>
        <PrimaryButton
         onClick={() => {e.preventDefault();}}>Cancel
        </PrimaryButton>
      </div>
      <p sx={{ color: "#bb2124" }}>{errorMsg}</p>
      <p sx={{ color: "#22bb33" }}>{successMsg}</p>
    </div>
  )
}
SpecRenderer.propTypes = {
  profile: PropTypes.object.isRequired,
  createCharacter: PropTypes.bool.isRequired,
}
export default SpecRenderer
