import React from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import app from '../firebase/Firebase_Config';

const Login = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
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
        <div className='h-screen w-full flex items-center justify-center'>
            <button className='bg-blue text-white px-8 py-2' onClick={HandleLogin}>Login</button>
        </div>
    )
}

export default Login