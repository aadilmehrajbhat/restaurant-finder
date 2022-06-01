import styled from 'styled-components';
import Container from '~/components/container';
import PageHeading from '~/components/page-heading';
import PageCaption from '~/components/page-caption';
import useRestaurantList from '~/hooks/useRestaurantList';
import Button from '~/components/button';
import RestaurantFilters, {
  DEFAULT_IS_OPEN_NOW,
  DEFAULT_PRICE,
  DEFAULT_CATEGORY,
  PriceFilter,
} from '~/components/restaurant-filters';

import RestaurantGrid from './RestaurantGrid';
import { useState } from 'react';

const RestaurantListing = () => {
  const [isOpenNow, setIsOpenNow] = useState(DEFAULT_IS_OPEN_NOW);
  const [price, setPrice] = useState(DEFAULT_PRICE);
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const { restaurants, loading, error, hasMoreData, loadMoreData } =
    useRestaurantList({ isOpenNow, price, category });

  return (
    <Container>
      <PageHeading>Restaurants</PageHeading>
      <PageCaption>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </PageCaption>

      <RestaurantFilters
        isOpenNow={isOpenNow}
        onOpenNowClick={() => setIsOpenNow((p) => !p)}
        selectedPrice={price}
        onPriceChange={(price) => setPrice(price as PriceFilter[])}
        category={category}
        onCategoryChange={(category) => setCategory(category as string[])}
        onClearClick={() => {
          setIsOpenNow(DEFAULT_IS_OPEN_NOW);
          setPrice(DEFAULT_PRICE);
          setCategory(DEFAULT_CATEGORY);
        }}
      />

      <S.Heading>All Restaurants</S.Heading>
      <RestaurantGrid
        restaurants={restaurants}
        error={error}
        loading={loading}
      />
      {restaurants.length && hasMoreData ? (
        <S.LoadMore
          onClick={loadMoreData}
          block
          variant="outlined"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load more'}
        </S.LoadMore>
      ) : null}
    </Container>
  );
};

const S = {
  Heading: styled.h1`
    font-size: 1.75rem;
    font-weight: 300;
    opacity: 0.75;
    margin: 3.5rem 0 1.5rem;
  `,
  LoadMore: styled(Button)`
    max-width: 40vw;
    margin: 2rem auto;
  `,
};

export default RestaurantListing;
