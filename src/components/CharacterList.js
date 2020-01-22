/** @jsx jsx */

import { jsx } from "theme-ui"
import { useAuth, firestore, firebase } from "gatsby-theme-firebase"
import { useEffect, useState } from "react"
import DeleteCharacter from "./utils/DeleteCharacter"

const CharacterList = () => {
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
      {isLoading && <p> Loading.. </p>}
      {isLoggedIn && profile && (
        <div>
          <h2> Your Characters </h2>

            {characters.map(c => {
              let classColor = ""
              switch (c.class) {
                case "Priest":
                  classColor = "white"
                  break

                case "Warrior":
                  classColor = "brown"
                  break
                case "Druid":
                  classColor = "brown"
                  break

                case "Shaman":
                  classColor = "pink"
                  break

                case "Paladin":
                  classColor = "pink"
                  break
                case "Warlock":
                  classColor = "purple"
                  break
                case "Mage":
                  classColor = "blue"
                  break

                case "Rogue":
                  classColor = "yellow"
                  break

                case "Hunter":
                  classColor = "green"
                  break

                default:
                  break
              }
              return (
                <div key={c.name}>
                <select
                  sx={{
                    margin: "40px",
                  }}
                >
                  <option  sx={{
                      color: classColor,
                    }}>{c.name}</option>
                  <option>
                    {c.class}
                  </option>
                  <option> {c.talents} </option>
                </select>
                  <button sx={{
                     ':hover':{
                      cursor:'pointer'
                  }
                  }} onClick={() => {
                    DeleteCharacter(c.name)
                    setTimeout(() => {
                      window.location.reload();
                      
                  }, 1500);
                  }}>
                    Delete
                  </button>
                  </div>

              )
            })}

        </div>
      )}
    </div>
  )
}

export default CharacterList