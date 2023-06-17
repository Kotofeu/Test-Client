import { memo, FC, ChangeEvent } from 'react'
import { GoodOrderBy, goodStore } from '../../../../store/GoodStore'
import Selector from '../../../../UI/Selector/Selector';
import { ORDER_BY } from '../../../../utils/const/getGoodQueryParams';

import classes from './CatalogSectionHeader.module.scss'
interface ICatalogSectionHeader {
    className: string;
    orderBy: GoodOrderBy;
    limit: number;
    onOrderByChange: (event: ChangeEvent<HTMLSelectElement>) => void
    onLimitByChange: (event: ChangeEvent<HTMLSelectElement>) => void

}
const CatalogSectionHeader: FC<ICatalogSectionHeader> = memo((props) => {
    const { className = '', orderBy, limit, onLimitByChange, onOrderByChange } = props
    const orderByDefault = goodStore.defaultGoodGetParameters.orderBy;
    const limitDefault = goodStore.defaultGoodGetParameters.limit
    return (
        <header className={[classes.categoryHeader, className].join(' ')}>
            <div className={classes.categoryHeader__param}>
                <span className={classes.categoryHeader__paramName}>
                    Сортировать:
                </span>
                <Selector
                    className={classes.categoryHeader__selector}
                    value={orderBy}
                    name={ORDER_BY}
                    defaultValue={orderByDefault}
                    defaultName='По умолчанию'
                    onChange={onOrderByChange}
                    options={[
                        { name: "По возрастанию стоимости", value: "price" },
                        { name: "По алфавиту", value: "name" }]}
                />
            </div>
            <div className={classes.categoryHeader__param}>
                <span className={classes.categoryHeader__paramName}>
                    Товаров на странице:
                </span>
                <Selector
                    className={classes.categoryHeader__selector}
                    value={limit}
                    name={ORDER_BY}
                    defaultValue={limitDefault}
                    defaultName={limitDefault?.toString()}
                    onChange={onLimitByChange}
                    options={[
                        { name: "18", value: 18 },
                        { name: "24", value: 24 }]}
                />
            </div>
        </header>
    )
})

export default CatalogSectionHeader