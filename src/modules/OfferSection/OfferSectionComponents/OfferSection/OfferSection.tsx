import { memo, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import SectionList from '../../../../components/SectionList/SectionList'
import { GoodCard } from '../../../../components/GoodCard'
import { OfferSectionHeader } from '../OfferSectionHeader/OfferSectionHeader'
import { IComprehensiveOffer } from '../../../../store/ComprehensiveOfferStore'

import { fetchOneComprehensiveOffer } from '../../../../http/ComprehensiveOfferAPI'
import useRequest from '../../../../utils/hooks/useRequest'
import classes from './OfferSection.module.scss'

export const OfferSection = memo(() => {
    const navigate = useNavigate()
    const params = useParams();
    const id = params.id ? Number(params.id) : undefined
    const [offer, isLoading, error]
        = useRequest<IComprehensiveOffer, number>(fetchOneComprehensiveOffer, id)
    useEffect(() => {
        if (offer === null) navigate('/')
    }, [offer])
    return (
        <SectionList
            className={classes.offer}
            listClassName={classes.offer_list}
            error={error}
            title={offer?.name}
            isLoading={isLoading}
            emptySubtitle='В предложении нет товаров'
            items={offer?.complex_offer_goods || []}
            renderItem={offerGood => {
                const good = offerGood.good
                if (!good) return null
                return (
                    <GoodCard
                        key={good.id}
                        {...good}
                    />)
            }}
            header={
                <OfferSectionHeader className={classes.offer_header} offer={offer} />
            }
        />
    )
})