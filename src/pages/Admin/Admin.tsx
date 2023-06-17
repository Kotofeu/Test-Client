import { useState, FormEvent, useEffect } from 'react'
import Container from '../../UI/Container/Container'
import Input from '../../UI/Input/Input'

import { observer } from 'mobx-react-lite'


import classes from './Admin.module.scss'
import { fetchCategory, postCategory } from '../../http/CategoryAPI'
import { IGetAllJSON, brandStore, goodStore } from '../../store'
import { fetchTypes, postType } from '../../http/TypeAPI'
import { fetchBrand, postBrand } from '../../http/BrandAPI'
import { postComprehensiveOffer } from '../../http/ComprehensiveOfferAPI'
import { fetchGood, postGood } from '../../http/GoodAPI'
import Title from '../../UI/Title/Title'
import Selector, { IOption } from '../../UI/Selector/Selector'
import useRequest from '../../utils/hooks/useRequest'
import { ICategoryJSON, IGoodGetParams, IGoodJSON, IType } from '../../store/GoodStore'
import Loader from '../../UI/Loader/Loader'
import { IBrandTable } from '../../store/BrandStore'
import MultipleFileInput from '../../components/MultipleFileInput/MultipleFileInput'
interface IGoodAtOffer {
    count?: number,
    goodId: number,
}
interface IGoodInfos {
    name: string,
    description: string,
}
const Admin = observer(() => {
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
    const [
        goods,
        isGoodsLoading,
        goodsError, ,
        setGoodParam
    ] = useRequest<IGetAllJSON<IGoodJSON>, IGoodGetParams>(fetchGood, goodStore.defaultGoodGetParameters)
    useEffect(() => {
        if (goods) {
            goodStore.setGoods(goods)
        }
    }, [goods])

    const
        [
            partners,
            partnersIsLoading,
            partnersError
        ] = useRequest<IGetAllJSON<IBrandTable>>(fetchBrand);

    useEffect(() => {
        if (partners?.rows && !brandStore.brands?.rows) {
            brandStore.setBrands(partners)
        }
    }, [partners])

    const [
        type,
        typeIsLoading,
        typeError
    ] = useRequest<IGetAllJSON<IType>, number>(fetchTypes);
    useEffect(() => {
        if (type?.rows) {
            goodStore.setTypes(type)
        }
    }, [type])

    const [categoryImage, setCategoryImage] = useState<File | null>();
    const [brandImage, setBrandImage] = useState<File | null>();
    const [offerImage, setOfferImage] = useState<File | null>();
    const [goodImages, setGoodImages] = useState<FileList | null>();

    const [categoryName, setCategoryName] = useState<string>('');
    const [typeName, setTypeName] = useState<string>('');
    const [brandName, setBrandName] = useState<string>('');
    const [offerName, setOfferName] = useState<string>('');
    const [goodName, setGoodName] = useState<string>('');

    const [typeCategoryId, setTypeCategoryId] = useState<number>(0);

    const [offerDesc, setOfferDesc] = useState<string>('');
    const [offerPrice, setOfferPrice] = useState<number>(0);
    const [offerGoods, setOfferGoods] = useState<IGoodAtOffer[]>([]);

    const [goodPrice, setGoodPrice] = useState<number>(0);
    const [goodCategoryId, setGoodCategoryId] = useState<number>(0);
    const [goodTypeId, setGoodTypeId] = useState<number>(0);
    const [goodBrandId, setGoodBrandId] = useState<number>(0);
    const [goodInfos, setGoodInfos] = useState<IGoodInfos[]>([]);

    const onCategoryFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData()
        if (categoryName && categoryImage) {
            formData.append('name', categoryName)
            formData.append("image", categoryImage)

            postCategory(formData)
                .then(() => fetchCategory()
                    .then(data => goodStore.setCategories(data)))
                .then(() => { setCategoryName(''); setCategoryImage(null) })
                .then(() => alert("Успешно добавлено"))
                .catch(ex => alert(ex.response.data.message ?? ex))

        }
        else {
            alert("Введите название категории и добавьте изображение!")
        }
    }

    const onTypeFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        console.log(typeCategoryId)
        event.preventDefault();
        const formData = new FormData()
        if (typeName && typeCategoryId) {
            formData.append('name', typeName)
            formData.append('categoryId', `${typeCategoryId}`)

            postType(formData)
                .then(() => fetchTypes()
                    .then(data => goodStore.setTypes(data)))
                .then(() => { setTypeName(''); setTypeCategoryId(0) })
                .then(() => alert("Успешно добавлено"))
                .catch(ex => alert(ex.response.data.message ?? ex))

        }
        else {
            alert("Введите название тип и категорию!")
        }
    }
    const onBrandFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData()
        if (brandName && brandImage) {
            formData.append('name', brandName)
            formData.append("image", brandImage)
            postBrand(formData)
                .then(() => fetchBrand()
                    .then(data => brandStore.setBrands(data)))
                .then(() => { setBrandImage(null); setBrandName('') })
                .then(() => alert("Успешно добавлено"))
                .catch(ex => alert(ex.response.data.message ?? ex))

        }
        else {
            alert("Введите название бренда и добавьте изображение!")
        }
    }

    const onOfferFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData()
        if (offerName && offerPrice && offerDesc && offerImage) {
            formData.append('name', offerName)
            formData.append('price', `${offerPrice}`)
            formData.append('description', offerDesc)
            formData.append("image", offerImage)
            if (offerGoods) {
                formData.append("goods", JSON.stringify(offerGoods))
            }
            postComprehensiveOffer(formData)
                .then(() => { setOfferName(''); setOfferDesc(''); setOfferImage(null); setOfferPrice(0); setOfferGoods([]) })
                .then(() => alert("Успешно добавлено"))
                .catch(ex => alert(ex.response.data.message ?? ex))

        }
        else {
            alert("Введите обязательные поля!")
        }
    }
    const onGoodFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData()
        if (goodName && goodPrice) {
            formData.append('name', goodName)
            formData.append('price', `${goodPrice}`)
            if (goodCategoryId) {
                formData.append('categoryId', `${goodCategoryId}`)
            }
            if (goodBrandId) {
                formData.append('brandId', `${goodBrandId}`)
            }
            if (goodTypeId) {
                formData.append('typeId', `${goodTypeId}`)
            }
            if (goodImages) {
                for (let i = 0; i < goodImages.length; i++) {
                    formData.append("images", goodImages[i], goodImages[i].name)
                }
            }
            if (goodInfos) {
                formData.append("info", JSON.stringify(goodInfos))
            }
            postGood(formData)
                .then(() => { setGoodName(''); setGoodImages(null); setGoodPrice(0); setGoodCategoryId(0); setGoodBrandId(0); setGoodTypeId(0); setGoodInfos([]) })
                .then(() => alert("Успешно добавлено"))
                .catch(ex => alert(ex.response.data.message ?? ex))

        }
        else {
            alert("Введите обязательные поля!")
        }
    }


    if (isGoodsLoading || categoriesIsLoading || partnersIsLoading || typeIsLoading || !type?.rows.length || !partners?.rows.length || !categories?.rows.length || !goods?.rows.length) return <Loader />
    else {
        return (
            <Container>
                <div className={classes.settings}>
                    <form className={classes.settings_form} onSubmit={onCategoryFormSubmit}>
                        <Title className={classes.settings_formTitle}>Работа с категориями</Title>
                        <div className={classes.settings_fieldsInputs}>
                            <Input className={classes.settings_input} placeholder={"Введите название категории"} value={categoryName} onChange={(event) => setCategoryName(event.target.value)} type="text" />
                            <div className={classes.settings_imageBox}>
                                <label className={classes.settings_imageInput}>
                                    Загрузите изображение
                                    <input type="file" multiple accept=".jpg,.jpeg,.png" onChange={(event) => setCategoryImage(event.target.files ? event.target.files[0] : null)} style={{ display: 'none' }} />
                                </label>
                                <div className={classes.settings_imageName}>{categoryImage?.name}</div>
                            </div>
                        </div>
                        <button className={classes.settings_formButton} type="submit">Добавить</button>
                    </form>
                    <form className={classes.settings_form} onSubmit={onBrandFormSubmit}>
                        <Title className={classes.settings_formTitle}>Работа с брендами</Title>
                        <div className={classes.settings_fieldsInputs}>
                            <Input className={classes.settings_input} placeholder={"Введите название бренда"} value={brandName} onChange={(event) => setBrandName(event.target.value)} type="text" />
                            <div className={classes.settings_imageBox}>
                                <label className={classes.settings_imageInput}>
                                    Загрузите изображение
                                    <input type="file" multiple accept=".jpg,.jpeg,.png" onChange={(event) => setBrandImage(event.target.files ? event.target.files[0] : null)} style={{ display: 'none' }} />
                                </label>
                                <div className={classes.settings_imageName}>{brandImage?.name}</div>
                            </div>
                        </div>
                        <button className={classes.settings_formButton} type="submit">Добавить</button>
                    </form>

                    <form className={classes.settings_form} onSubmit={onTypeFormSubmit}>
                        <Title className={classes.settings_formTitle}>Работа с типами</Title>
                        <div className={classes.settings_fieldsInputs}>
                            <Input className={classes.settings_input} placeholder={"Введите название типа"} value={typeName} onChange={(event) => setTypeName(event.target.value)} type="text" />
                            {
                                categories.rows.length
                                    ? <Selector
                                        className={classes.settings_selector}
                                        options={goodStore.categories?.rows.map(category => { return ({ name: category.name, value: category.id }) }) as IOption[]}
                                        name={'category'}
                                        value={typeCategoryId}
                                        onChange={(event) => setTypeCategoryId(+event.target.value)}
                                    />
                                    : null
                            }

                        </div>
                        <button className={classes.settings_formButton} type="submit">Добавить</button>
                    </form>

                    <form className={classes.settings_form} onSubmit={onOfferFormSubmit}>
                        <Title className={classes.settings_formTitle}>Работа с комплексными предложениями</Title>
                        <div className={classes.settings_fieldsInputs}>
                            <Input className={classes.settings_input} placeholder={"Введите название предложения"} value={offerName} onChange={(event) => setOfferName(event.target.value)} type="text" />
                            <Input className={classes.settings_input} placeholder={"Введите описание предложения"} value={offerDesc} onChange={(event) => setOfferDesc(event.target.value)} type="text" />
                            <Input className={classes.settings_input} placeholder={"Введите цену предложения"} value={offerPrice.toString()} onChange={(event) => setOfferPrice(+event.target.value)} type="number" />
                            <div className={classes.settings_imageBox}>
                                <label className={classes.settings_imageInput}>
                                    Загрузите изображение
                                    <input type="file" multiple accept=".jpg,.jpeg,.png" onChange={(event) => setOfferImage(event.target.files ? event.target.files[0] : null)} style={{ display: 'none' }} />
                                </label>
                                <div className={classes.settings_imageName}>{offerImage?.name}</div>
                            </div>
                            <Title className={classes.settings_formSubtitle}>Добавление товаров</Title>
                            {
                                offerGoods.length > 0 && goods.rows.length > 0 && offerGoods?.map((good, index) =>
                                    <div className={classes.settings_fieldRow} key={good.goodId}>
                                        <Selector
                                            className={classes.settings_selector}
                                            options={goodStore.goods?.rows?.map(good => { return ({ name: good.name, value: good.id }) }) as IOption[]}
                                            name={'good'}
                                            value={offerGoods[index].goodId}
                                            onChange={(event) => setOfferGoods(offerGoods.map(item => {
                                                {
                                                    if (item.goodId == good.goodId) {
                                                        return { ...item, goodId: +event.target.value }
                                                    }
                                                    return item;
                                                }
                                            }))}
                                        />
                                        <Input className={classes.settings_input} placeholder={"Введите количество товара"} value={offerGoods[index].count + ''} onChange={(event) => setOfferGoods(offerGoods.map(item => {
                                            {
                                                if (item.goodId == good.goodId) {
                                                    return { ...item, count: +event.target.value }
                                                }
                                                return item;
                                            }
                                        }))}
                                            type="number" />
                                        <button onClick={() => setOfferGoods(offerGoods.filter(item => item.goodId !== good.goodId))} className={classes.settings_formButton} type="button">X</button>
                                    </div>
                                )
                            }
                            <button className={classes.settings_formButton} type="button" onClick={() => setOfferGoods([...offerGoods, { goodId: 0, count: 1 }])}>Добавить товар</button>
                        </div>
                        <button className={classes.settings_formButton} type="submit">Добавить</button>
                    </form>



                    <form className={classes.settings_form} onSubmit={onGoodFormSubmit}>
                        <Title className={classes.settings_formTitle}>Работа с товарами</Title>
                        <div className={classes.settings_fieldsInputs}>
                            <Input className={classes.settings_input} placeholder={"Введите название товара"} value={goodName} onChange={(event) => setGoodName(event.target.value)} type="text" />
                            <Input className={classes.settings_input} placeholder={"Введите цену товара"} value={goodPrice.toString()} onChange={(event) => setGoodPrice(+event.target.value)} type="number" />
                            <Selector
                                className={classes.settings_selector}
                                options={goodStore.categories?.rows.map(category => { return ({ name: category.name, value: category.id }) }) as IOption[]}
                                name={'goodCategory'}
                                value={goodCategoryId}
                                onChange={(event) => setGoodCategoryId(+event.target.value)}
                            />
                            <Selector
                                className={classes.settings_selector}
                                options={goodStore.types?.rows.map(type => { return ({ name: type.name, value: type.id }) }) as IOption[]}
                                name={'goodType'}
                                value={goodTypeId}
                                onChange={(event) => setGoodTypeId(+event.target.value)}
                            />
                            <Selector
                                className={classes.settings_selector}
                                options={brandStore.brands?.rows.map(brand => { return ({ name: brand.name, value: brand.id }) }) as IOption[]}
                                name={'goodBrand'}
                                value={goodBrandId}
                                onChange={(event) => setGoodBrandId(+event.target.value)}
                            />
                            <MultipleFileInput
                                handleFilesChange={(files) => setGoodImages(files)}
                                showFileName={true}
                            />

                            <Title className={classes.settings_formSubtitle}>Добавление характеристик</Title>
                            {
                                goodInfos.length > 0 && goodInfos?.map((info, index) =>
                                    <div className={classes.settings_fieldRow} key={info.name + info.description}>
                                        <Input className={classes.settings_input} placeholder={"Введите название характеристики"} value={goodInfos[index].name} onChange={(event) => setGoodInfos(goodInfos.map(item => {
                                            {
                                                if (item.name == info.name) {
                                                    return { ...item, name: event.target.value }
                                                }
                                                return item;
                                            }
                                        }))}
                                            type="text" />
                                        <Input className={classes.settings_input} placeholder={"Введите значение"} value={goodInfos[index].description} onChange={(event) => setGoodInfos(goodInfos.map(item => {
                                            {
                                                if (item.name == info.name) {
                                                    return { ...item, description: event.target.value }
                                                }
                                                return item;
                                            }
                                        }))}
                                            type="text" />
                                        <button onClick={() => setGoodInfos(goodInfos.filter(item => item.name !== info.name))} className={classes.settings_formButton} type="button">X</button>
                                    </div>
                                )
                            }
                            <button className={classes.settings_formButton} type="button" onClick={() => setGoodInfos([...goodInfos, { name: '', description: '' }])}>Добавить характеристику</button>
                        </div>
                        <button className={classes.settings_formButton} type="submit">Добавить</button>
                    </form>
                </div>
            </Container>)
    }
})

export default Admin