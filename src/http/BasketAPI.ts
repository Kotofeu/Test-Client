import { $authHost, baseBasket } from "./index";


export const postBasket = async (goodId: number, count?: number) => {
    const { data } = await $authHost.post(baseBasket, {goodId, count})
    return data
}
export const fetchBasket  = async () => {
    const { data } = await $authHost.get(baseBasket)
    return data
}
export const deleteBasket = async (goodId: number) => {
    const { data } = await $authHost.delete(baseBasket, {data: {goodId}})
    return data
}
export const isGoodInBasket = async (goodId: number) => {
    const { data } = await $authHost.get(`${baseBasket}find-good`, {params: {goodId}});
    return data;
}