import { memo, FC } from 'react'
import { IRating } from '../../../store/RatingStore';
import StarRating from '../../../UI/StarRating/StarRating';

import classes from './GoodRating.module.scss'

interface IGoodRating {
    ratings: IRating[]
}
const averageRating = (ratings: IRating[]): number => {
    const ratingScores = ratings.map(item => item.rating)
    const ratingSum = ratingScores.reduce((a, b) => a + b, 0);
    return ratingSum / ratings.length
}
const GoodRating: FC<IGoodRating> = memo((props) => {
    const { ratings } = props
    return (
        <>
            {
                ratings.length
                    ? <div className={classes.rating}>
                        <StarRating className={classes.rating_stars} rating={averageRating(ratings)} />
                        <div className={classes.rating_count}>
                            {ratings.length}
                        </div>
                    </div>
                    : <div className={classes.rating___empty}>
                        Нет отзывов
                    </div>
            }
        </>
    )
})

export default GoodRating