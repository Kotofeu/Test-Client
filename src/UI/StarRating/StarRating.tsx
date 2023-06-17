import { memo, FC } from 'react'
import Rating from 'react-star-ratings'
interface IStarRating {
    rating?: number,
    setRating?: (rating: number) => void,
    className?: string
    starRatedColor?: string;
    starEmptyColor?: string;
    starHoverColor?: string;
    starDimension?: string;
    starSpacing?: string;
}
const StarRating: FC<IStarRating> = memo((props) => {
    const {
        rating = 0,
        setRating,
        className = '',
        starRatedColor = '#FC9A31',
        starEmptyColor = '#5a5a5a',
        starHoverColor = '#FC9A31',
        starDimension = '16px',
        starSpacing = '2px'
    } = props
    
    return (
        <div className={className}>
            <Rating
                rating={rating}
                changeRating={setRating}
                starRatedColor={starRatedColor}
                starEmptyColor={starEmptyColor}
                starHoverColor={starHoverColor}
                starDimension={starDimension}
                starSpacing={starSpacing}
            />
        </div>
    )
})
export default StarRating