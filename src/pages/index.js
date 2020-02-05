/** @jsx jsx */

import { jsx } from "theme-ui"

import FormModal from "../components/FormModal"

import News from "../components/News"
import { useState, useCallback } from "react"
import { auth } from "gatsby-theme-firebase"

const LandingPage = () => {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const handleLogin = useCallback(
    (email, password) => {
      const promise = auth.signInWithEmailAndPassword(email, password)
      promise.catch(e => console.log(e.message))
    },
    [email, password]
  )
  const handleSignup = useCallback(
    (email, password) => {
      const promise = auth.createUserWithEmailAndPassword(email, password)
      promise.catch(e => console.log(e.message))
    },
    [email, password]
  )

  const displayLoginForm = () => {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none'
  }

  const displaySignupForm = () => {
    document.getElementById('signupForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none'
  }

  return (
    <div>
      <div className="main-header">
        <h1>&lt;EzClap&gt; Event Planner</h1>
      </div>
      <div className="content-wrapper login-form">
        <div className="tab-name" onClick={displayLoginForm}>Log In</div>
        <div className="tab-name" onClick={displaySignupForm}>Sign Up</div>
        <div id="loginForm">
          <FormModal
            setPassword={setPassword}
            setEmail={setEmail}
            myFunc={handleLogin}
            email={email}
            password={password}
            btnText='Log In'
          />
        </div>
        <div id="signupForm" sx={{ display: "none" }}>
          <FormModal
            setPassword={setPassword}
            setEmail={setEmail}
            myFunc={handleSignup}
            email={email}
            password={password}
            btnText='Sign Up'
          />
        </div>
       </div>
    </div>
  )
}

export default LandingPage
