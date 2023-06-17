import { useEffect } from 'react';
import useRequest from '../../../utils/hooks/useRequest';
import { observer } from 'mobx-react-lite';
import { IGetAllJSON } from '../../../store';
import { IRating, ratingStore } from '../../../store/RatingStore';
import { fetchRatingByUser } from '../../../http/RatingAPI';
import SectionList from '../../../components/SectionList/SectionList';
import RatingCard from '../../../components/RatingCard/RatingCard';
import defaultUser from '../../../assets/icons/User-icon.svg';
import ServerImage from '../../../UI/ServerImage/ServerImage';
import Title from '../../../UI/Title/Title';
import ContactLink, { ContactLinkType } from '../../../UI/ContactLink/ContactLink';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser, userStore } from '../../../store/UserStore';
import { getUserById } from '../../../http/userAPI';
import classes from './RatingSection.module.scss';
import UserHeader from '../../../components/UserHeader/UserHeader';

export const RatingSection = observer(() => {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;
  const [rating, isRatingLoading, ratingError, , setUserId] = useRequest<IGetAllJSON<IRating>>(fetchRatingByUser, undefined);

  useEffect(() => {
    if (userStore.user?.id && !id) {
      setUserId(userStore.user.id);
    }
    if (id) {
      setUserId(id);
    }

  }, [userStore.user?.id, id]);

  useEffect(() => {
    if (rating) {
      ratingStore.setRatings(rating);
    }
  }, [rating]);

  return (
    <SectionList
      className={classes.rating}
      error={ratingError}
      emptySubtitle={id ? 'Пользователь не оставлял отзывов' : 'Вы не оставляли отзывов'}
      isLoading={isRatingLoading}
      items={ratingStore.ratings?.rows || []}
      renderItem={rating => (
        <RatingCard
          key={rating.id}
          className={classes.rating_card}
          rating={rating}
        />
      )}
      header={(<UserHeader userId={id}/>)}
    />
  );
});
