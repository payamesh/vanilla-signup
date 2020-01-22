/** @jsx jsx */

import { jsx } from "theme-ui"
import { auth, useAuth, firebase } from "gatsby-theme-firebase"
import { useState, useCallback } from "react"

const SignupModal= () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

  
    const handleSignup = useCallback((email, password) =>{
            const promise = auth.createUserWithEmailAndPassword(email,password)
            promise.catch(e=> console.log(e.message))
        },[email,password])

     
    return(
        <div sx={{marginTop: '100px', width:'50vw'}}>
               <h3>No account yet?</h3>

            <input sx={{marginX:'15px'}} type="username" placeholder="username"  onBlur={event => setEmail(event.target.value)}/>
            <input sx={{marginX:'15px'}} type="password" placeholder="password" onBlur={event => setPassword(event.target.value)} />
            
           <div >
                <button sx={{marginY:'15px'}} onClick={(e)=>{
                    e.preventDefault();
                    
                    handleSignup(email,password)
                }}>Sign up</button>
                </div>     
        </div>
    )
}

export default SignupModal