import { memo, FC, ChangeEvent } from 'react'

import classes from './FilterAsideCheckbox.module.scss'

interface IFilterAsideCheckbox {
    className?: string;
    name: string;
    value: number;
    isChecked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    title: string;

}
export const FilterAsideCheckbox: FC<IFilterAsideCheckbox> = memo((props) => {
    const { className = '', name, value, isChecked, onChange, title } = props
    return (
        <div className={[classes.filterCheckbox, className].join(' ')}>
            <input
                id={name + value}
                className={classes.filterCheckbox_input}
                checked={isChecked}
                type='checkbox'
                name={name}
                value={value}
                onChange={onChange}
            />
            <label className={classes.filterCheckbox_title} htmlFor={name + value}>
                {title}
            </label>
        </div>
    )
})
