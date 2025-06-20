import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registered successfully');
      navigate('/login');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setErrorMsg('Email already in use.');
      } else if (err.code === 'auth/invalid-email') {
        setErrorMsg('Invalid email format.');
      } else if (err.code === 'auth/weak-password') {
        setErrorMsg('Password must be at least 6 characters.');
      } else {
        setErrorMsg('Registration failed. Try again.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Signed in with Google!');
      navigate('/login');
    } catch (error) {
      setErrorMsg('Google sign-in failed. Try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        {errorMsg && <p className="error-text">{errorMsg}</p>}
      </form>

      <div className="google-signin">
        <p>Or</p>
        <button onClick={handleGoogleSignIn} className="google-btn">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
