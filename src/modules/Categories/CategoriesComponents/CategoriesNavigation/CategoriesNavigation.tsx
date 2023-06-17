import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import Category from '../Category/Category'

import { IGetAllJSON, goodStore } from '../../../../store'
import otherImage from '../../../../assets/icons/other.svg'

import classes from './CategoriesNavigation.module.scss'
import useRequest from '../../../../utils/hooks/useRequest'
import { ICategoryJSON } from '../../../../store/GoodStore'
import { fetchCategory } from '../../../../http/CategoryAPI'
import Loader from '../../../../UI/Loader/Loader'

export const CategoriesNavigation = observer(() => {
  const [
    categories,
    categoriesIsLoading,
    categoriesError
  ] = useRequest<IGetAllJSON<ICategoryJSON>>(fetchCategory);

  useEffect(() => {
    if (categories?.rows && !goodStore.categories?.rows) {
      goodStore.setCategories(categories)
    }
  }, [categories])
  return (
    <nav className={classes.categories}>
      {
        !categoriesIsLoading
          ? <>
            {
              goodStore.categories
                ? goodStore.categories.rows.map((category) => (
                  <Category
                    categoryName={category.name}
                    imageSrc={`${process.env.REACT_APP_API_URL}${category.image}`}
                    id={category.id}
                    key={category.id}
                    types={category.types} />
                ))
                : null
            }
            <Category
              categoryName="Другое"
              imageSrc={otherImage}
              key="Другое" />
          </>
          : <Loader />
      }

    </nav>
  )
})