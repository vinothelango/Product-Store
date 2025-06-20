import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'


const GoogleSignIn = () => {
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      navigate('/')
    } catch (err) {
      alert(err.message)
    }
  }

  return <button onClick={handleGoogleLogin}>Sign in with Google</button>
}

export default GoogleSignIn
