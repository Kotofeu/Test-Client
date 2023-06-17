import axios, {InternalAxiosRequestConfig} from "axios";

const baseAPI = 'api/'
export const baseBrand = `${baseAPI}brand/`;
export const baseCategory = `${baseAPI}category/`;
export const baseComprehensiveOffer = `${baseAPI}offer/`;
export const baseGood = `${baseAPI}good/`;
export const baseRating = `${baseAPI}rating/`;
export const baseType = `${baseAPI}type/`;
export const baseUser = `${baseAPI}user/`;

export const baseBasket = `${baseUser}basket/`;
export const baseFavourite = `${baseUser}favourite/`;

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = (config: InternalAxiosRequestConfig) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}