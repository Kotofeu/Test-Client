import { makeAutoObservable } from "mobx";
import { IUser } from "./UserStore";
import { IBaseTable, IGetAllJSON, IGoodToUser } from "./index.js";
import { IGoodTable } from "./GoodStore";

export interface RatingImage extends IBaseTable {
    image: string;
    ratingId: number;
}
export interface IRating extends IBaseTable, IGoodToUser {
    rating: number;
    comment: null | string;
    user?: IUser;
    good?: IGoodTable;
    rating_images?: RatingImage[];
}
export interface IRatingGetByGoodParams{
    page?: number;
    limit?: number;
    goodId?: number;
    rating?: number;
}
class RatingStore {

    private _ratings: IGetAllJSON<IRating> | null = null;

    private _defaultRatingGetParameters: IRatingGetByGoodParams = {
        page: 1,
        limit: 10,
        goodId: undefined,
        rating: undefined,
    }
    // Параметры для запроса товаров
    private _ratingGetParameters: IRatingGetByGoodParams = this.defaultRatingGetParameters

    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }

    setRatings(ratings: IGetAllJSON<IRating>) {
        this._ratings = ratings
    }


    setPage(page: number) {
        this._ratingGetParameters.page = page
    }

    setLimit(limit: number) {
        this.setPage(1)
        this._ratingGetParameters.limit = limit
    }
    setSelectedGoodId(goodId: number | undefined) {
        this.setPage(1)
        this._ratingGetParameters.goodId = goodId
    }
    setSelectedRating(rating: number | undefined) {
        this.setPage(1)
        this._ratingGetParameters.rating = rating
    }

    dropFields() {
        this._ratingGetParameters = this.defaultRatingGetParameters;
    }



    get ratings() {
        return this._ratings
    }


    get page() {
        return this._ratingGetParameters.page
    }


    get limit() {
        return this._ratingGetParameters.limit
    }

    get selectedGoodId() {
        return this._ratingGetParameters.goodId
    }


    get selectedRating() {
        return this._ratingGetParameters.rating
    }

    get defaultRatingGetParameters () {
        return this._defaultRatingGetParameters
    }
}
export const ratingStore = new RatingStore()