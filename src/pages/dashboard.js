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

  const toggleContentBlock = event => {
    let contentBlock = event.currentTarget.parentElement.parentElement.parentElement;
    contentBlock.classList.toggle("content-block-collapsed");
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
          <div sx={{ textAlign: "center", marginTop: "100px" }}>
            <h1 sx={{ color: "#fff" }}>Time to verify your email</h1>
            <PrimaryButton onClick={() => verificationMail()}>
              Send verification
            </PrimaryButton>
            <p sx={{ color: "#fff" }}>{emailMsg}</p>
          </div>
        </div>
      )}
      {thisUser.emailVerified && (
        <div>
          <MainHeader>Dashboard</MainHeader>

          // Sign Out button

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

          // Characters block

          <div className="content-block content-block-collapsed">
            <SecondaryHeader>
              <div className="secondary-header-clickable" onClick={toggleContentBlock}>
                <span>Your Characters</span>
                <span className="content-block-caret">&#9660;</span>
              </div>
             </SecondaryHeader>
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
          </div>

          // Upcoming Events block

          <div className="content-block content-block-collapsed">
            <SecondaryHeader>
              <div className="secondary-header-clickable" onClick={toggleContentBlock}>
                <span>Upcuming Events</span>
                <span className="content-block-caret">&#9660;</span>
              </div>
            </SecondaryHeader>
            <EventRender
              selectedChar={selectedChar}
              setSelectedChar={setSelectedChar}
              ragImg={ragImg}
              nefImg={nefImg}
            />
          </div>
        </div>
      )}

      // Event management block

      {thisUser.uid === "1SzPu4S0vrSw4Go0eMbdsN7bQkT2" ? (
        <SecondaryHeader>Event Management</SecondaryHeader>
      ) : null}
      {thisUser.uid === "1SzPu4S0vrSw4Go0eMbdsN7bQkT2" ? <CreateEvent /> : null}

      <div className="content-block content-block-collapsed">

        <SecondaryHeader>
          <div className="secondary-header-clickable" onClick={toggleContentBlock}>
            <span>Event Management</span>
            <span className="content-block-caret">&#9660;</span>
          </div>
        </SecondaryHeader>
      <CreateEvent />
      </div>
    </div>
  )
}

export default Dashboard
