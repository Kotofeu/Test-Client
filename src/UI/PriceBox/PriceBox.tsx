import { memo, FC } from 'react'
import classes from './PriceBox.module.scss'
interface IPriceBox {
    className?: string;
    oldPrice?: number | null;
    price: number;
}
const PriceBox: FC<IPriceBox> = memo((props) => {
    const { className = '', oldPrice, price } = props
    const isDiscount: boolean
        = typeof oldPrice === 'number' && oldPrice > price;
    return (
        <div className={[className, classes.price].join(' ')}>
            {
                isDiscount &&
                <div className={classes.price_oldValue}>{oldPrice?.toLocaleString()} ₽</div>
            }
            <div
                className={
                    [classes.price_value, isDiscount ? classes.price_discountCost : ''].join(' ')
                }
            >
                {price.toLocaleString()} ₽
            </div>

        </div>
    )
})

export default PriceBox