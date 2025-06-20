
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCChTfuInkNOfStGVSyTzcT1yoq5-RXPLs",
  authDomain: "products-auth-5bc76.firebaseapp.com",
  projectId: "products-auth-5bc76",
  storageBucket: "products-auth-5bc76.firebasestorage.app",
  messagingSenderId: "1894141998",
  appId: "1:1894141998:web:186c7233ea99883143cfbf",
  measurementId: "G-3SSGVE9HFE"
};

const app = initializeApp(firebaseConfig)


export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getDatabase(app)