import { observer } from 'mobx-react-lite'
import { useEffect, ChangeEvent } from 'react'
import useRequest from '../../../../utils/hooks/useRequest'
import { IGetAllJSON } from '../../../../store'
import { GoodOrderBy, IGoodGetParams, IGoodJSON, goodStore } from '../../../../store/GoodStore'
import { fetchGood } from '../../../../http/GoodAPI'
import SectionList from '../../../../components/SectionList/SectionList'
import { GoodCard } from '../../../../components/GoodCard'
import { Pagination } from '../../../../components/Pagination/Pagination'

import classes from './CatalogSection.module.scss'
import CatalogSectionHeader from '../CatalogSectionHeader/CatalogSectionHeader'


export const CatalogSection = observer(() => {
    const [
        goods,
        isGoodsLoading,
        goodsError, ,
        setGoodParam
    ] = useRequest<IGetAllJSON<IGoodJSON>, IGoodGetParams>(fetchGood, goodStore.goodGetParameters)
    useEffect(() => {
        if (goods) {
            goodStore.setGoods(goods)
        }
    }, [goods])
    useEffect(() => {
        if (goodStore.goodGetParameters) {
            setGoodParam(goodStore.goodGetParameters)
        }
    }, [goodStore.goodGetParameters])
    const onPageChange = (page: number) => {
        goodStore.setPage(page)
        window.scrollTo(0, 0);
    }
    const onOrderByChange = (event: ChangeEvent<HTMLSelectElement>) => {
        goodStore.setOrderBy(event.target.value as GoodOrderBy)
    }
    const onLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
        goodStore.setLimit(+event.target.value)
    }
    return (
        <SectionList
            className={classes.catalogSection}
            listClassName={classes.catalogSection_list}
            error={goodsError}
            emptySubtitle='Ничего не найдено'
            isLoading={isGoodsLoading}
            items={goods?.rows || []}
            renderItem={(item: IGoodJSON) => (
                <GoodCard
                    className={classes.catalogSection_goodCard}
                    {...item}
                    key={item.id}
                />
            )}
            footer={(
                <Pagination
                    className={classes.catalogSection_pagination}
                    currentPage={goodStore.page || 1}
                    itemCount={goods?.count || 0}
                    limit={goodStore.limit || 0}
                    pageOffset={2}
                    onChange={onPageChange}
                />
            )}
            header={(
                <CatalogSectionHeader
                    className = {classes.catalogSection_header}
                    limit={goodStore.limit || 12}
                    orderBy={goodStore.orderBy || "id"}
                    onLimitByChange={onLimitChange}
                    onOrderByChange={onOrderByChange}
                />
            )}
        />
    )
})
