/** @jsx jsx */

import { jsx } from "theme-ui"
import { useAuth, firestore, firebase } from "gatsby-theme-firebase"
import { useEffect, useState } from "react"

const CharForRaid = ({ setSelectedChar }) => {
  const { profile } = useAuth()
  const [characters, setCharacters] = useState([])
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
    <select className="input-default" onChange={e => setSelectedChar(e.target.value)}>
      <option selected hidden>Select a character</option>
      {characters.map(c => {
        return <option key={c.name}>{c.name}</option>
      })}
    </select>
  )
}

export default CharForRaid
