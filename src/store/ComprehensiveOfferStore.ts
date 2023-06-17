import { makeAutoObservable } from "mobx";
import { IBaseTable, IGetAllJSON } from ".";
import { IGoodJSON } from "./GoodStore";

export interface IComprehensiveOfferGoods extends IBaseTable {
    count: number;
    goodId: number;
    complexOfferId?: number;
    good?: IGoodJSON;
}

export interface IComprehensiveOffer extends IBaseTable {
    name: string;
    description: string;
    price: number;
    image: string;
    complex_offer_goods?: IComprehensiveOfferGoods[];
}
class ComprehensiveOfferStore {
    private _comprehensiveOffers: IGetAllJSON<IComprehensiveOffer> | null = null
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
    setComprehensiveOffers(comprehensiveOffers: IGetAllJSON<IComprehensiveOffer>) {
        this._comprehensiveOffers = comprehensiveOffers
    }

    get comprehensiveOffers() {
        return this._comprehensiveOffers
    }

}
export const comprehensiveOfferStore = new ComprehensiveOfferStore()
