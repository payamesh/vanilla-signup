/** @jsx jsx */

import { jsx } from "theme-ui"
import { auth, useAuth, firebase } from "gatsby-theme-firebase"
import { useState, useCallback } from "react"
import PrimaryButton from "./PrimaryButton"

const FormModal = ({
  myFunc,
  setEmail,
  setPassword,
  email,
  password,
  btnText,
  msg,
}) => {
  const { isLoggedIn } = useAuth()
  const [isVerified, setVerified] = useState(false)
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      if (typeof window !== `undefined`) {
        window.location.replace(`/dashboard`)
        console.log("logged in", firebaseUser)
      } else if (firebaseUser.emailVerified == false) {
        setVerified(true)
      }
    }
  })
  return (
    <div>
      {!isVerified && (
        <div className="form-modal">
          <div
            sx={{
              padding: "12px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <input
              className="input-default"
              type="username"
              placeholder="email"
              onBlur={event => setEmail(event.target.value)}
            />
            <input
              className="input-default"
              type="password"
              placeholder="password"
              onBlur={event => setPassword(event.target.value)}
            />
            <div className="form-modal-inner-container">
              <PrimaryButton
                onClick={e => {
                  e.preventDefault()
                  myFunc(email, password)
                }}
              >
                {btnText}
              </PrimaryButton>
              <p className="form-modal-error-msg">{msg}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormModal
