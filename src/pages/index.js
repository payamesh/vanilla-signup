/** @jsx jsx */

import { jsx } from "theme-ui"
import FormModal from "../components/FormModal"
import { useState, useCallback } from "react"
import { auth } from "gatsby-theme-firebase"

const LandingPage = () => {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [loginMsg, setLoginMsg] = useState("")
  const [signupMsg, setSignupMsg] = useState("")
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
      <div className="main-header">
        <h1>&lt;EzClap&gt; Event Planner</h1>
      </div>
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
      </div>
    </div>
  )
}

export default LandingPage
