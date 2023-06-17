import { makeAutoObservable } from "mobx";
import { IBaseTable, IGetAllJSON } from ".";
export interface IBrandTable extends IBaseTable{
    name: string,
    image: string
}
class BrandStore {
    private _brands: IGetAllJSON<IBrandTable> | null = null;
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
    setBrands(brands: IGetAllJSON<IBrandTable>) {
        this._brands = brands
    }
    get brands() {
        return this._brands
    }

}
export const brandStore = new BrandStore()

