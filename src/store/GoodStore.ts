import { makeAutoObservable } from "mobx";
import {  IBaseTable, IGetAllJSON } from "./index";
import { IRating } from "./RatingStore";
import { IBrandTable } from "./BrandStore";


export interface ICategoryTable extends IBaseTable {
    name: string;
    image: string;
}
export interface IGoodJSON extends IGoodTable {
    ratings: IRating[];
    category: ICategoryTable | null;
    type: IType | null;
    brand: IBrandTable | null;
}
export interface IGoodTable extends IBaseTable {
    name: string;
    price: number;
    oldPrice?: number | null;
    isPromotion?: boolean | null;
    categoryId?: number | null;
    typeId?: number | null;
    brandId?: number | null;
    good_images?: IGoodImage[];
    good_infos?: IGoodInfo[];
}
export interface IGoodAddedTables extends IBaseTable {
    name: string;
    goodId: number;
}
export interface IGoodImage extends IGoodAddedTables {
    image: string;
}
export interface IGoodInfo extends IGoodAddedTables {
    description: string;
}

export interface IType extends IBaseTable {
    name: string;
    categoryId: number;
}

export interface ICategoryJSON extends ICategoryTable {
    types?: IType[];
}



export interface IGoodGetParams {
    page?: number;
    limit?: number;
    categoryId?: number;
    typeId?: number;
    brandId?: number;
    minPrice?: number;
    maxPrice?: number;
    name?: string;
    orderBy?: GoodOrderBy
    isPromotion?: boolean;

}
export type GoodOrderBy = "name" | "price" | "id"

class GoodStore {
    private _categories: IGetAllJSON<ICategoryJSON> | null = null;
    private _types: IGetAllJSON<IType> | null = null;
    private _goods: IGetAllJSON<IGoodJSON> | null = null;

    private _defaultGoodGetParameters: IGoodGetParams = {
        page: 1,
        limit: 12,
        minPrice: 1,
        maxPrice: 9999999,
        name: '',
        orderBy: 'id',
    }
    // Параметры для запроса товаров
    private _goodGetParameters: IGoodGetParams = this.defaultGoodGetParameters

    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }

    setCategories(categories: IGetAllJSON<ICategoryJSON>) {
        this._categories = categories
    }
    setTypes(types: IGetAllJSON<IType>) {
        this._types = types
    }

    setGoods(goods: IGetAllJSON<IGoodJSON>) {
        this._goods = goods
    }



    setGoodGetParameters(params: IGoodGetParams) {
        this._goodGetParameters = {
            page: params.page,
            limit: params.limit,
            brandId: params.brandId,
            categoryId: params.categoryId,
            typeId: params.typeId,
            minPrice: params.minPrice,
            maxPrice: params.maxPrice,
            name: params.name,
            orderBy: params.orderBy,
            isPromotion: params.isPromotion
        }
    }
    setPage(page: number) {
        this._goodGetParameters.page = page
    }

    setLimit(limit: number) {
        this.setPage(1)
        this._goodGetParameters.limit = limit
    }
    setCategoryId(categoryId: number | undefined) {
        this.setPage(1)
        this._goodGetParameters.categoryId = categoryId
    }
    setTypeId(typeId: number | undefined) {
        this.setPage(1)
        this._goodGetParameters.typeId = typeId
    }
    setBrandId(brandId: number | undefined) {
        this.setPage(1)
        this._goodGetParameters.brandId = brandId
    }
    setMinPrice(minPrice: number) {
        this.setPage(1)
        this._goodGetParameters.minPrice = minPrice
    }
    setMaxPrice(maxPrice: number | undefined) {
        this.setPage(1)
        this._goodGetParameters.maxPrice = maxPrice
    }
    setName(name: string | undefined) {
        this.setPage(1)
        this._goodGetParameters.name = name
    }
    setOrderBy(orderBy: GoodOrderBy) {
        this.setPage(1)
        this._goodGetParameters.orderBy = orderBy
    }
    setIsPromotion(isPromotion: boolean | undefined) {
        this.setPage(1)
        this._goodGetParameters.isPromotion = isPromotion
    }
    dropFields() {
        
        this.setGoodGetParameters(this.defaultGoodGetParameters);
    }

    get categories() { return this._categories; }

    get types() { return this._types }

    get goods() { return this._goods }



    get goodGetParameters() { return this._goodGetParameters }

    get page() { return this._goodGetParameters.page }

    get limit() { return this._goodGetParameters.limit }

    get brandId() { return this._goodGetParameters.brandId }

    get categoryId() { return this._goodGetParameters.categoryId }

    get typeId() { return this._goodGetParameters.typeId }

    get minPrice() { return this._goodGetParameters.minPrice }

    get maxPrice() { return this._goodGetParameters.maxPrice }

    get name() { return this._goodGetParameters.name }

    get orderBy() { return this._goodGetParameters.orderBy }

    get isPromotion() { return this._goodGetParameters.isPromotion }

    get defaultGoodGetParameters() { return this._defaultGoodGetParameters }

}

export const goodStore = new GoodStore();