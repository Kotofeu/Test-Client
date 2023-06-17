import { observer } from 'mobx-react-lite';
import { FC, useState, ChangeEvent } from 'react'
import { brandStore } from '../../../../store';
import { FilterAsideCheckbox } from '../FilterAsideCheckbox/FilterAsideCheckbox';
import { IGoodGetParams, goodStore } from '../../../../store/GoodStore';
import Accordion from '../../../../components/Accordion/Accordion';
import { FilterTitle } from '../FilterTitle/FilterTitle';

import classes from './FilterAsideAccordions.module.scss'
import { BRAND_ID, CATEGORY_ID, TYPE_ID } from '../../../../utils/const/getGoodQueryParams';

interface IFilterAsideAccordions {
    fields: IGoodGetParams;
    onChangeSelectorHandler: (event: ChangeEvent<HTMLInputElement>) => void
}

interface IUniversalItem {
    id: number;
    name: string;
    image?: string;
    categoryId?: number;
}

export const FilterAsideAccordions: FC<IFilterAsideAccordions> = observer((props) => {
    const { fields, onChangeSelectorHandler } = props;
    const [isTypesOpen, setIsTypesOpen] = useState(true);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
    const [isBrandsOpen, setIsBrandsOpen] = useState(true);
    const checkboxClassName = classes.filterAside_checkbox;
    const accordions = [
        {
            name: "Бренд",
            isOpen: isBrandsOpen,
            setIsOpen: setIsBrandsOpen,
            items: brandStore.brands?.rows || [],
            renderItems: (item: IUniversalItem) => (
                <FilterAsideCheckbox
                    key={item.id}
                    name={BRAND_ID}
                    value={item.id}
                    isChecked={item.id === fields.brandId}
                    onChange={onChangeSelectorHandler}
                    title={item.name}
                    className={checkboxClassName}
                />
            )
        },
        {
            name: "Категория товара",
            isOpen: isCategoriesOpen,
            setIsOpen: setIsCategoriesOpen,
            items: goodStore.categories?.rows || [],
            renderItems: (item: IUniversalItem) => (
                <FilterAsideCheckbox
                    key={item.id}
                    name={CATEGORY_ID}
                    value={item.id}
                    isChecked={item.id === fields.categoryId}
                    onChange={onChangeSelectorHandler}
                    title={item.name}
                    className={checkboxClassName}
                />
            )
        },
        {
            name: "Тип товара",
            isOpen: isTypesOpen,
            setIsOpen: setIsTypesOpen,
            items: goodStore.types?.rows || [],
            renderItems: (item: IUniversalItem) => (
                <FilterAsideCheckbox
                    key={item.id}
                    name={TYPE_ID}
                    value={item.id}
                    isChecked={item.id === fields.typeId}
                    onChange={onChangeSelectorHandler}
                    title={item.name}
                    className={checkboxClassName}
                />
            )
        }
    ];

    return (
        <>
            {
                accordions.length ? accordions.map(({ name, isOpen, setIsOpen, items, renderItems }) => (
                    items?.length ? (
                        <Accordion
                            key={name}
                            className={classes.filterAside_accordion}
                            titleElement={
                                <FilterTitle
                                    className={classes.filterAside_title}
                                    hideFilter={() => setIsOpen(v => !v)}
                                    title={name}
                                />
                            }
                            isMouseReact={false}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            items={items}
                            renderItem={renderItems}
                        />
                    ) : null

                )) : null
            }
        </>
    )
})
