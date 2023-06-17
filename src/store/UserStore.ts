import { makeAutoObservable } from "mobx";
import { IBaseTable } from ".";
export interface IAuthAttributes {
    role: string;
    email: string;
}
export interface IUser extends IBaseTable {
    name?: string;
    phone?: string | null;
    image?: string | null;
    isSubscribed?: boolean | null;
    users_authorization?: IAuthAttributes;
}

class UserStore {
    private _user: IUser | null = null;
    private _isAuth: boolean = false;
    private _isAdmin: boolean = false;
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }

    setIsAuth(isAuth: boolean) {
        this._isAuth = isAuth
    }
    setIsAdmin(role: string) {
        this.setIsAuth(true)
        this._isAdmin = role === "ADMIN" ? true : false
    }
    setUser(user: IUser | null) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }
    get isAdmin() {
        return this._isAdmin
    }
    get user() {
        return this._user
    }
}
export const userStore = new UserStore()