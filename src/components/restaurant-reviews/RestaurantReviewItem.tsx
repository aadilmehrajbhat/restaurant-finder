import { FC } from 'react';
import styled from 'styled-components';
import StarRating from '~/components/star-rating';
import DefaultLogo from '~/assets/icons/user.svg';
import { formatReviewDate } from './utils';

interface RestaurantReviewItemProps {
  url: string;
  text: string;
  rating: number;
  createdAt: Date;
  user: {
    id: string;
    profileUrl: string;
    imageUrl: string | null;
    name: string;
  };
}

const RestaurantReviewItem: FC<RestaurantReviewItemProps> = ({
  user,
  createdAt,
  rating,
  text,
}) => {
  return (
    <S.Container>
      <S.AvatarContainer>
        {user.imageUrl ? (
          <S.Avatar src={user.imageUrl} alt={user.name} />
        ) : (
          <DefaultLogo />
        )}
      </S.AvatarContainer>
      <S.Meta>
        <S.Name title={user.name}>{user.name}</S.Name>
        <S.Date>{formatReviewDate(createdAt)}</S.Date>
      </S.Meta>
      <S.ReviewContent>
        <S.StarRating total={5} rating={rating} size="small" />
        <S.ReviewText>{text}</S.ReviewText>
      </S.ReviewContent>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 3rem;
  `,
  AvatarContainer: styled.div`
    border-radius: 50%;
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    overflow: hidden;
  `,
  Avatar: styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
  `,
  Meta: styled.div`
    margin: 0 1.5rem;
    flex-shrink: 0;
    letter-spacing: 0.95px;
    width: 130px;
  `,
  Name: styled.p`
    margin: 0;
    display: block;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.2rem;
  `,
  Date: styled.p`
    margin: 0;
    opacity: 0.6;
    font-size: 0.95rem;
    margin-top: 0.25rem;
  `,
  StarRating: styled(StarRating)`
    margin: 0 0 1rem;
  `,
  ReviewContent: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ReviewText: styled.p`
    margin: 0;
    font-weight: 300;
    line-height: 1.5;
    font-size: 1.1rem;
    letter-spacing: 1px;
    opacity: 0.8;
  `,
};

export default RestaurantReviewItem;
