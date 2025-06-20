import React, { useState } from 'react'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider, db } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { ref, set } from 'firebase/database'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const saveUserToDatabase = (user) => {
    set(ref(db, 'users/' + user.uid), {
      email: user.email,
      displayName: user.displayName || '',
      
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      saveUserToDatabase(result.user)
      navigate('/')
    } catch (err) {
      alert(err.message)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      saveUserToDatabase(result.user)
      navigate('/')
    } catch (err) {
      alert('Login failed: ' + err.message)
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>or</p>
        <button type="button" className="google-btn" onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
        <p className="switch">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  )
}

export default Login
