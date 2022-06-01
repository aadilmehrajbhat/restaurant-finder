import { FC } from 'react';
import styled from 'styled-components';
import RestaurantReviewItem from './RestaurantReviewItem';
import useRestaurantReviews from '~/hooks/useRestaurantReviews';

interface RestaurantReviewsProps {
  id: string;
}

const RestaurantReviews: FC<RestaurantReviewsProps> = ({ id }) => {
  const { totalCount, reviews, loading, error } = useRestaurantReviews(id);

  if ((loading && !reviews.length) || error) {
    return null;
  }

  return (
    <>
      <S.TotalReviews>
        {totalCount}&nbsp;{totalCount === 1 ? 'Review' : 'Reviews'}
      </S.TotalReviews>
      {reviews.map((review) => (
        <RestaurantReviewItem
          key={review.id}
          url={review.url}
          text={review.text}
          rating={review.rating}
          createdAt={review.time_created}
          user={{
            id: review.user.id,
            profileUrl: review.user.profile_url,
            imageUrl: review.user.image_url,
            name: review.user.name,
          }}
        />
      ))}
    </>
  );
};

const S = {
  TotalReviews: styled.h3`
    font-weight: 300;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    opacity: 0.5;
    letter-spacing: 0.95px;
  `,
};

export default RestaurantReviews;
