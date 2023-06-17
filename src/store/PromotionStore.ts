import { makeAutoObservable } from "mobx";
import { IGetAllJSON } from ".";
import { IGoodJSON } from "./GoodStore";


class PromotionStore {

    private _promotionGoods: IGetAllJSON<IGoodJSON> | null = null;
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }

    setPromotionGoods(goods: IGetAllJSON<IGoodJSON> | null) {
        this._promotionGoods = goods
    }

    get promotionGoods() {
        return this._promotionGoods
    }
}
export const promotionStore = new PromotionStore()
