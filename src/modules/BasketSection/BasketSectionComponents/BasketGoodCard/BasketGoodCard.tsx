import { memo, FC, useState, useEffect } from 'react'

import { GoodCard, GoodCardType } from '../../../../components/GoodCard'

import { IGoodJSON } from '../../../../store/GoodStore'
import useDebounce from '../../../../utils/hooks/useDebounce';
import { fetchBasket, postBasket } from '../../../../http/BasketAPI';
import Counter, { CounterButtonType } from '../../../../components/Counter/Counter';

import classes from './BasketGoodCard.module.scss'
import { basketStore } from '../../../../store';


interface IBasketGoodCard {
    className?: string;
    good: IGoodJSON;
    goodCount: number;

}
const BasketGoodCard: FC<IBasketGoodCard> = memo((props) => {
    const { className = '', good, goodCount } = props
    const [count, setCount] = useState<number>(goodCount || 1);
    const debouncedValue = useDebounce<number>(count, 500)

    useEffect(() => {
        postBasket(good.id, count)
            .then(() => fetchBasket()
                .then(data => basketStore.setBasket(data)))
    }, [debouncedValue])
    const joinClassName = [classes.goodCard, className].join(' ')
    return (
        <GoodCard
            className={joinClassName}
            {...good}
            cardType={GoodCardType.horizontalCard}
            counter={
                <Counter
                    className={classes.goodCard_counter}
                    count={count}
                    setCount={setCount}
                    maxCount={99}
                    minCount={1}
                    counterButtonType={CounterButtonType.arrow}
                />
            }
        />
    )
})

export default BasketGoodCard