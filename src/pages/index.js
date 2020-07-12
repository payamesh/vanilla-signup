/** @jsx jsx */

import { jsx } from "theme-ui"
import FormModal from "../components/FormModal"
import { useState, useCallback } from "react"
import MainHeader from "../components/utils/MainHeader"
import { auth } from "gatsby-theme-firebase"
import PrimaryButton from "../components/PrimaryButton"

const LandingPage = () => {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [resetEmail, setResetEmail] = useState("")
  const [loginMsg, setLoginMsg] = useState("")
  const [signupMsg, setSignupMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [resetClicked, setResetClicked] = useState(false)
  const onToggleReset = () => setResetClicked(!resetClicked)

  const resetPassword = useCallback(
    resetEmail => {
      auth
        .sendPasswordResetEmail(resetEmail)
        .then(function() {
          // Email sent.
          setSuccessMsg("Email sent")
          onToggleReset()
        })
        .catch(function(error) {
          // An error happened.
        })
    },
    [resetEmail]
  )
  const handleLogin = useCallback(
    (email, password) => {
      const promise = auth.signInWithEmailAndPassword(email, password)
      promise.catch(e => setLoginMsg(e.message))
    },
    [email, password]
  )
  const handleSignup = useCallback(
    (email, password) => {
      const promise = auth.createUserWithEmailAndPassword(email, password)
      promise.catch(e => setSignupMsg(e.message))
    },
    [email, password]
  )

  const displayLoginForm = () => {
    document.getElementById("loginForm").style.display = "block"
    document.getElementById("signupForm").style.display = "none"
    document.getElementById("loginTabName").classList.add("tab-name-selected")
    document
      .getElementById("signupTabName")
      .classList.remove("tab-name-selected")
  }

  const displaySignupForm = () => {
    document.getElementById("signupForm").style.display = "block"
    document.getElementById("loginForm").style.display = "none"
    document.getElementById("signupTabName").classList.add("tab-name-selected")
    document
      .getElementById("loginTabName")
      .classList.remove("tab-name-selected")
  }

  return (
    <div>
      <MainHeader>&lt;EzClap&gt; Event&nbsp;Planner</MainHeader>
      <div className="content-wrapper login-form">
        <div
          className="tab-name tab-name-selected"
          id="loginTabName"
          onClick={displayLoginForm}
        >
          Log In
        </div>
        <div
          className="tab-name"
          id="signupTabName"
          onClick={displaySignupForm}
        >
          Sign Up
        </div>
        <div id="loginForm">
          <FormModal
            setPassword={setPassword}
            setEmail={setEmail}
            myFunc={handleLogin}
            email={email}
            password={password}
            msg={loginMsg}
            btnText="Log In"
          />
        </div>
        <div id="signupForm" sx={{ display: "none" }}>
          <FormModal
            setPassword={setPassword}
            setEmail={setEmail}
            myFunc={handleSignup}
            email={email}
            password={password}
            msg={signupMsg}
            btnText="Sign Up"
          />
        </div>
        <button
          onClick={e => {
            e.preventDefault()
            onToggleReset()
          }}
        >
          Forgot password?
        </button>
        <p sx={{ color: "green" }}>{successMsg}</p>
        <div sx={{ display: resetClicked ? "block" : "none" }}>
          <input
            className="input-default"
            type="username"
            placeholder="email"
            onBlur={event => setResetEmail(event.target.value)}
          />
          <PrimaryButton
            onClick={e => {
              e.preventDefault()
              resetPassword(resetEmail)
            }}
          >
            Send password reset email
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
