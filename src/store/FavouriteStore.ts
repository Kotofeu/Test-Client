import { makeAutoObservable } from "mobx";
import { IBaseTable, IGetAllJSON, IGoodToUser } from "./index";
import { IGoodJSON } from "./GoodStore";
export interface IFavourite extends IBaseTable, IGoodToUser {
    good: IGoodJSON;
}
class FavouriteStore {
    private _favourite: IGetAllJSON<IFavourite> | null = null;
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }

    setFavourite(favourite: IGetAllJSON<IFavourite> | null) {
        this._favourite = favourite
    }
    get favourite() {
        return this._favourite
    }
}
export const favouriteStore = new FavouriteStore();
