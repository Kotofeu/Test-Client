import { useEffect, useState } from 'react'
import { IUser, userStore } from '../../store/UserStore';
import { observer } from 'mobx-react-lite';
import useRequest from '../../utils/hooks/useRequest';
import { getUserById } from '../../http/userAPI';
import Title from '../../UI/Title/Title';
import ContactLink, { ContactLinkType } from '../../UI/ContactLink/ContactLink';
import ServerImage from '../../UI/ServerImage/ServerImage';

import defaultUser from '../../assets/icons/User-icon.svg';
import Loader from '../../UI/Loader/Loader';

import classes from './UserHeader.module.scss'


interface IUserHeader {
    className?: string;
    userId?: number
}
const UserHeader = observer(({ className = '', userId }: IUserHeader) => {
    const [
        userById,
        userLoading,
        userError
    ] = useRequest<IUser>(getUserById, userId);
    const [user, setUser] = useState<IUser | null>(userStore.user)
    const image = user?.image;
    const email = user?.users_authorization?.email;
    const phone = user?.phone;
    const name = user?.name;
    const role = user?.users_authorization?.role || "USER";
    const date = user?.createdAt ? new Date(user?.createdAt) : undefined;
    useEffect(() => {
        if (userById) setUser(userById)
        if (!userId && userStore.user) setUser(userStore.user)
    }, [userById, userStore.user])
    return (
        <header className={[classes.userHeader, className].join(' ')}>
            {
                userLoading && userId
                    ? <Loader />
                    : null
            }
            {
                userError && userById
                    ? <Title className={classes.userHeader_empty}>{userError.response.data.message ?? userError}</Title>
                    : null
            }
            {
                !user && !userLoading && !userError && userId
                    ? <Title className={classes.userHeader_empty}>Пользователь не найден</Title>
                    : null
            }
            {
                !user
                    ? null
                    : <>
                        <div className={classes.userHeader_main}>
                            <div className={classes.userHeader_user}>
                                <ServerImage
                                    className={classes.userHeader_userImage}
                                    src={image || undefined}
                                    altSrc={defaultUser}
                                    alt={name || ''}
                                />
                                <Title
                                    className={classes.userHeader_username}
                                >
                                    {[name, ' (', role, ')'].join('')}
                                </Title>
                            </div>
                            {date ?
                                <div className={classes.userHeader_userCreatedAt}>
                                    Зарегестрирован: {date.toLocaleDateString()}
                                </div>
                                : null
                            }
                        </div>
                        <div className={classes.userHeader_contacts}>
                            {phone ?
                                <ContactLink
                                    className={classes.userHeader_userContact}
                                    href={phone}
                                    linkType={ContactLinkType.tel}
                                />
                                : null
                            }
                            {email ?
                                <ContactLink
                                    className={classes.userHeader_userContact}
                                    href={email}
                                    linkType={ContactLinkType.email}
                                />
                                : null
                            }
                        </div>
                    </>
            }

        </header>
    )
})

export default UserHeader