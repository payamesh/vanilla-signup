/** @jsx jsx */

import { jsx } from "theme-ui"

import SpecRenderer from "../components/utils/SpecRenderer"
import EventRender from "../components/EventRender"
import CharacterList from "../components/CharacterList"
import CreateEvent from "../components/CreateEvent"
import PrimaryButton from "../components/PrimaryButton"
import SecondaryButton from "../components/SecondaryButton"
import { graphql, useStaticQuery } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import { auth, useAuth, firebase } from "gatsby-theme-firebase"
import { useState } from "react"

const Dashboard = () => {
  const [createCharacter, setCreateCharacter] = useState(false)
  const onToggleCharacter = () => setCreateCharacter(!createCharacter)
  const [selectedChar, setSelectedChar] = useState([])

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
  const [thisUser, setUser] = useState("")
  let user = firebase.auth().currentUser

  while (user && thisUser === "") {
    return setUser(user.uid)
  }
  const { isLoggedIn, profile } = useAuth()
  const ragImg = data.allImageSharp.nodes[1].fluid
  const nefImg = data.allImageSharp.nodes[0].fluid
  return (
    <div>
      <div className="main-header">
        <h1>Dashboard</h1>
      </div>
      <div className="main-header">
        <h2>Character Management</h2>
      </div>
      {isLoggedIn && (
        <div className="content-wrapper" sx={{ background: "#222" }}>
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
            <SpecRenderer createCharacter={createCharacter} profile={profile} />
          </form>
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
        </div>
      )}
      <div className="main-header">
        <h2>Upcoming Events</h2>
      </div>
      <EventRender
        selectedChar={selectedChar}
        setSelectedChar={setSelectedChar}
        ragImg={ragImg}
        nefImg={nefImg}
      />
      <div>
        {thisUser === "ThngE79hWaYEXYNnUxqdJ04H12i2" ? <CreateEvent /> : null}
      </div>
    </div>
  )
}

export default Dashboard
