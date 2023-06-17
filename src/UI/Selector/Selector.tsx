import { memo, FC, ChangeEvent } from 'react'

import classes from './Selector.module.scss'
type Value = number | string | undefined;
export interface IOption {
    value: Value;
    name: string;
}
interface ISelector {
    className?: string;
    name: string;
    value: Value;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void
    options: IOption[];
    defaultValue?: Value;
    defaultName?: string
}

const Selector: FC<ISelector> = memo((props) => {
    const {
        className = '',
        name,
        value,
        onChange,
        options,
        defaultValue,
        defaultName = "Все"
    } = props;
    const joinClassName = [classes.selector, className].join(' ');
    return (
        <select
            className={joinClassName}
            value={value}
            onChange={onChange}
            name={name}
        >
            <option value={defaultValue}>
                {defaultName ? defaultName : defaultValue}
            </option>
            {options.map(option =>
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.name}
                </option>
            )}
        </select>
    );
})

export default Selector