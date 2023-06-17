import { memo, useEffect } from 'react'

import { IGetAllJSON, promotionStore } from '../../../../store'
import Title from '../../../../UI/Title/Title'
import PromotionSlider from '../PromotionSlider/PromotionSlider'
import useRequest from '../../../../utils/hooks/useRequest'
import { IGoodGetParams, IGoodJSON } from '../../../../store/GoodStore'


import classes from './PromotionSection.module.scss'
import { fetchGood } from '../../../../http/GoodAPI'
import Loader from '../../../../UI/Loader/Loader'

export const PromotionSection = memo(() => {
    const [
        goods,
        goodsIsLoading,
        goodsError
    ] = useRequest<IGetAllJSON<IGoodJSON>, IGoodGetParams>(fetchGood, {isPromotion: true});
    useEffect(() => {
        if (goods?.rows && !promotionStore.promotionGoods?.rows) {
            promotionStore.setPromotionGoods(goods)
        }
    }, [goods])
    if(goodsIsLoading){
        return (<Loader/>)
    }
    return (
        <section className={classes.promotion}>
            <Title className={classes.promotion_title}>Акции</Title>
            <PromotionSlider />
        </section>
    )
})
