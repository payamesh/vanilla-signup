/** @jsx jsx */

import { jsx } from "theme-ui"
import { useAuth, firestore, firebase } from "gatsby-theme-firebase"
import { useEffect, useState } from "react"
import { PropTypes } from "prop-types"
import DeleteCharacter from "./utils/DeleteCharacter"
import SecondaryButton from "../components/SecondaryButton"

const CharacterList = ({ selectedChar, setSelectedChar, showDelete }) => {
  const [characters, setCharacters] = useState([])

  const { isLoading, isLoggedIn, profile } = useAuth()

  const [currentUser, setCurrentUser] = useState("")
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
      <select onChange={event => setSelectedChar(event.target.value)}>
        <option>View your characters</option>
        {characters.map(c => {
          return <option key={c.name}>{c.name}</option>
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
          DeleteCharacter(selectedChar)
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        }}
      >
        Delete Character
      </SecondaryButton>
    </div>
  )
}
CharacterList.propTypes = {
  showDelete: PropTypes.bool,
  setSelectedChar: PropTypes.func,
}
export default CharacterList
