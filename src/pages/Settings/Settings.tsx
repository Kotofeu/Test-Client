import { FormEvent, useState } from 'react'
import Container from '../../UI/Container/Container'
import { observer } from 'mobx-react-lite'
import { userStore } from '../../store'
import ServerImage from '../../UI/ServerImage/ServerImage'
import defaultImage from '../../assets/icons/User-icon.svg'
import { edit, getUserById } from '../../http/userAPI'
import { useNavigate } from 'react-router-dom'

import classes from './Settings.module.scss'
import Input from '../../UI/Input/Input'
import UserHeader from '../../components/UserHeader/UserHeader'
const Settings = observer(() => {
    const id = userStore.user?.id
    const navigate = useNavigate()
    const [userFile, setUserFile] = useState<File | null>();
    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [userPhone, setUserPhone] = useState<string>('');
    const onRatingFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (id) {
            const formData = new FormData()
            if (userName) {
                formData.append('name', userName)
            }
            if (userEmail) {
                formData.append('newEmail', userEmail)
            }
            if (userPassword) {
                formData.append('newPassword', userPassword)
            }
            if (userPhone) {
                formData.append('phone', userPhone)
            }
            if (userFile) {
                formData.append("image", userFile)
            }
            edit(formData)
                .then(() => getUserById(id)
                    .then(data => userStore.setUser(data)))
                .then(() => navigate('/'))
                .catch(ex => alert(ex.response.data.message ?? ex))
        }
        else {
            alert('Ошибка получения пользовательских данных')
        }

    }
    return (
        <Container>

            <div className={classes.settings}>
                <UserHeader/>
                <form className={classes.settings_form} onSubmit={onRatingFormSubmit}>
                    <div className={classes.settings_fieldsInputs}>
                        <Input className={classes.settings_input} placeholder={"Введите ваше имя"} value={userName} onChange={(event) => setUserName(event.target.value)} type="text" />
                        <Input className={classes.settings_input} placeholder={"Введите ваш номер телефона"} value={userPhone} onChange={(event) => setUserPhone(event.target.value)} type="text" />
                        <Input className={classes.settings_input} placeholder={"Введите ваш новый адрес электронной почты"} value={userEmail} onChange={(event) => setUserEmail(event.target.value)} type="email" />
                        <Input className={classes.settings_input} placeholder={"Введите ваш новый пароль"} value={userPassword} onChange={(event) => setUserPassword(event.target.value)} type="password" />
                        <div className={classes.settings_imageBox}>
                            <label className={classes.settings_imageInput}>
                                Загрузите ваше новое фото
                                <input type="file" multiple accept=".jpg,.jpeg,.png" onChange={(event) => setUserFile(event.target.files ? event.target.files[0] : null)} style={{ display: 'none' }} />
                            </label>
                            <div className={classes.settings_imageName}>{userFile?.name}</div>
                        </div>

                    </div>
                    <button className={classes.settings_formButton} type="submit">Обновить данные</button>
                </form>
            </div>
        </Container>

    )
})

export default Settings