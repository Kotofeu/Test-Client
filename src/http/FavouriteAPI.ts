import { $authHost, baseFavourite } from "./index";

export const postFavourite = async (goodId: number) => {
    const { data } = await $authHost.post(baseFavourite, {goodId})
    return data
}
export const fetchFavourite  = async () => {
    const { data } = await $authHost.get(baseFavourite)
    return data
}
export const deleteFavourite = async (goodId: number) => {
    const { data } = await $authHost.delete(baseFavourite, {data: {goodId}})
    return data
}
export const isGoodInFavourite = async (goodId: number) => {
    const { data } = await $authHost.get(`${baseFavourite}find-good`, {params: {goodId}});
    return data;
}