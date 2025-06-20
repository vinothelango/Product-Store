import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'

const Navbar = () => {
  const { cart } = useContext(CartContext)
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({cart.length})</Link>
    </nav>
  )
}
