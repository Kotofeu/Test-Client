import { FC, MouseEvent, useState } from 'react'
import { observer } from 'mobx-react-lite'
import defaultUserImage from '../../../../assets/icons/User-icon.svg'

import classes from './HeaderUser.module.scss'
import ServerImage from '../../../../UI/ServerImage/ServerImage'
import { userStore } from '../../../../store'
import AuthForm from '../AuthForm/AuthForm'
import Modal from '../../../../components/Modal/Modal'
import { IUser } from '../../../../store/UserStore'
import GuestMenu from '../GuestMenu/GuestMenu'

interface IHeaderUser {
    className?: string;

}
const HeaderUser: FC<IHeaderUser> = observer(
    ({ className = '' }) => {
        const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
        const IsUserAuth: boolean = userStore.isAuth
        const connetcion = (user: IUser | null) => {
            setIsModalOpen(false)
            userStore.setIsAuth(!!user)
            userStore.setUser(user)
            if (!user) {
                localStorage.setItem('token', '')
                
            }
        }
        const toggleModal = () => {
            setIsModalOpen(prev => !prev)
        }
        const handleExit = (event: MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            connetcion(null)
        }
        return (
            <div
                className={[classes.user, className].join(' ')}
            >
                <div
                    className={classes.user_openForm}
                    onClick={toggleModal}
                >
                    <ServerImage
                        className={
                            [
                                classes.user_image,
                                isModalOpen ? classes.user_image___active : ''
                            ].join(' ')}
                        src={userStore.user?.image || undefined}
                        altSrc={defaultUserImage}
                        alt='user'
                    />
                    {
                        IsUserAuth
                            ? <GuestMenu
                                className={classes.user_guestMenu}
                                isOpen={isModalOpen}
                                onExitClick={handleExit}
                            />
                            : null
                    }
                </div>
                {
                    !IsUserAuth
                        ? <Modal selectedId={isModalOpen} closeModal={toggleModal}>
                            <AuthForm formClose={toggleModal} setUser={connetcion} />
                        </Modal>
                        : null
                }
            </div>
        )
    }
)

export default HeaderUser