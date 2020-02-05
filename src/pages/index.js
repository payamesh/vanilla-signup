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
  return (
    <div>
      <div sx={{ textAlign: "center", fontSize: "25px" }}>
        <h1>Welcome to EzClap's official website.</h1>
      </div>
      <div sx={{ width: "100vw", display: "flex" }}>
        <FormModal
          setPassword={setPassword}
          setEmail={setEmail}
          myFunc={handleLogin}
          email={email}
          password={password}
        />
        {/* <News/> */}
      </div>
      <FormModal
        setPassword={setPassword}
        setEmail={setEmail}
        myFunc={handleSignup}
        email={email}
        password={password}
      />
    </div>
  )
}

export default LandingPage
