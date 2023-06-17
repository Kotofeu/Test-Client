
import Container from '../../../../UI/Container/Container'
import { NavLink } from 'react-router-dom'
import HeaderButton from '../HeaderButton/HeaderButton'
import HeaderSearchForm from '../HeaderSearchForm/HeaderSearchForm'

import logoImage from '../../../../assets/icons/IH-logo.svg'
import catalogImage from '../../../../assets/icons/Catalog.svg'
import aboutImage from '../../../../assets/icons/AboutUs.svg'
import favouritesImage from '../../../../assets/icons/Favourites.svg'
import basketImage from '../../../../assets/icons/Basket.svg'
import adminPandel from '../../../../assets/icons/AdminPanel.svg'

import HeaderUser from '../HeaderUser/HeaderUser'


import classes from './Header.module.scss'
import { ABOUTE_ROUTE, ADMIN_ROUTE, BASKET_ROUTE, CATALOG_ROUTE, FAVOURITE_ROUTE } from '../../../../utils/const/routes'
import { userStore } from '../../../../store'
import { observer } from 'mobx-react-lite'

export const Header = observer(() => {
  return (
    <header className={classes.header}>
      <Container>
        <div className={classes.header_inner}>
          <NavLink className={classes.header_logo} to='/'>
            <img className={classes.header_logoImage} src={logoImage} alt='IHouse Shop company' />
          </NavLink>
          <nav className={classes.header_navigation}>
            <div className={classes.header_linkButtons}>
              <HeaderButton
                className={classes.header_link}
                imageSrc={catalogImage}
                title='Каталог'
                link={CATALOG_ROUTE}
              />
              <HeaderButton
                className={classes.header_link}
                imageSrc={aboutImage}
                title='О нас'
                link={ABOUTE_ROUTE}
              />
            </div>
            <HeaderSearchForm />
            {
              userStore.isAuth
                ? <div className={classes.header_linkButtons}>
                  <HeaderButton
                    className={classes.header_link}
                    imageSrc={favouritesImage}
                    title='Избранное'
                    link={FAVOURITE_ROUTE}
                  />
                  <HeaderButton
                    className={classes.header_link}
                    imageSrc={basketImage}
                    title='Корзина'
                    link={BASKET_ROUTE}
                  />
                </div>
                : null
            }
            {
              userStore.isAdmin
                ? <div className={classes.header_linkButtons}>
                  <HeaderButton
                    className={classes.header_link}
                    imageSrc={adminPandel}
                    title='Добавить'
                    link={ADMIN_ROUTE}
                  />
                </div>
                : null
            }

          </nav>
          <HeaderUser className={classes.header_user} />

        </div>
      </Container>
    </header>
  )
})
