/** @jsx jsx */

import { jsx } from "theme-ui"
import { auth, useAuth, firebase } from "gatsby-theme-firebase"
import { useState, useCallback } from "react"
import PrimaryButton from "./PrimaryButton"

const SignupModal = () => {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const handleSignup = useCallback(
    (email, password) => {
      const promise = auth.createUserWithEmailAndPassword(email, password)
      promise.catch(e => console.log(e.message))
    },
    [email, password]
  )

  return (
    <div
      sx={{
        width: "100vw",
      }}
    >
      <div
        sx={{
          width: "50%",
          margin: "16px auto",
          fontSize: "16px",

          "&>div>input": {
            width: "50%",
            margin: "10px auto",
            background: "#fff",
            outline: "none",
            padding: "12px",
            fontSize: "13px",
            color: "black",
          },
          "&>div>input:focus": {
            borderColor: "#888",
          },
        }}
      >
        <div //triangle
          sx={{
            width: "0",
            marginRight: "auto",
            marginLeft: " auto",
            border: "12px solid transparent",
            borderBottomColor: "#4eb5f1",
          }}
        ></div>
        <h2
          sx={{
            margin: "0",
            background: "#4eb5f1",
            padding: "20px",
            fontWeight: "normal",
            textAlign: "center",
            textTransform: "uppercase",
            color: "#fff",
            fontSize: "25px",
          }}
        >
          sign up
        </h2>
        <div
          sx={{
            background: "#ebebeb",
            padding: "12px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            sx={{ marginX: "15px" }}
            type="username"
            placeholder="username"
            onBlur={event => setEmail(event.target.value)}
          />
          <input
            sx={{ marginX: "15px" }}
            type="password"
            placeholder="password"
            onBlur={event => setPassword(event.target.value)}
          />
          <div sx={{ margin: "0 auto", width: "100%", textAlign: "center" }}>
            <PrimaryButton
              onClick={e => {
                e.preventDefault()
                handleSignup(email, password)
              }}
            >
              Log in
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupModal
