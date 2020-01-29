/** @jsx jsx */

import { jsx } from "theme-ui"
import { auth, useAuth, firebase } from "gatsby-theme-firebase"
import { useState, useCallback } from "react"

const LoginModal = () => {
  const { isLoggedIn } = useAuth()
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const handleLogin = useCallback(
    (email, password) => {
      const promise = auth.signInWithEmailAndPassword(email, password)
      promise.catch(e => console.log(e.message))
    },
    [email, password]
  )

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      if (typeof window !== `undefined`) window.location.replace(`/dashboard`)
      console.log("logged in", firebaseUser)
    } else {
      console.log("not logged in")
    }
  })
  return (
    <div sx={{ width: "50vw" }}>
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

      <button
        onClick={e => {
          e.preventDefault()
          handleLogin(email, password)
        }}
        sx={{ backgroundColor: "blue" }}
      >
        Log in
      </button>
    </div>
  )
}

export default LoginModal
