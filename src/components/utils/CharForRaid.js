/** @jsx jsx */

import { jsx } from "theme-ui"
import { useAuth, firestore, firebase } from "gatsby-theme-firebase"
import { useEffect, useState } from "react"

const CharForRaid = ({ setSelectedChar }) => {
  const { profile } = useAuth()
  const [characters, setCharacters] = useState([])
  const [currentUser, setCurrentUser] = useState("")
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setCurrentUser(user.uid)
    } else {
      if (typeof window !== `undefined`) window.location.replace(`/`)
      console.log("not signed in")
    }
  })

  const getClassColor = wowClass => {
    return "text-" + wowClass.toLowerCase()
  }

  useEffect(() => {
    firestore
      .collection("profile")
      .where("uid", "==", `${currentUser}`)
      .onSnapshot(function(snapshot) {
        let tempArray = []
        snapshot.forEach(function(doc) {
          // console.log(doc.data()) // class:"string", name="string", talents="string"
          //charList.push(doc.data())
          tempArray.push(doc.data())
        })
        setCharacters(tempArray)
      })
  }, [currentUser])
  return (
    <select
      className="input-default input-dark"
      onChange={e => setSelectedChar(e.target.value)}
    >
      <option selected hidden>
        Select a character
      </option>
      {characters.map(c => {
        return <option className={getClassColor(c.class)} key={c.name}>{c.name}</option>
      })}
    </select>
  )
}

export default CharForRaid
