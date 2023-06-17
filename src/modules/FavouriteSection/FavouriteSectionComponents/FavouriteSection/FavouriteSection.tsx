import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'


import useRequest from '../../../../utils/hooks/useRequest'
import { IGetAllJSON, favouriteStore } from '../../../../store'

import { fetchFavourite } from '../../../../http/FavouriteAPI'
import { IFavourite } from '../../../../store/FavouriteStore'
import { GoodCard, GoodCardType } from '../../../../components/GoodCard'

import SectionList from '../../../../components/SectionList/SectionList'

import classes from './FavouriteSection.module.scss'

export const FavouriteSection = observer(() => {
    const [
        favourite,
        isFavouriteLoading,
        favouriteError
    ] = useRequest<IGetAllJSON<IFavourite>>(fetchFavourite)
    useEffect(() => {
        if (favourite) {
            favouriteStore.setFavourite(favourite)
        }
    }, [favourite])

    return (
        <SectionList
            className={classes.favourite}
            title='Ваше избранное'
            error={favouriteError}
            emptySubtitle='У вас нет избранных товаров'
            isLoading={isFavouriteLoading}
            items={favouriteStore.favourite?.rows || []}
            renderItem={(item: IFavourite) => (
                <GoodCard
                    className={classes.favourite_goodCard}
                    cardType={GoodCardType.horizontalCard}
                    {...item.good}
                    key={item.id}
                />
            )}
        />
    )
})

