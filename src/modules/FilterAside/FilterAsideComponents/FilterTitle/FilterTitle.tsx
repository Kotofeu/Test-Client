import { memo, FC, Dispatch } from 'react'
import Title from '../../../../UI/Title/Title';

import classes from './FilterTitle.module.scss'
interface IFilterTitle {
    className?: string;
    hideFilter: Dispatch<React.SetStateAction<boolean>>;
    title: string;
}
export const FilterTitle: FC<IFilterTitle> = memo((props) => {
    const { className = '', hideFilter, title } = props
    return (
        <div className={[classes.filterTitle, className].join(' ')} onClick={() => hideFilter(prev => !prev)}>
            <Title className={classes.filterTitle_title} >
                {title}
            </Title>
        </div>
    )
})







