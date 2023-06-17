import { memo, FC } from 'react'
import ServerImage from '../../../../UI/ServerImage/ServerImage'
import TotalAmount from '../../../../components/TotalAmount/TotalAmount'
import Title, { TitleType } from '../../../../UI/Title/Title'
import { IComprehensiveOffer } from '../../../../store/ComprehensiveOfferStore'
import deleteImage from '../../../../assets/icons/delete.svg'

import classes from './OfferSectionHeader.module.scss'
import { deleteComprehensiveOffer } from '../../../../http/ComprehensiveOfferAPI'
import ToggleButton from '../../../../UI/ToggleButton/ToggleButton'
import { userStore } from '../../../../store'
import { useNavigate } from 'react-router-dom'
interface IOfferSectionHeader {
    className?: string;
    offer?: IComprehensiveOffer;
}
export const OfferSectionHeader: FC<IOfferSectionHeader> = memo((props) => {
    const { className = '', offer } = props
    const navigate = useNavigate();
    const goodDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (offer?.id) {
            deleteComprehensiveOffer(offer.id)
                .then(() => alert("Предложение удалено"))
                .catch(() => alert('Ошибка удаления'))
                .finally(() => navigate('/'))
        }
    }
    return (
        <header className={[classes.offerHeader, className].join(' ')}>
            <div className={classes.offerHeader_inner}>
                <ServerImage
                    className={classes.offerHeader_image}
                    src={offer?.image}
                    alt={offer?.name + ""}
                />
                <div className={classes.offerHeader_offerAbout}>
                    <p className={classes.offerHeader_desc}>
                        {offer?.description}

                    </p>
                    <div className={classes.offerHeader_controller}>
                        {
                            offer?.price
                                ? <TotalAmount
                                    className={classes.offerHeader_amount}
                                    amountString='Стоимость: '
                                    amount={offer?.price}

                                />
                                : null
                        }
                        {
                            userStore.isAdmin
                                ? <ToggleButton
                                    className={classes.offerHeader_deleteButton}
                                    title='Удалить'
                                    buttonImage={deleteImage}
                                    onClick={goodDelete}
                                />
                                : null
                        }
                    </div>


                </div>
            </div>
            <Title className={classes.offerHeader_title} titleType={[TitleType.posCetner]}>
                {offer?.complex_offer_goods?.length ? 'Товары в предложении' : null}
            </Title>
        </header>)
})
