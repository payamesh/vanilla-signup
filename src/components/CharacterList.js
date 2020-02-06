/** @jsx jsx */

import { jsx } from "theme-ui"
import { useAuth, firestore, firebase } from "gatsby-theme-firebase"
import { useEffect, useState } from "react"
import { PropTypes } from "prop-types"
import DeleteCharacter from "./utils/DeleteCharacter"
import PrimaryButton from "./PrimaryButton"
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

  const updateCharacter = () => {
    console.log("clicky-clicky update")
  }

  const removeCharacter = () => {
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
              name: props.name,
              class: props.vocation,
              talents: props.spec,
              uid: props.profile.uid,
            })
            .then(() => {
              console.log("Character added.")
            })
        } else {
          console.log("this name already exists")
        }
      })
  }

  return (
    <div>
      <table className="characters-table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
          {characters.map(c => {
            return (
              <tr sx={{ color: "white" }}>
                <td key={c.name}>{c.name}</td>
                <td key={c.class}>{c.class}</td>
                <td key={c.talents}>{c.talents}</td>
                <td>
                  <PrimaryButton onClick={() => updateCharacter()}>
                    Edit
                  </PrimaryButton>
                  <SecondaryButton onClick={() => DeleteCharacter(c.name)}>
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
