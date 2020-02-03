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
    <div
      sx={{
        color: ["white"],
        html: {
          boxSizing: "border-box",
        },
      }}
    >
      <div
        style={{
          height: `auto`,
          width: `100vw`,
          backgroundColor: `transparent`,
          backgroundSize: `cover`,
          backgroundPosition: `center center`,
          display: `flex`,
          alignItems: `center`,
          position: "absolute",
          backgroundAttachment: "fixed",
          zIndex: -6,
          margin: "-8px",
        }}
      >
        <div
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(16,26,52,1)",
            zIndex: -5,
          }}
        >
          {isLoggedIn && (
            <div
              sx={{
                paddingX: ['20px',"150px"],
                zIndex: 1,
              }}
            >
              <h1 sx={{ textAlign: "center" }}>Welcome to EzClap</h1>
              <div
                sx={{
                  display: "flex",
                  alignContent: "space-between",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  width: "100%",
                  margin: "10px auto",
                  justifyContent: "space-between",
                }}
              >
                <form
                  sx={{
                    width: ['100%',"50%"],
                    margin: "0 auto",
                    textAlign: "center",
                    "& > div": { marginY: "20px" },
                  }}
                  method="POST"
                >
                  <div sx={{ height: "20%", width: "100%" }}>
                    <PrimaryButton
                      onClick={e => {
                        e.preventDefault()
                        onToggleCharacter()
                      }}
                    >
                      {createCharacter
                        ? "Hide character creation"
                        : "Create a character"}
                    </PrimaryButton>
                  </div>
                  <SpecRenderer
                    createCharacter={createCharacter}
                    profile={profile}
                  />
                </form>
                <div
                  sx={{
                    width: "50%",
                    height: "30vh",
                    margin: "auto auto",
                    textAlign: "center",
                  }}
                >
                  <h3>Your characters</h3>
                  <CharacterList
                    setSelectedChar={setSelectedChar}
                    selectedChar={selectedChar}
                    showDelete={true}
                  />
                </div>
              </div>
              <div sx={{ position: "absolute", top: "10px", right: "10px" }}>
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
          <EventRender
            selectedChar={selectedChar}
            setSelectedChar={setSelectedChar}
            ragImg={ragImg}
            nefImg={nefImg}
          />
          <div>
            {thisUser === "ThngE79hWaYEXYNnUxqdJ04H12i2" ? (
              <CreateEvent />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
