import { createContext, useEffect, useState } from 'react'
import { db } from '../firebaseConfig'
import { ref, set } from 'firebase/database'
import { v4 as uuidv4 } from 'uuid'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])


  const saveProductToFirebase = (product) => {
    set(ref(db, 'cartProducts/' + product.id), {
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
    })
  }

 
  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id)
    if (exists) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
      saveProductToFirebase(product)
    }
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const increaseQuantity = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ))
  }

  const decreaseQuantity = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
    ))
  }
  const clearCart = () => {
    const orderId = uuidv4()
    const orderRef = ref(db, 'orders/' + orderId)

    const orderData = {
      orderId,
      createdAt: new Date().toISOString(),
      items: cart.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      })),
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }

    set(orderRef, orderData)
      .then(() => {
        console.log('✅ Order saved to Firebase')
        setCart([])
       
      })
      .catch((err) => {
        alert(' Failed to save order: ' + err.message)
      })
  }

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalAmount
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
