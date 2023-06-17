import { useState, ChangeEvent, useEffect, useCallback } from 'react'
import { goodStore } from '../../../../store';
import { IGoodGetParams } from '../../../../store/GoodStore';
import { FilterAsideFetching } from '../FilterAsideFetching/FilterAsideFetching';

import Loader from '../../../../UI/Loader/Loader';
import Title from '../../../../UI/Title/Title';
import { FilterAsideAccordions } from '../FilterAsideAccordions/FilterAsideAccordions';
import { NAME } from '../../../../utils/const/getGoodQueryParams';

import useDebounce from '../../../../utils/hooks/useDebounce';
import Input from '../../../../UI/Input/Input';
import { RangeSlider } from '../../../../components/RangeSlider/RangeSlider';
import { observer } from 'mobx-react-lite';

import classes from './FilterAside.module.scss'

interface ISliderRange {
    min: number;
    max: number;
}
const sliderDefValues: ISliderRange = {
    min: 0,
    max: 99999
}
export const FilterAside = observer(() => {

    const [fields, setFields] = useState<IGoodGetParams>({
        brandId: goodStore.brandId,
        categoryId: goodStore.categoryId,
        typeId: goodStore.typeId,
        name: goodStore.name,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [sliderRange, setSliderRange] = useState<ISliderRange>(sliderDefValues);
    const debouncedFields = useDebounce(fields, 500);
    const dropFields = () => {
        goodStore.setGoodGetParameters({
            ...goodStore.defaultGoodGetParameters,
            limit: goodStore.limit,
            orderBy: goodStore.orderBy,
        })
        setFields(goodStore.goodGetParameters)
    }
    useEffect(() => {
        return () => dropFields()
    }, [])
    useEffect(() => {
        setFields(prev => ({
            ...prev,
            name: goodStore.name
        }))
    }, [goodStore.name])
    useEffect(() => {
        setFields(prev => ({
            ...prev,
            minPrice: sliderRange.min,
            maxPrice: sliderRange.max
        }))
    }, [sliderRange])
    useEffect(() => {
        goodStore.setGoodGetParameters({
            ...debouncedFields,
            orderBy: goodStore.orderBy,
            limit: goodStore.limit,
            page: goodStore.page
        });
    }, [goodStore.orderBy, goodStore.limit, goodStore.page]);
    useEffect(() => {
        goodStore.setGoodGetParameters({
            ...debouncedFields,
            orderBy: goodStore.orderBy,
            limit: goodStore.limit,
            page: goodStore.defaultGoodGetParameters.page
        });
    }, [debouncedFields]);

    const onChangeInputHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setFields((prev) => ({
                ...prev,
                [event.target.name]: event.target.value ?? undefined
            }));
        },
        []
    );

    const onChangeSelectorHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const validValue = event.target.checked ? +event.target.value : undefined;
            const { name } = event.target;
            setFields((prev) => ({
                ...prev,
                [name]: validValue,
                ...(name === "categoryId" && { typeId: undefined })
            }));
        },
        []
    );
    return (
        <aside className={classes.filterAside}>
            <FilterAsideFetching
                categoryId={fields.categoryId}
                setIsLoading={setIsLoading}
                setError={setError}
            />
            {isLoading
                ? <Loader />
                : <>
                    <div className={classes.filterAside_nameInputBox}>
                        <Input
                            placeholder='Название товара'
                            className={classes.filterAside_nameInput}
                            name={NAME}
                            value={fields.name || ''}
                            onChange={onChangeInputHandler}
                        />
                    </div>
                    <div className={classes.filterAside_price}>
                        <Title className={classes.filterAside_priceTitle}>Цена товара</Title>
                        <RangeSlider
                            className={classes.filterAside_rangePrice}
                            min={sliderDefValues.min}
                            max={sliderDefValues.max}
                            setValues={setSliderRange}
                        />
                    </div>

                    {
                        !error ?
                            <>
                                <FilterAsideAccordions
                                    fields={fields}
                                    onChangeSelectorHandler={onChangeSelectorHandler}
                                />
                            </>
                            : null
                    }
                    {error
                        ? <Title className={classes.filterAside_error}>{error}</Title>
                        : null
                    }
                </>
            }
        </aside>
    );
}); 