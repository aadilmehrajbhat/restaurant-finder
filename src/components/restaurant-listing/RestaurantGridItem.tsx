import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StarRating from '~/components/star-rating';
import OpenStatus from '~/components/open-status';

interface RestaurantGridItemProps {
  id: string;
  isOpen: boolean;
  title: string;
  imageUrl: string;
  rating: number;
  price: string;
  category: string;
  loading: 'lazy' | 'eager';
}

const RestaurantGridItem: FC<RestaurantGridItemProps> = ({
  id,
  isOpen,
  title,
  imageUrl,
  rating,
  price,
  category,
  loading,
}) => (
  <S.Container>
    <div>
      <S.Image src={imageUrl} alt={title} loading={loading} />
      <S.Title>{title}</S.Title>
    </div>
    <S.SubContent>
      <StarRating total={5} rating={rating} />
      <S.MetaContent>
        <span>
          {category} - {price}
        </span>
        <OpenStatus isOpen={isOpen} />
      </S.MetaContent>
      <S.LearnMore to={`/r/${id}`}>Learn more</S.LearnMore>
    </S.SubContent>
  </S.Container>
);

const S = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  Image: styled.img`
    width: 100%;
    height: 250px;
    object-fit: cover;
  `,
  Title: styled.h3`
    font-size: 1.45rem;
    line-height: 1.45;
    margin: 0.75rem 0;
    font-weight: 400;
    flex: 1;
  `,
  SubContent: styled.div`
    display: flex;
    flex-direction: column;
  `,
  MetaContent: styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.greyLight};
    text-transform: uppercase;
    letter-spacing: 0.25px;
  `,
  LearnMore: styled(Link)`
    display: block;
    text-align: center;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primaryText};
    padding: 1.35em 0;
    margin: 1.5em 0;
    font-size: 0.9rem;
    font-weight: 300;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 1px;
    cursor: pointer;
    transition: opacity 200ms;

    &:hover {
      opacity: 0.8;
    }
  `,
};

export default RestaurantGridItem;
