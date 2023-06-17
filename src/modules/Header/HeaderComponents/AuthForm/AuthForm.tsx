import { memo, FC, useState, useCallback, ChangeEvent, useEffect } from 'react'
import { motion } from 'framer-motion'

import showPassImage from '../../../../assets/icons/show-password.svg'


import Input from '../../../../UI/Input/Input';
import ToggleButton from '../../../../UI/ToggleButton/ToggleButton';

import { getUserById, login, registration } from '../../../../http/userAPI';

import { IUser } from '../../../../store/UserStore';

import classes from './AuthForm.module.scss'

interface IAuthModal {
    formClose: () => void;
    setUser: (user: IUser | null) => void;
}
interface IFields {
    email: string;
    password: string;
    confirmPassword: string;
}
const AuthForm: FC<IAuthModal> = memo((props) => {
    const { formClose, setUser } = props
    const [fields, setFields] = useState<IFields>({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [isShowPass, setIsShowPass] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setFields(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }, []);
    const showPass = () => {
        setIsShowPass(prev => !prev)
    }
    const handleAction = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let data: any;
        try {
            if (isLogin) {
                data = await login(fields.email, fields.password)
            }
            else {
                if (isShowPass) {
                    data = await registration(fields.email, fields.password)
                }
                else if (fields.password === fields.confirmPassword) {
                    data = await registration(fields.email, fields.password)
                }
                else {
                    alert("Пароли не совпадает")
                }
            }
        }
        catch (e: any) {
            alert(e.response.data.message)
        }
        if (data?.id) {
            getUserById(data.id).then(data => setUser(data))
        }

    }

    return (
        <motion.form className={
            [
                classes.authForm,
                isLogin ? classes.authForm___isLogin : ''
            ].join(' ')}
            >
            <div className={
                [
                    classes.authForm_inner,
                    isLogin ? classes.authForm_inner___isLogin : ''
                ].join(' ')}>
                <div className={classes.authForm_tabs}>
                    <button className={
                        [
                            classes.authForm_tabButton,
                            isLogin ? classes.authForm_tabButton___active : ''
                        ].join(' ')} onClick={() => setIsLogin(true)}
                        type='button'
                    >
                        Авторизация
                    </button>
                    <button className={
                        [
                            classes.authForm_tabButton,
                            !isLogin ? classes.authForm_tabButton___active : ''
                        ].join(' ')} onClick={() => setIsLogin(false)}
                        type='button'
                    >
                        Регистрация
                    </button>
                </div>

                <div className={classes.authForm_fields}>
                    <Input
                        className={[classes.authForm_input].join(' ')}
                        value={fields.email}
                        onChange={onChangeHandler}
                        name='email'
                        placeholder='E-mail'
                        autoComplete='on'

                    />
                    <div className={classes.authForm_passwordBox}>
                        <Input
                            className={
                                [
                                    classes.authForm_input,
                                    classes.authForm_input___pass
                                ].join(' ')}
                            value={fields.password}
                            onChange={onChangeHandler}
                            name='password'
                            type={isShowPass ? 'text' : 'password'}
                            placeholder='Пароль'
                            autoComplete='on'

                        />
                        <ToggleButton
                            className={
                                [
                                    classes.authForm_showPassBtn,
                                    isShowPass ? classes.authForm_showPassBtn___active : ''
                                ]
                                    .join(' ')}
                            buttonImage={showPassImage}
                            onClick={showPass}
                            title={!isShowPass ? 'Показать пароль' : 'Скрыть пароль'}
                        />
                    </div>
                    {
                        !isShowPass && !isLogin
                            ? <Input
                                className={
                                    [
                                        classes.authForm_input,
                                        classes.authForm_input___pass
                                    ].join(' ')}
                                value={fields.confirmPassword}
                                onChange={onChangeHandler}
                                name='confirmPassword'
                                type={'password'}
                                placeholder='Подтвердить пароль'
                                autoComplete='on'

                            />
                            : null
                    }
                </div>
                <div className={classes.authForm_action}>
                    <button className={
                        [
                            classes.authForm_actionButton,
                        ].join(' ')} onClick={handleAction}
                        type='submit'
                    >
                        {isLogin ? 'Войти' : 'Создать'}

                    </button>
                    <button className={
                        [
                            classes.authForm_actionButton,
                            classes.authForm_actionButton___exite,
                        ].join(' ')} onClick={formClose}
                        type='button'
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </motion.form>
    )
})

export default AuthForm