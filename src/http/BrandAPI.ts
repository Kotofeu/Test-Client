import { $authHost, $host, baseBrand } from "./index";
interface IPostBrandParams {
    id?: number;
    name: string;
    image: string;
}
export const postBrand = async (brand?: any) => {
    const { data } = await $authHost.post(baseBrand, brand)
    return data
}
export const fetchBrand  = async () => {
    const { data } = await $host.get(baseBrand)
    return data
}
export const fetchOneBrand = async (id: number) => {
    const { data } = await $host.get(baseBrand + id)
    return data
}
export const deleteBrand = async (id: number) => {
    const { data } = await $authHost.delete(baseBrand, { data: { id } });
    return data;
}