import {
    memo,
    useEffect,
    useState,
    FC,
    ChangeEvent,
    useRef,
    useCallback,
    Dispatch
} from 'react'

import classes from './RangeSlider.module.scss'
import Input from '../../UI/Input/Input';

interface IValues {
    min: number;
    max: number
}
interface IRangeSlider {
    className?: string;
    showInputValues?: boolean;
    min: number;
    max: number;
    setValues: Dispatch<React.SetStateAction<IValues>>;
}
export const RangeSlider: FC<IRangeSlider> = memo((props) => {
    const { className = '', showInputValues = true, min, max, setValues } = props
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value);

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);
    useEffect(() => {
        setValues({ min: minVal, max: maxVal });
    }, [minVal, maxVal, setValues]);
    const onChangeMinValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(+event.target.value, maxVal - 1)
        setMinVal(Math.max(value, min));
    }
    const onChangeMaxValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(+event.target.value, minVal + 1)
        setMaxVal(Math.min(value, max));
    }
    return (
        <div className={[className, classes.rangeSlider].join(' ')}>
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                ref={minValRef}
                onChange={onChangeMinValue}
                className={[
                    classes.thumb,
                    classes.thumb___zindex3,
                    minVal > max - 100 ? classes.thumb___zindex5 : ''
                ].join(' ')}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                ref={maxValRef}
                onChange={onChangeMaxValue}
                className={[classes.thumb, classes.thumb___zindex4].join(' ')}
            />
            <div className={classes.slider}>
                <div className={classes.slider_track}></div>
                <div ref={range} className={classes.slider_range}></div>
            </div>
            {
                showInputValues
                    ? <div className={classes.rangeSlider_inputValues}>
                        <Input
                            className={[
                                classes.rangeSlider_input,
                                classes.rangeSlider_input___min
                            ].join(' ')}
                            type="number"
                            value={minVal.toString()}
                            onChange={onChangeMinValue}
                        />
                        <Input
                            className={[
                                classes.rangeSlider_input,
                                classes.rangeSlider_input___max
                            ].join(' ')}
                            type="number"
                            value={maxVal.toString()}
                            onChange={onChangeMaxValue}
                        />
                    </div>
                    : null
            }
        </div>
    )
})