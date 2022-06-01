import { useParams, Navigate } from 'react-router-dom';
import { FC } from 'react';
import styled from 'styled-components';
import Container from '~/components/container';
import PageHeading from '~/components/page-heading';
import StarRating from '~/components/star-rating';
import OpenStatus from '~/components/open-status';
import RestaurantReviews from '~/components/restaurant-reviews';
import Map from '~/components/map';
import useRestaurantDetail from '~/hooks/useRestaurantDetail';

interface RestaurantDetailProps {}

const RestaurantDetail: FC<RestaurantDetailProps> = ({}) => {
  let { id } = useParams();
  const { restaurant, loading, error } = useRestaurantDetail(id as string);

  if (loading) {
    return <S.Loader>Loading...</S.Loader>;
  }

  if (error) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    restaurant && (
      <Container>
        <PageHeading>{restaurant.name}</PageHeading>
        <S.StarRating total={5} rating={restaurant.rating} />
        <S.Meta>
          <div>
            {restaurant.categories.length > 1
              ? 'All'
              : restaurant.categories[0].title}
            &nbsp;&middot;&nbsp;{restaurant.price}
          </div>
          <OpenStatus isOpen={!restaurant.is_closed} size="large" />
        </S.Meta>
        <S.Map
          center={[
            restaurant.coordinates.latitude,
            restaurant.coordinates.longitude,
          ]}
          coordinates={[
            [
              restaurant.coordinates.latitude,
              restaurant.coordinates.longitude,
              restaurant.name,
            ],
          ]}
        ></S.Map>
        <S.AddressText>
          {restaurant.location.display_address.join(', ')}
        </S.AddressText>
        <S.Divider />
        <RestaurantReviews id={restaurant.alias} />
      </Container>
    )
  );
};

const S = {
  Loader: styled.div`
    background: #fff;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    opacity: 0.6;
    font-weight: 300;
  `,
  StarRating: styled(StarRating)`
    margin: 0 0 1em;
  `,
  Meta: styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    opacity: 0.6;
    font-weight: 300;
  `,
  AddressText: styled.p`
    margin: 1rem 0;
    font-size: 0.9rem;
    opacity: 0.6;
    font-weight: 300;
  `,
  Divider: styled.div`
    height: 1px;
    width: 100%;
    background: #000;
    opacity: 0.09;
    margin: 2.5rem 0;
  `,
  Map: styled(Map)`
    height: 250px;
    margin: 1rem 0 0.5rem;
  `,
};

export default RestaurantDetail;
