import React, { useState } from 'react'
import { FaEnvelope, FaEnvelopeOpenText, FaFacebook, FaGit, FaGithub, FaGoogle, FaRocket } from 'react-icons/fa6'
import { getAuth, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import app from '../firebase/Firebase_Config';
import { Link, NavLink } from 'react-router-dom';
const Login = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    // const [email, setEmail] = useState('')
    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('');
    const HandleLogin = async (e) => {
      e.preventDefault()
      const User = {
        username: username,
        password: password
      }
     
      // await createUserWithEmailAndPassword(auth, email, password)
      //   .then((userCredential) => {
      //       // Signed in
      //       const user = userCredential.user;
      //       console.log(user);
      //       navigate("/login")
      //       // ...
      //   })
      //   .catch((error) => {
      //       const errorCode = error.code;
      //       const errorMessage = error.message;
      //       console.log(errorCode, errorMessage);
      //       // ..
      //   });
 
   
    }
    const HandleLoginFireBase =() => {
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
      <main>        
      <section className='flex items-center justify-center min-h-screen text-center'>
    <div className=' border-spacing-2 rounded-3xl w-96 h-auto text-center items-center justify-center pt-6 shadow-2xl  '>
      <h1 className='text-blue font-bold text-5xl mb-5'>LOGIN</h1>
      <form className='mt-3'>
      
        <div className=''>
          <label htmlFor="email-address" className='pr-2'>
            Email address or username:
          </label>
          <input
            type="email"
            label="Email address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}  
            required                                    
            placeholder="Email address"    
            className='py-2 rounded-lg border-2 mt-5'                            
          />
        </div>

        <div className='mb-4'>
          <label htmlFor="password" className='pr-2'>
            Password:
          </label>
          <input
            type="password"
            label="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required                                 
            placeholder="Password"
            className='py-2 rounded-lg border-2 mt-5'              
          />
        </div>                                             
        
        <button
          type="submit" 
          onClick={HandleLogin}                        
          className='py-2 px-4 bg-blue text-white rounded-lg mb-3'
        >  
          Sign up                                
        </button>
      </form>
     
      <p className='mt-1'>
        Already haven't an account?{' '}
        <NavLink to="/signup" className='text-blue-500 underline'>
          Sign up
        </NavLink>
      </p>
      <div className='m-3 '>
        <button onClick={HandleLoginFireBase} className='mt-4 bg-white border-2 text-blue-500 rounded-lg '>
        <FaGoogle className='w-6 h-5 m-2'/>
      </button>
      <button onClick={HandleLoginFireBase} className='mt-4 bg-white border-2 text-blue-500 rounded-lg'>
        <FaGithub  className='w-6 h-5 m-2'/>
      </button>
      <button onClick={HandleLoginFireBase} className='mt-4 bg-white border-2 text-blue-500 rounded-lg'>
        <FaFacebook  className='w-6 h-5 m-2'/>
      </button>
      </div>
      <button><Link to='/' className='py-2 px-4 border-2 text-white rounded-2xl float-start bg-blue' >Home</Link></button>
    </div>
</section>

  </main>
    )
}

export default Login