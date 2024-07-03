import React from 'react'
import Link from 'next/link'

export function StoreCard({ store, width= "is-half" }) {
  const previewProducts = () => {
    const products = store.products || []
    return products.length > 5? products.slice(0, 5) : products
  }
  return (
    <div className={`column ${width}`}>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            {store.name}
          </p>
        </header>
        <div className="card-content">
          <p className="content">
            Owner: {store.customer.user.first_name} {store.customer.user.last_name}
          </p>
          <div className="content">
            {store.description}
          </div>
          <div className="content">
            Currently Selling {store.products?.length} Products
          </div>
          <div className="scrollable-product-preview">
            <h3>Products Preview:</h3>
            <ul>
              {previewProducts().map((product) => {
                return (
                 <li key={product.id}>
                   <div className="product-preview">
                     <img src={product.image_path} alt={product.name} />
                      <div>
                        <strong>{product.name}</strong>
                        <p>${product.price}</p>
                        <p>{product.description}</p>
                        <small>{product.location}</small>
                      </div>
                    </div>
                  </li>
                ) 
              })}
            </ul>

          </div>
        </div>
        <footer className="card-footer">
          <Link href={`stores/${store.id}`}>
            <a className="card-footer-item">View Store</a>
          </Link>
        </footer>
      </div>
    </div>
  )
}
