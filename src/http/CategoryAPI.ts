import { ICategoryTable } from "../store/GoodStore";
import { $authHost, $host, baseCategory } from "./index";

export const postCategory = async (category: any) => {
    const { data } = await $authHost.post(baseCategory, category)
    return data
}
export const fetchCategory  = async () => {
    const { data } = await $host.get(baseCategory)
    return data
}
export const fetchOneCategory = async (id: number) => {
    const { data } = await $host.get(baseCategory + id)
    return data
}
export const deleteCategory = async (id: number) => {
    const { data } = await $authHost.delete(baseCategory, { data: { id } });
    return data;
}