import { memo, useEffect, Dispatch } from 'react'
import { IGetAllJSON, brandStore, goodStore } from '../../../../store';
import { ICategoryJSON, IType } from '../../../../store/GoodStore';
import useRequest from '../../../../utils/hooks/useRequest';
import { fetchCategory } from '../../../../http/CategoryAPI';
import { IBrandTable } from '../../../../store/BrandStore';
import { fetchBrand } from '../../../../http/BrandAPI';
import { fetchTypesByCategory } from '../../../../http/TypeAPI';

interface IFilterAsideFetching {
    categoryId: number | undefined;
    setIsLoading: Dispatch<React.SetStateAction<boolean>>
    setError: Dispatch<React.SetStateAction<string>>
}
export const FilterAsideFetching = memo((props: IFilterAsideFetching) => {
    const { categoryId, setIsLoading, setError } = props
    const [
        categories,
        categoriesIsLoading,
        categoriesError
    ] = useRequest<IGetAllJSON<ICategoryJSON>>(fetchCategory);
    const [
        brands,
        brandsIsLoading,
        brandsError
    ] = useRequest<IGetAllJSON<IBrandTable>>(fetchBrand);
    const [
        type,
        typeIsLoading,
        typeError, ,
        setTypeCategoryId
    ] = useRequest<IGetAllJSON<IType>, number>(fetchTypesByCategory, categoryId);
    useEffect(() => {
        setTypeCategoryId(categoryId ?? -1)
    }, [categoryId])
    useEffect(() => {
        if (categories?.rows && !goodStore.categories?.rows) {
            goodStore.setCategories(categories)
        }
        if (brands?.rows && !brandStore.brands?.rows) {
            brandStore.setBrands(brands)
        }
        if (type?.rows) {
            goodStore.setTypes(type)
        }
    }, [categories, brands, type])

    useEffect(() => {
        setIsLoading(categoriesIsLoading || brandsIsLoading)
    }, [categoriesIsLoading, brandsIsLoading])
    useEffect(() => {
        if (categoriesError || brandsError || typeError) {
            setError("Ошибка подключения")
        }
    }, [categoriesError, brandsError, typeError])
    return null;
})