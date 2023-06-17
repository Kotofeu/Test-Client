import { FC, memo, MouseEvent, } from 'react'
import classes from './ToggleButton.module.scss'
interface IGoodCard {
    className?: string;
    buttonImage: string;
    title: string;
    isActive?: boolean;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}
const ToggleButton: FC<IGoodCard> = memo((props) => {
    const { className = '', buttonImage, title, isActive = false, onClick } = props
    return (
        <button
            type='button'
            className={
                [
                    className,
                    classes.button,
                    isActive ? classes.button___isActive : ''
                ]
                    .join(' ')
            }
            onClick={onClick}
            title={title}
        >
            <img className={classes.button_image} src={buttonImage} alt={title} />
        </button>)
})

export default ToggleButton