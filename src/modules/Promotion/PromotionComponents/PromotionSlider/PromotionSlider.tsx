import MySlider from '../../../../components/MySlider/MySlider'
import { observer } from 'mobx-react-lite'
import { GoodCard } from '../../../../components/GoodCard'

import classes from './PromotionSlider.module.scss'
import { promotionStore } from '../../../../store'

const PromotionSlider = observer(() => {
    const goods = promotionStore.promotionGoods?.rows

    if (!goods?.length) return null
    return (
        <MySlider
            items={goods}
            renderItem={good => {
                return (
                    <GoodCard
                        key={good.id}
                        {...good}
                        className={classes.promotion_good}
                    />
                )
            }}
            settings={{
                slidesPerView: 1,
                spaceBetween: 10,
                navigation: { enabled: true },
                scrollbar: { draggable: true },
                autoHeight: true,
                breakpoints: {
                    900: {
                        slidesPerView: 2,
                    },
                    1200: {
                        slidesPerView: 3,
                    }
                }
            }}
            slideClass={classes.promotion_slide}
            className={classes.promotion_slider}

        />
    )
})

export default PromotionSlider