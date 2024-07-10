import { RatingCard } from './card'
import RatingForm from './form'

export function RatingsContainer({ ratings, saveRating, productId }) {
  return (
    <div className="tile is-parent is-12 is-vertical container">
      <RatingForm saveRating={saveRating} productId={productId}/>
      {
        ratings?.map((rating) => <RatingCard key={rating.id} rating={rating} />)
      }
    </div>
  )
}
