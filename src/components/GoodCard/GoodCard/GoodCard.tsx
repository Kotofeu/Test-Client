import { memo, FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import classes from './GoodCard.module.scss'
import { IGoodJSON } from '../../../store/GoodStore';
import ServerImage from '../../../UI/ServerImage/ServerImage';
import { GoodBuy } from '../GoodBuy/GoodBuy';
import GoodRating from '../GoodRating/GoodRating';
import { CATALOG_ROUTE } from '../../../utils/const/routes';

export enum GoodCardType {
    horizontalCard = classes.card___horizontal,
}

interface IGoodCard extends IGoodJSON {
    className?: string;
    isFavouriteDefault?: boolean;
    isInBasketDefault?: boolean;
    cardType?: GoodCardType;
    counter?: ReactNode;
}
export const GoodCard: FC<IGoodCard> = memo((props) => {
    const {
        id,
        good_images,
        name,
        price,
        oldPrice,
        className = '',
        ratings,
        brand,
        cardType = '',
        counter
    } = props

    let preview;
    if (good_images && good_images[0]) {
        preview = good_images.sort((a, b) => a.id - b.id)[0].image
    }
    const classNameJoin = [classes.card, cardType, className].join(' ')
    return (
        <div className={classNameJoin}>
            <div className={classes.card_inner}>
                <NavLink className={classes.card_imageLink} to={`${CATALOG_ROUTE}/${id}`}>
                    <ServerImage
                        className={classes.card_image}
                        src={preview || undefined}
                        alt={name}
                    />
                </NavLink>
                <div className={classes.card_description}>
                    <NavLink className={classes.card_link} to={`${CATALOG_ROUTE}/${id}`}>{name}</NavLink>
                    <div className={classes.card_info}>
                        <div className={classes.card_goodStat}>
                            {
                                counter
                                    ? counter
                                    : null
                            }
                            <div className={classes.card_goodStatInfo}>
                                <GoodRating
                                    ratings={ratings}
                                />
                                {
                                    brand
                                        ? <div className={classes.card_brand}>
                                            <ServerImage
                                                className={classes.card_brandImage}
                                                src={brand.image}
                                                alt={name}
                                            />
                                        </div>
                                        : null
                                }

                            </div>
                        </div>
                        <div className={classes.card_buy}>
                            <GoodBuy
                                goodId={id}
                                price={price}
                                oldPrice={oldPrice}
                            />
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
})
