import { memo, FC } from 'react'
import { NavLink } from 'react-router-dom';

import classes from './ComprehensiveOfferCard.module.scss'
import ServerImage from '../../../../UI/ServerImage/ServerImage'
import { OFFER_ROUTE } from '../../../../utils/const/routes';
export interface IComprehensiveOfferCard {
    id: number;
    title: string;
    imageSrc: string;
    className?: string;
}
const ComprehensiveOfferCard: FC<IComprehensiveOfferCard> =
    memo((props) => {
        const { id, title, imageSrc, className } = props
        return (
            <NavLink className={[classes.offer, className].join(' ')} to={`${OFFER_ROUTE}/${id}`}>
                <span className={classes.offer_title}>
                    {title}
                </span>
                <ServerImage
                    className={classes.offer_image}
                    src={imageSrc}
                    alt={title}
                />
            </NavLink>
        )
    })

export default ComprehensiveOfferCard