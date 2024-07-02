import Link from 'next/link'

export function StoreCard({ store, width= "is-half" }) {
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
