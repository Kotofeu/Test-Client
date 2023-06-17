import {
    FC,
    memo,
    FormEvent
} from 'react'

import classes from './Form.module.scss'
import Input, { IInput } from '../../UI/Input/Input'
interface IFormButton {
    buttonTitle: string;
    buttonImage?: string;
}
interface IForm {
    className?: string;
    buttonProps: IFormButton;
    inputProps: IInput;
    onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
}
const Form: FC<IForm> = memo((props) => {
    const {
        className,
        buttonProps,
        inputProps,
        onFormSubmit
    } = props
    const { buttonTitle, buttonImage } = buttonProps
    return (
        <form
            className={
                [classes.form, className ? className : '']
                    .join(' ')
            }
            onSubmit={onFormSubmit}
        >
            <Input
                className={classes.form_input}
                {...inputProps}
            />
            <button
                className={classes.form_button}
                type='submit'
                title={buttonProps.buttonTitle}
            >
                {
                    buttonImage
                        ? <img className={classes.form_buttonImage} src={buttonImage} alt={buttonTitle} />
                        : <div className={classes.form_buttonText}>
                            <span>
                                {buttonTitle}
                            </span>
                        </div>

                }
            </button>
        </form>
    )
})

export default Form