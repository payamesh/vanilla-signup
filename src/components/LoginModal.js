/** @jsx jsx */

import { jsx } from "theme-ui"
import { auth, useAuth, firebase } from "gatsby-theme-firebase"
import { useState, useCallback } from "react"

const LoginModal= () => {
    const { isLoggedIn } = useAuth();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = useCallback((email, password) =>{
            const promise = auth.signInWithEmailAndPassword(email,password)
            promise.catch(e=> console.log(e.message))
        },[email,password])
    const handleSignup = useCallback((email, password) =>{
            const promise = auth.createUserWithEmailAndPassword(email,password)
            promise.catch(e=> console.log(e.message))
        },[email,password])

     firebase.auth().onAuthStateChanged(firebaseUser =>{
        if(firebaseUser){
            if (typeof window !== `undefined`) window.location.replace(`/profile`)
            console.log("logged in", firebaseUser)
        }
        else{
            console.log("not logged in")
        }
     })   
    return(
        <div>

            <input type="text" onBlur={event => setEmail(event.target.value)}/>
            <input type="password" onBlur={event => setPassword(event.target.value)} />



            <button onClick={(e)=>{
                e.preventDefault();
                handleLogin(email,password)
                }} 
                    sx={{backgroundColor:'blue'}}>Log in</button>
            <button onClick={(e)=>{
                e.preventDefault();

                handleSignup(email,password)
                }}>Sign up</button>

            {isLoggedIn && <button onClick={() => auth.signOut()}>Sign Out</button>}
            <button sx={{display:'none'}}>LogOut</button>
        </div>
    )
}

export default LoginModal