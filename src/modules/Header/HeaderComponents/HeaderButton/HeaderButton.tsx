import { FC, memo } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './HeaderButton.module.scss'

interface IHeaderButton {
  imageSrc: string;
  title: string;
  link: string;
  className?: string;
}
const HeaderButton: FC<IHeaderButton> = memo((props) => {
  const { imageSrc, title, link, className } = props
  return (
    <NavLink className={[classes.headerButton, className].join(' ')} to={link}>
      <img className={classes.headerButton_link} src={imageSrc} alt={title} />
      <span className={classes.headerButton_title}>{title}</span>
    </NavLink>)
})

export default HeaderButton