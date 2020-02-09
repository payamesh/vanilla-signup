/** @jsx jsx */

import { jsx } from "theme-ui"

import SpecRenderer from "../components/utils/SpecRenderer"
import EventRender from "../components/EventRender"
import CharacterList from "../components/CharacterList"
import CreateEvent from "../components/CreateEvent"
import PrimaryButton from "../components/PrimaryButton"
import SecondaryButton from "../components/SecondaryButton"
import { graphql, useStaticQuery } from "gatsby"
import { auth, useAuth, firebase } from "gatsby-theme-firebase"
import { useState } from "react"
import MainHeader from "../components/utils/MainHeader"
import SecondaryHeader from "../components/utils/SecondaryHeader"

const Dashboard = () => {
  const [createCharacter, setCreateCharacter] = useState(false)
  const onToggleCharacter = () => setCreateCharacter(!createCharacter)
  const [selectedChar, setSelectedChar] = useState([])
  const [emailMsg, setEmailMsg] = useState([])
  let user = firebase.auth().currentUser

  const { isLoggedIn, profile } = useAuth()

  const [thisUser, setUser] = useState("")

  const data = useStaticQuery(graphql`
    query MyQuery {
      allImageSharp {
        totalCount
        nodes {
          fluid {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)
  const ragImg = data.allImageSharp.nodes[1].fluid
  const nefImg = data.allImageSharp.nodes[0].fluid
  while (user && thisUser === "") {
    return setUser({
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
      emailVerified: user.emailVerified,
      uid: user.uid,
    })
  }
  const verificationMail = () => {
    user
      .sendEmailVerification()
      .then(function() {
        setEmailMsg("A verification mail has been sent")
      })
      .catch(function(error) {
        // An error happened.
      })
  }

  return (
    <div>
      {!thisUser.emailVerified && (
        <div>
          <div
            sx={{
              position: ["absolute"],
              top: ["100%", "10px"],
              right: ["50%", "10px"],
              transform: ["translateX(50%)", "none"],
            }}
          >
            <SecondaryButton
              style={{
                ":hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => auth.signOut()}
            >
              Sign Out
            </SecondaryButton>
          </div>
          <div>
            <h1 sx={{ color: "#fff" }}>Time to verify your email</h1>
            <button onClick={() => verificationMail()}>
              Send verification
            </button>
            <p sx={{ color: "#fff" }}>{emailMsg}</p>
          </div>
        </div>
      )}
      <MainHeader>Dashboard</MainHeader>
      <SecondaryHeader>Character Management</SecondaryHeader>
      {thisUser.emailVerified && (
        <div className="content-wrapper-wide">
          <div className="management-block">
            <div>
              <CharacterList
                setSelectedChar={setSelectedChar}
                selectedChar={selectedChar}
                showDelete={true}
              />
            </div>
            <form className="character-add-form" method="POST">
              <div>
                <PrimaryButton
                  onClick={e => {
                    e.preventDefault()
                    onToggleCharacter()
                  }}
                >
                  Add a character
                </PrimaryButton>
              </div>
              <SpecRenderer
                createCharacter={createCharacter}
                profile={profile}
              />
            </form>
          </div>
        </div>
      )}
      <SecondaryHeader>Upcoming Events</SecondaryHeader>
      <EventRender
        selectedChar={selectedChar}
        setSelectedChar={setSelectedChar}
        ragImg={ragImg}
        nefImg={nefImg}
      />
      {thisUser.uid === "ThngE79hWaYEXYNnUxqdJ04H12i2" ? (
        <SecondaryHeader>Event Management</SecondaryHeader>
      ) : null}
      {thisUser.uid === "ThngE79hWaYEXYNnUxqdJ04H12i2" ? <CreateEvent /> : null}
    </div>
  )
}

export default Dashboard
