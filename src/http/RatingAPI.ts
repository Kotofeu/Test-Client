import { IRating, IRatingGetByGoodParams } from "../store/RatingStore";
import { $authHost, $host, baseRating } from "./index";


const ratingByUser = baseRating + "user";
const ratingByGood = baseRating + 'good';

export const postRating = async (rating: any) => {
    console.log(rating.images)
    const { data } = await $authHost.post(baseRating, rating)
    return data
}
export const fetchRatingByGood = async (params?: IRatingGetByGoodParams) => {
    const { data } = await $host.get(ratingByGood, {
        params: {...params}
    })
    return data
}
export const fetchRatingByUser = async (userId?: number) => {
    const { data } = await $host.get(ratingByUser, {
        params: {userId}
    })
    return data
}
export const deleteFromRating = async (ratingId: number, imageId: number) => {
    const { data } = await $authHost.delete(baseRating, { data: { ratingId, imageId } });
    return data;
}
