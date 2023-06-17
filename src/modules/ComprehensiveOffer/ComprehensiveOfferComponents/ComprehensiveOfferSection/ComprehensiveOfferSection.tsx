import {memo, useEffect} from 'react'
import Title from '../../../../UI/Title/Title'


import { IGetAllJSON, comprehensiveOfferStore } from '../../../../store'
import useRequest from '../../../../utils/hooks/useRequest'
import { IComprehensiveOffer } from '../../../../store/ComprehensiveOfferStore'
import { fetchComprehensiveOffer } from '../../../../http/ComprehensiveOfferAPI'

import ComprehensiveOfferSlider from '../ComprehensiveOfferSlider/ComprehensiveOfferSlider'

import classes from './ComprehensiveOfferSection.module.scss'

export const ComprehensiveOfferSection = memo(() => {
    const [
        comprehensiveOffer,
        comprehensiveOfferIsLoading,
        comprehensiveOfferrror
    ] = useRequest<IGetAllJSON<IComprehensiveOffer>>(fetchComprehensiveOffer);
    useEffect(() => {
        if (comprehensiveOffer) {
            comprehensiveOfferStore.setComprehensiveOffers(comprehensiveOffer)
        }
    }, [comprehensiveOffer])
    return (
        <section className={classes.comprehensiveOffer}>
            <Title
                className={classes.comprehensiveOffer_title}
            >
                Комплексные предложения
            </Title>
            <ComprehensiveOfferSlider/>
        </section>
    )
})