import { IGoodGetParams, IGoodTable } from "../store/GoodStore";
import { $authHost, $host, baseGood } from "./index";


const baseGoodImage = baseGood + 'image';
const baseGoodInfo = baseGood + 'info';

export const postGood = async (good: any) => {
    const { data } = await $authHost.post(baseGood, good)
    return data
}
export const fetchGood = async (params?: IGoodGetParams) => {
    const { data } = await $host.get(baseGood, {
        params: {
            ...params
        }
    })
    return data
}
export const fetchOneGood = async (id?: number) => {
    const { data } = await $host.get(baseGood + id)
    return data
}
export const deleteGood = async (id?: number) => {
    const { data } = await $authHost.delete(baseGood, { data: { id } });
    return data;
}
export const fetchGoodImage = async (goodId: number) => {
    const { data } = await $host.get(baseGoodImage, {
        params: { goodId }
    })
    return data
}
export const deleteGoodImage = async (id?: number) => {
    const { data } = await $authHost.delete(baseGoodImage, { data: { id } });
    return data;
}

export const fetchGoodInfo = async (goodId?: number) => {
    const { data } = await $host.get(baseGoodInfo, {
        params: { goodId }
    })
    return data
}
export const deleteGoodInfo = async (id: number) => {
    const { data } = await $authHost.delete(baseGoodInfo, { data: { id } });
    return data;
}

