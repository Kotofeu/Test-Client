import { memo, FC, MouseEvent } from 'react'
import classes from './GuestMenu.module.scss'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { HOME_ROUTE, RATING_ROUTE, SETTINGS_ROUTE } from '../../../../utils/const/routes';
interface IGuestMenu {
  className?: string;
  onExitClick: (event: MouseEvent<HTMLButtonElement>) => void;
  isOpen: boolean
}
const animationVariant = {
  "open": {
    scaleX: 1,
    scaleY: 1,
    opacity: 1
  },
  "close": {
    scaleX: 0,
    scaleY: 0,
    opacity: 0
  }
}
const GuestMenu: FC<IGuestMenu> = memo((props) => {
  const { onExitClick, isOpen, className = '' } = props
  return (
    <AnimatePresence>
      {isOpen && <motion.div
        className={[classes.guestMenu, className].join(' ')}
        initial={animationVariant.close}
        exit={animationVariant.close}
        animate={animationVariant.open}
      >
        <nav className={classes.guestMenu_nav}>
          <NavLink className={classes.guestMenu_link} to={RATING_ROUTE}>
            Мои отзывы
          </NavLink>
          <NavLink className={classes.guestMenu_link} to={SETTINGS_ROUTE}>
            Настройки
          </NavLink>
        </nav>

        <button
          className={classes.guestMenu_button}
          type='button'
          onClick={onExitClick}
        >
          Выйти
        </button>
      </motion.div>
      }

    </AnimatePresence>

  )
})

export default GuestMenu