import { FC, Children } from 'react';
import styled from 'styled-components';
import { Restaurant } from '~/types/restaurant';
import NoRestaurantResults from './NoRestaurantsResult';
import RestaurantGridItem from './RestaurantGridItem';

interface RestaurantGridProps {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
}

const RestaurantGrid: FC<RestaurantGridProps> = ({
  restaurants,
  loading,
  error,
}) => {
  if (loading && !restaurants.length) {
    return <NoRestaurantResults text="Loading restaurants..." />;
  }

  if (!loading && !restaurants.length) {
    return <NoRestaurantResults text="No restaurants found!" />;
  }

  if (error) {
    return <NoRestaurantResults text="Oops, something went wrong!" />;
  }

  return (
    <S.Container>
      {restaurants.map((restaurant, i) => (
        <RestaurantGridItem
          key={restaurant.id}
          id={restaurant.alias}
          isOpen={!restaurant.is_closed}
          title={restaurant.name}
          rating={restaurant.rating}
          imageUrl={restaurant.image_url}
          price={restaurant.price}
          category={restaurant.categories[0]?.title}
          loading={i <= 6 ? 'eager' : 'lazy'}
        />
      ))}
    </S.Container>
  );
};

const S = {
  Container: styled.section`
    --columns: 1;
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    grid-gap: 1.5rem;

    @media (min-width: ${({ theme }) => theme.screens.md}) {
      --columns: 2;
    }

    @media (min-width: ${({ theme }) => theme.screens.lg}) {
      --columns: 4;
    }

    @media (min-width: ${({ theme }) => theme.screens['2xl']}) {
      --columns: 5;
    }

    @media (min-width: ${({ theme }) => theme.screens['3xl']}) {
      --columns: 6;
    }
  `,
  item: styled.div`
    height: 200px;
    color: #fff;
    background: #000;
  `,
};

export default RestaurantGrid;
