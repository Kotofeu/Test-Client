import { IType } from "../store/GoodStore";
import { $authHost, $host, baseType } from "./index";

export const postType = async (type: any) => {
    const { data } = await $authHost.post(baseType, type)
    return data
}
export const fetchTypes  = async () => {
    const { data } = await $host.get(baseType)
    return data
}
export const fetchTypesByCategory  = async (categoryId?: number) => {
    const { data } = await $host.get(baseType, {
        params: {categoryId}
    })
    return data
}
export const fetchOneType = async (id: number) => {
    const { data } = await $host.get(baseType + id)
    return data
}
export const deleteType = async (id: number) => {
    const { data } = await $authHost.delete(baseType, { data: { id } });
    return data;
}