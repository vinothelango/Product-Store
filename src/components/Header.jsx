import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../contexts/CartContext'
import { AuthContext } from '../contexts/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import './Header.css'

const Header = () => {
  const { cart } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login')
      setMenuOpen(false)
    })
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🛒 MyStore</Link>
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>☰</button>

      <nav className={`nav-links ${menuOpen ? 'show' : ''}`} id="navLinks">
        
        <button className="back-button" onClick={() => setMenuOpen(false)}>← Back</button>

        <Link to="/" onClick={handleLinkClick}>Home</Link>
        <Link to="/cart" onClick={handleLinkClick}>🛒 Cart ({cartItemCount})</Link>
        <Link to="/my-orders">My Orders</Link>

        {user ? (
          <>
            <span style={{ color: 'white' }}>{user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={handleLinkClick}>Login</Link>
            <Link to="/register" onClick={handleLinkClick}>Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
