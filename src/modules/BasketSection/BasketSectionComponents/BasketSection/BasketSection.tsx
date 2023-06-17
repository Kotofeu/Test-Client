import {  useEffect, useState } from 'react'
import useRequest from '../../../../utils/hooks/useRequest'
import { IGetAllJSON } from '../../../../store'
import { IBasket, basketStore } from '../../../../store/BasketStore'
import { fetchBasket } from '../../../../http/BasketAPI'
import TotalAmount from '../../../../components/TotalAmount/TotalAmount'

import classes from './BasketSection.module.scss'
import { observer } from 'mobx-react-lite'
import SectionList from '../../../../components/SectionList/SectionList'
import BasketGoodCard from '../BasketGoodCard/BasketGoodCard'

export const BasketSection = observer(() => {
    const [
        basket,
        isBasketLoading,
        basketError
    ] = useRequest<IGetAllJSON<IBasket>>(fetchBasket)
    const [amount, setAmount] = useState<number>(0)
    useEffect(() => {
        if (basket) {
            basketStore.setBasket(basket)
            setAmount(basket.rows
                .reduce((acc, good) => acc + good.good.price * good.count, 0));
        }
    }, [basket])
    useEffect(() => {
        if (basketStore.basket) {
            setAmount(basketStore.basket.rows
                .reduce((acc, good) => acc + good.good.price * good.count, 0));
        }
    }, [basketStore.basket])
    return (
        <SectionList
            className={classes.basket}
            title="Ваша корзина"
            error={basketError}
            emptySubtitle='Ваша корзина пуста'
            isLoading={isBasketLoading }
            items={basketStore.basket?.rows || []}
            renderItem={(item: IBasket) => (
                <BasketGoodCard
                    className={classes.basket_goodCard}
                    good={item.good}
                    key={item.id}
                    goodCount={item.count}
                />
            )}
            footer={
                amount && !isBasketLoading
                    ? <TotalAmount className={classes.basket_footer} amountString={"Всего: "} amount={amount} />
                    : null
            }
        />

    )
})
