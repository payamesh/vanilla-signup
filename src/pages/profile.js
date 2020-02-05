/** @jsx jsx */

import { jsx } from "theme-ui"
import { auth, useAuth, firestore, firebase } from "gatsby-theme-firebase"
import { useEffect, useState } from "react"

const ProfilePage = () => {
  const [characters, setCharacters] = useState([])
  const { isLoading, isLoggedIn, profile } = useAuth()
  const [currentUser, setCurrentUser] = useState("")
  let charList = []
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setCurrentUser(user.uid)
    } else {
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
      {isLoading && <p>Loading..</p>}
      {isLoggedIn && profile && (
        <div>
          <p>Hello {profile.displayName}</p>
          <h2>Your Characters</h2>
          <ul>
            {characters.map(c => {
              return (
                <div sx={{ margin: "40px" }} key={c.name}>
                  <li>{c.name}</li>
                  <li>{c.class}</li>
                  <li>{c.talents}</li>
                </div>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
