import { Home } from '../../pages/Home'
import { AboutUs } from '../../pages/AboutUs'
import { Basket } from '../../pages/Basket'
import { Favourite } from '../../pages/Favourite'
import { Catalog } from '../../pages/Catalog'
import { Offer } from '../../pages/Offer'
import { Good } from '../../pages/Good'
import { Rating } from '../../pages/Rating'
import { ABOUTE_ROUTE, ADMIN_ROUTE, BASKET_ROUTE, CATALOG_ROUTE, FAVOURITE_ROUTE, HOME_ROUTE, OFFER_ROUTE, RATING_ROUTE, SETTINGS_ROUTE } from '../../utils/const/routes'
import Settings from '../../pages/Settings/Settings'
import Admin from '../../pages/Admin/Admin'

export const authRoutes = [
    {
        path: FAVOURITE_ROUTE,
        Component: Favourite
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: RATING_ROUTE,
        Component: Rating
    },
    {
        path: SETTINGS_ROUTE,
        Component: Settings
    }
]
export const publiceRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: ABOUTE_ROUTE,
        Component: AboutUs
    },
    {
        path: CATALOG_ROUTE,
        Component: Catalog
    },
    {
        path: OFFER_ROUTE + "/:id",
        Component: Offer
    },
    {
        path: RATING_ROUTE + "/:id",
        Component: Rating
    },
    {
        path: CATALOG_ROUTE + "/:id",
        Component: Good
    },
    
]
export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
]