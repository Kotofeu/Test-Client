import { memo, useEffect, useState, FormEvent } from 'react'
import SectionList from '../../../../components/SectionList/SectionList'
import { IGoodJSON } from '../../../../store/GoodStore'
import { fetchOneGood } from '../../../../http/GoodAPI'
import useRequest from '../../../../utils/hooks/useRequest'
import { useParams } from 'react-router-dom'
import ServerImage from '../../../../UI/ServerImage/ServerImage'

import classes from './GoodSection.module.scss'
import Title from '../../../../UI/Title/Title'
import MySlider from '../../../../components/MySlider/MySlider'
import GoodRating from '../../../../components/GoodCard/GoodRating/GoodRating'
import { GoodBuy } from '../../../../components/GoodCard/GoodBuy/GoodBuy'
import { Swiper, SwiperSlide } from 'swiper/react'
import swiper, { Thumbs } from 'swiper'
import RatingCard from '../../../../components/RatingCard/RatingCard'
import { observer } from 'mobx-react-lite'
import { userStore } from '../../../../store'
import Form from '../../../../components/Form/From'
import MultipleFileInput from '../../../../components/MultipleFileInput/MultipleFileInput'
import Modal from '../../../../components/Modal/Modal'
import Input from '../../../../UI/Input/Input'
import StarRating from '../../../../UI/StarRating/StarRating'
import { postRating } from '../../../../http/RatingAPI'
const settings = {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: { enabled: true },
    scrollbar: { draggable: true },
    autoHeight: true,

}
export const GoodSection = observer(() => {
    const { id } = useParams();
    const [isRatingCreate, setIsRatingCreate] = useState<boolean>(false);
    const [userRating, setUserRating] = useState<number>(0);
    const [userComment, setUserComment] = useState<string>('');
    const [userFile, setUserFile] = useState<FileList | null>();
    const [
        good,
        isGoodLoading,
        goodError,
        executeGood,
        setGoodParams
    ] = useRequest<IGoodJSON>(fetchOneGood, null, false)
    useEffect(() => {
        if (id && +id) {
            setGoodParams(+id)
        }
    }, [])
    const onRatingFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (good?.id) {
            const formData = new FormData()
            formData.append('comment', userComment)
            formData.append('rating', `${userRating}`)
            if (userFile) {
                for (let i = 0; i < userFile.length; i++) {
                    formData.append("images", userFile[i], userFile[i].name)
                }
            }
            else {
                formData.append("images", '')
            }
            formData.append('goodId', `${good.id}`)

            postRating(formData).then(() => setIsRatingCreate(false)).then(() => executeGood())
        }
        else {
            setIsRatingCreate(false)
        }

    }
    if (!good) return null
    return (
        <div className={classes.good}>
            <div className={classes.good_inner}>
                <div className={classes.good_card}>
                    {
                        good.good_images?.length
                            ? <MySlider
                                settings={settings}
                                className={classes.good_imageSlider}
                                slideClass={classes.good_imageSlide}
                                items={good.good_images || []}
                                renderItem={image => (
                                    <ServerImage
                                        key={image.id}
                                        className={classes.good_image}
                                        src={image.image}
                                        alt={image.id.toString()}
                                    />
                                )}
                            />
                            : <ServerImage
                                className={classes.good_imageSlider}
                                src={undefined}
                                alt='broken image'
                            />
                    }

                    <div className={classes.good_name}>
                        <div>
                            {good.name}
                        </div>
                        <div className={classes.good_characteristic}>
                            {
                                good.good_infos?.length
                                    ?
                                    <>
                                        <Title className={classes.characteristic_title}>
                                            Характеристики
                                        </Title>
                                        {
                                            good.good_infos.map(info => (
                                                <div className={classes.characteristic_row} key={info.id}>
                                                    <div className={classes.characteristic_name}>{info.name}</div>
                                                    <div className={classes.characteristic_desc}>{info.description}</div>
                                                </div>
                                            ))
                                        }
                                    </>
                                    : null
                            }
                        </div>

                    </div>
                </div>
                <div className={classes.ratingSection}>
                    <Title className={classes.ratingSection_title}>
                        Отзывы на товар
                    </Title>
                    {
                        !good.ratings.length
                            ? <Title className={classes.ratingSection_empty}>
                                Отзывы отсутствуют
                            </Title>
                            : null
                    }
                    {
                        userStore.isAuth
                            ?
                            <div>
                                <Modal selectedId={isRatingCreate} closeModal={() => setIsRatingCreate(false)}>
                                    <form className={classes.ratingForm} onSubmit={onRatingFormSubmit}>
                                        <div className={classes.ratingForm_fields}>
                                            <Input
                                                value={userComment}
                                                onChange={(event) => setUserComment(event.target.value)}
                                                className={classes.ratingForm_input}
                                                type="text"
                                                placeholder='Напишите комментарий'
                                            />
                                            <StarRating rating={userRating} setRating={value => setUserRating(value)} starDimension='30px' starSpacing='4px' />
                                            <MultipleFileInput
                                                title='Добавить изображения'
                                                handleFilesChange={(files) => setUserFile(files)}
                                            />
                                        </div>

                                        <div className={classes.ratingForm_controller}>
                                            <button className={classes.ratingForm_button} type='button' onClick={() => setIsRatingCreate(false)}>Отмена</button>
                                            <button className={classes.ratingForm_button} type='submit'>Отправить</button>
                                        </div>

                                    </form>
                                </Modal>
                            </div>
                            : null
                    }
                    {good.ratings.sort((a, b) => b.id - a.id).map(rating => (
                        <RatingCard
                            className={classes.ratingSection_rating}
                            key={rating.id}
                            rating={rating}
                        />
                    ))}
                </div>
            </div >
            <aside className={classes.good_aside}>
                <div className={classes.good_rating}>
                    <GoodRating ratings={good.ratings} />
                    {
                        good.brand?.image
                            ? <ServerImage className={classes.good_brand} src={good.brand?.image} alt={good.brand?.name || ''} />
                            : null
                    }

                </div>
                <div className={classes.good_price}>
                    <GoodBuy goodId={good.id} price={good.price} oldPrice={good.oldPrice} />
                </div>
                {
                    userStore.isAuth ?
                        <button className={classes.good_writeRating} type='button' onClick={() => setIsRatingCreate(true)}>Написать отзыв</button>
                        : null
                }
            </aside>
        </div >

    )
})