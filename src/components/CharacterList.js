/** @jsx jsx */

import { jsx } from "theme-ui"
import { useAuth, firestore, firebase } from "gatsby-theme-firebase"
import { useEffect, useState } from "react"
import { PropTypes } from "prop-types"
import DeleteCharacter from "./utils/DeleteCharacter"
import PrimaryButton from "./PrimaryButton"
import SecondaryButton from "../components/SecondaryButton"

import imgTank from "../img/icons/role_tank.png"
import imgDPS from "../img/icons/role_dps.png"
import imgHealer from "../img/icons/role_healer.png"

const CharacterList = () => {
  const [characters, setCharacters] = useState([])
  const { profile } = useAuth()
  const [currentUser, setCurrentUser] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setCurrentUser(user.uid)
    } else {
      if (typeof window !== `undefined`) window.location.replace(`/`)
      console.log("not signed in")
    }
  })
  useEffect(() => {
    firestore
      .collection("profile")
      .where("uid", "==", `${currentUser}`)
      .onSnapshot(function(snapshot) {
        let tempArray = []
        snapshot.forEach(function(doc) {
          // console.log(doc.data()) // class:"string", name="string", talents="string"
          tempArray.push(doc.data())
        })
        setCharacters(tempArray)
      })
  }, [profile])

  const updateCharacter = () => {
    console.log("clicky-clicky update")
  }

  const getClassColor = wowClass => {
    return "text-" + wowClass.toLowerCase()
  }

  const getRoleImg = wowRole => {
    if (wowRole == "Tank") return imgTank
    if (wowRole == "DPS") return imgDPS
    if (wowRole == "Healer") return imgHealer

    return false
  }

  return (
    <div>
      <table className="characters-table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th className="small-screen-hidden">Role</th>
            <th>Actions</th>
          </tr>
          {characters.map(c => {
            return (
              <tr key={c.name} sx={{ color: "white" }}>
                <td key={c.name} className={getClassColor(c.class)}>
                  {c.name}
                </td>
                <td key={c.class} className={getClassColor(c.class)}>
                  {c.class}
                </td>
                <td key={c.talents} className="small-screen-hidden">
                  <img className="role-icon" src={getRoleImg(c.talents)} />
                  {c.talents}
                </td>
                <td>
                  <PrimaryButton onClick={() => updateCharacter()}>
                    Edit
                  </PrimaryButton>
                  <SecondaryButton
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this item?"
                        )
                      )
                        DeleteCharacter(c.name)
                    }}
                  >
                    Delete
                  </SecondaryButton>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
CharacterList.propTypes = {
  showDelete: PropTypes.bool,
  setSelectedChar: PropTypes.func,
}
export default CharacterList
