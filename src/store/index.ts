export {goodStore} from './GoodStore'
export {userStore} from './UserStore'
export {brandStore} from './BrandStore'
export {comprehensiveOfferStore} from './ComprehensiveOfferStore'
export {ratingStore} from './RatingStore'
export {promotionStore} from './PromotionStore'
export {favouriteStore} from './FavouriteStore'
export {basketStore} from './BasketStore'
export interface IBaseTable {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IGetAllJSON<T> {
    count: number;
    rows: [T];
}
export interface IGoodToUser {
    userId: number;
    goodId: number;
}

