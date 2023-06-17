import { observer } from 'mobx-react-lite'

import MySlider from '../../../../components/MySlider/MySlider'
import ComprehensiveOfferCard from '../ComprehensiveOfferCard/ComprehensiveOfferCard'

import classes from './ComprehensiveOfferSlider.module.scss'
import { comprehensiveOfferStore } from '../../../../store'
const ComprehensiveOfferSlider = observer(() => {
    const offers = comprehensiveOfferStore.comprehensiveOffers?.rows
    if (!offers) return null
    return (
        <MySlider
            items={offers}
            renderItem={offer =>
                <ComprehensiveOfferCard
                    className={classes.comprehensiveOffer_offer}
                    id={offer.id}
                    title={offer.name}
                    imageSrc={offer.image}
                />
            }
            settings={{
                slidesPerView: 1,
                spaceBetween: 10,
                navigation: { enabled: true },
                pagination: { type: "fraction" },
                autoHeight: true,

                slidesPerGroup: 1,
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false
                },
                breakpoints: {
                    668: {
                        slidesPerView: 2,
                    },
                    900: {
                        slidesPerView: 3,
                    },
                    1200: {
                        slidesPerView: 4,
                    }
                }
            }}
            slideClass={classes.comprehensiveOffer_slide}
            className={classes.comprehensiveOffer_slider}

        />)
})

export default ComprehensiveOfferSlider