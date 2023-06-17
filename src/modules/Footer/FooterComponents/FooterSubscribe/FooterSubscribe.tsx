import { memo, FormEvent, useCallback, useState, FC } from 'react'

import FooterTitle, { FooterTitleType } from '../FooterTitle/FooterTitle'
import Form from '../../../../components/Form/From'

import classes from './FooterSubscribe.module.scss'
interface IFooterSubscribe{
    title: string;
    className: string;
}
const FooterSubscribe: FC<IFooterSubscribe> = memo((props) => {
    const {title, className} = props
    const [email, setEmail] = useState<string>('');

    const subscribeFormSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            //Отправка на сервер
        }, []
    )
    const subscribeFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    return (
        <div className={className}>
            <FooterTitle titleType={FooterTitleType.h4}>{title}</FooterTitle>
            <Form
                className={classes.footer_subscribeForm}
                onFormSubmit={subscribeFormSubmit}
                inputProps={{
                    value:email,
                    type:'text',
                    title:'Поле ввода сообщения',
                    autoComplete:'off',
                    placeholder:'Введите сообщение',
                    onChange: subscribeFormChange,
                }}
                buttonProps={{
                    buttonTitle: 'Отправить'
                }}
            />
        </div>)
})

export default FooterSubscribe