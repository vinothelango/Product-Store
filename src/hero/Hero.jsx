import React from 'react'
import './Hero.css'
import heroImg from '../assets/ecommerce-website-hero-760x380.jpg'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <img src={heroImg} alt="Hero" className="hero-bg" />
      <div className="hero-content">
        <h1>Discover Trendy Styles</h1>
        <p>Shop the latest fashion & elevate your wardrobe</p>
        <button className="hero-btn">Shop Now</button>
      </div>
    </section>
  )
}

export default Hero
