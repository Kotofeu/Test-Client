import { memo, FC, useState } from 'react'
import { NavLink } from 'react-router-dom'

import classes from './Category.module.scss'
import Accordion from '../../../../components/Accordion/Accordion'
import { goodStore } from '../../../../store'
import { CATALOG_ROUTE } from '../../../../utils/const/routes'
interface IGoodType {
    id: number;
    name: string;
    categoryId?: number;
}
interface ICategory {
    id?: number;
    categoryName: string;
    imageSrc: string;
    types?: IGoodType[];
}
const Category: FC<ICategory> = memo((props) => {
    const { id, categoryName, imageSrc, types } = props
    const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
    return (
        <Accordion
            className={classes.category}
            listClassName={classes.category_typeList}
            titleElement={(
                <NavLink
                    className={classes.category_link}
                    to={CATALOG_ROUTE}
                    onClick={() => {id ? goodStore.setCategoryId(id) : goodStore.setCategoryId(undefined); goodStore.setTypeId(undefined)}}
                >
                    <img className={classes.category_image} src={imageSrc} alt={categoryName} />
                    <span className={classes.category_text}>{categoryName}</span>
                </NavLink>
            )}
            items={types || []}
            isOpen={isCategoryOpen}
            isMouseReact={true}
            setIsOpen={setIsCategoryOpen}
            renderItem={(item, index) =>
            (
                <div className={classes.category_type} key={item.id}>
                    <NavLink
                        className={classes.category_typeLink}
                        to={CATALOG_ROUTE}
                        onClick={() => { goodStore.setCategoryId(id); goodStore.setTypeId(item.id) }}

                    >
                        {item.name}
                    </NavLink>
                </div>
            )
            }
        />
    )
})

export default Category