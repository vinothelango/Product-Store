import React, { useContext } from 'react'
import { ProductContext } from '../contexts/ProductContext'
import Product from '../components/Product'
import './Home.css'
import Hero from '../hero/Hero'

const Home = () => {
  const { products } = useContext(ProductContext)

  const filteredProducts = products.filter((item) =>
    item.category === "men's clothing" || item.category === "women's clothing"
  )

  return (
    <>
      <Hero />
      <div className="home">
        <section className="section">
          <div className="container">
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
