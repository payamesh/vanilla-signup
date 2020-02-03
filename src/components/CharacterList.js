/** @jsx jsx */

import { jsx } from "theme-ui"
import { useAuth, firestore, firebase } from "gatsby-theme-firebase"
import { useEffect, useState } from "react"
import { PropTypes } from "prop-types"
import DeleteCharacter from "./utils/DeleteCharacter"
import SecondaryButton from "../components/SecondaryButton"

const CharacterList = ({ selectedChar, setSelectedChar, showDelete }) => {
  const [characters, setCharacters] = useState([])
  const { profile } = useAuth()
  const [currentUser, setCurrentUser] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  let charList = []
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
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // console.log(doc.data()) // class:"string", name="string", talents="string"
          charList.push(doc.data())
        })
        setCharacters(charList)
      })
  }, [profile])

  return (
    <div>
      <select
        sx={{ height: "40px", backgroundColor: "#4eb5f1", color: "#fff" }}
        onChange={event => setSelectedChar(event.target.value)}
      >
        <option>View your characters</option>
        {characters.map(c => {
          return (
            <option
              sx={{
                height: "40px",
                backgroundColor: "black",
                color: "#fff",
              }}
              key={c.name}
            >
              {c.name}
            </option>
          )
        })}
      </select>
      <SecondaryButton
        style={{
          display: showDelete ? "block" : "none",
          ":hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => {
          if (typeof selectedChar == "string") {
            DeleteCharacter(selectedChar)
            setSuccessMsg("Character successfully deleted.")
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          } else {
            setErrorMsg("Choose a character to delete.")
            setTimeout(() => {
              setErrorMsg("")
            }, 3000)
          }
        }}
      >
        Delete Character
      </SecondaryButton>
      <p sx={{ color: "#bb2124" }}>{errorMsg}</p>
      <p sx={{ color: "#22bb33" }}>{successMsg}</p>
    </div>
  )
}
CharacterList.propTypes = {
  showDelete: PropTypes.bool,
  setSelectedChar: PropTypes.func,
}
export default CharacterList
