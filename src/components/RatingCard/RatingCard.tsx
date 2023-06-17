import { memo, FC } from 'react'

import MySlider from '../MySlider/MySlider'
import { IRating } from '../../store/RatingStore'
import ServerImage from '../../UI/ServerImage/ServerImage';
import StarRating from '../../UI/StarRating/StarRating';
import Title from '../../UI/Title/Title';

import defaultUser from '../../assets/icons/User-icon.svg'
import classes from './RatingCard.module.scss'
import { NavLink } from 'react-router-dom';
import { CATALOG_ROUTE, RATING_ROUTE } from '../../utils/const/routes';

interface IRatingCard {
    className?: string;
    rating: IRating;
}

const RatingCard: FC<IRatingCard> = memo((props) => {
    const { className, rating } = props
    const ratingDate = new Date(rating.updatedAt || 0)
    return (
        <div className={[classes.rating, className].join(' ')}>
            {
                rating.rating_images?.length
                    ? <MySlider
                        settings={{
                            slidesPerView: 1,
                            spaceBetween: 10,
                            pagination: { type: "fraction" },
                            autoplay: {
                                delay: 3000,
                                stopOnLastSlide: false,
                                disableOnInteraction: false
                            },
                        }}
                        className={classes.rating_imageSlider}
                        slideClass={classes.rating_slide}
                        items={rating.rating_images || []}
                        renderItem={(image) => (
                            <ServerImage
                                className={classes.rating_image}
                                key={image.id}
                                src={image.image}
                                alt={rating.comment || '' + image.id}
                            />
                        )}
                    />
                    : null
            }
            <div className={classes.rating_desc}>
                <header className={classes.rating_header}>
                    <div className={classes.rating_info}>
                        {
                            rating.user
                                ? <NavLink className={classes.rating_ownerLink} to = {`${RATING_ROUTE}/${rating.user.id}`}>
                                    <ServerImage className={classes.rating_userImage} src={rating.user?.image || undefined} altSrc={defaultUser} alt={rating.user?.name || ''} />
                                    <Title className={classes.rating_name}>{rating.user?.name}</Title>
                                </NavLink>
                                : null
                        }
                        {
                            rating.good
                                ? <NavLink className={classes.rating_ownerLink} to = {`${CATALOG_ROUTE}/${rating.good.id}`}>
                                    <Title className={classes.rating_name}>{rating.good.name}</Title>
                                </NavLink>
                                : null
                        }
                        <div className={classes.rating_date}>{ratingDate.toLocaleDateString()}</div>

                    </div>
                    <StarRating className={classes.rating_star} rating={rating.rating} />
                </header>
                {
                    rating.comment
                        ? <div className={classes.rating_comment}>{rating.comment}</div>
                        : null
                }
            </div>
        </div>
    )
})

export default RatingCard