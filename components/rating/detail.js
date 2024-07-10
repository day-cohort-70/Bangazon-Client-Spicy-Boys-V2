import { useState, useEffect } from 'react'
import { rateProduct } from '../../data/products'
import { RatingsContainer } from './container'
import { Header } from './header'
import { useRouter } from 'next/router';
import RatingForm from './form';

export function Ratings({ average_rating, refresh, ratings = [], number_purchased, likes = [] }) {

  const router = useRouter();
  const id = router.query.id;
  const [productId, setProductId] = useState(id)

  const saveRating = (productId, newRating) => {
    rateProduct(productId, newRating).then(refresh)

  }

  useEffect(() => {
    setProductId(id)
  }, [id])

  useEffect(() => {
    if (ratings.length) {
      setProductId(ratings[0].product)
    }
  }, [ratings])

  return (
    <div className="tile is-ancestor is-flex-wrap-wrap">
      <Header 
        averageRating={average_rating}
        ratingsLen={ratings.length}
        numberPurchased={number_purchased}
        likesLength={likes.length}
      />
      <RatingsContainer ratings={ratings} saveRating={saveRating} productId={productId} />
    </div>
  )
}
