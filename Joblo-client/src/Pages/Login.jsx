import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import app from '../firebase/Firebase_Config';
import { NavLink } from 'react-router-dom';
const Login = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
 
   
    }
    const HandleLogin =() => {
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          console.log(user)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    }
    return (
      <main >        
      <section>
          <div>
              <div>                  
                  <h1> FocusApp </h1>                                                                            
                  <form>                                                                                            
                      <div>
                          <label htmlFor="email-address">
                              Email address
                          </label>
                          <input
                              type="email"
                              label="Email address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}  
                              required                                    
                              placeholder="Email address"                                
                          />
                      </div>

                      <div>
                          <label htmlFor="password">
                              Password
                          </label>
                          <input
                              type="password"
                              label="Create password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)} 
                              required                                 
                              placeholder="Password"              
                          />
                      </div>                                             
                      
                      <button
                          type="submit" 
                          onClick={onSubmit}                        
                      >  
                          Sign up                                
                      </button>
                                                                   
                  </form>
                 
                  <p>
                      Already have an account?{' '}
                      <NavLink to="/login" >
                          Sign in
                      </NavLink>
                  </p>                   
              </div>
          </div>
      </section>
  </main>
    )
}

export default Login