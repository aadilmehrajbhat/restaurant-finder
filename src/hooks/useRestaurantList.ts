import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
  useEffect,
} from 'react';
import {
  PRICE_LABEL,
  DEFAULT_IS_OPEN_NOW,
  DEFAULT_PRICE,
  DEFAULT_LOCATION,
  DEFAULT_CATEGORY,
  PriceFilter,
} from '~/components/restaurant-filters';
import { useDeepCompareEffect } from 'use-deep-compare';
import { fetchRestaurants } from '~/services/restaurants';
import useRestaurantListReducer from './useRestaurantListReducer';

const useRestaurantList = ({
  limit = 12,
  isOpenNow = DEFAULT_IS_OPEN_NOW,
  price = DEFAULT_PRICE,
  category = DEFAULT_CATEGORY,
}: {
  limit?: number;
  isOpenNow: boolean;
  category: string[];
  price: PriceFilter[];
}) => {
  const {
    page,
    totalCount,
    restaurants,
    loading,
    error,
    filters,
    loadRestaurants,
    loadRestaurantsSuccess,
    loadRestaurantsFailure,
    changeFilters,
    loadMoreRestaurants,
    reset,
  } = useRestaurantListReducer();

  const result = useMemo(() => {
    if (!isOpenNow && !price.join(',')) {
      return restaurants;
    }

    return restaurants.filter(
      (restaurant) =>
        price.includes(PRICE_LABEL[restaurant.price] as PriceFilter) ||
        restaurant.is_closed === !isOpenNow,
    );
  }, [isOpenNow, price, restaurants]);

  const resultCount = useMemo(
    () => (result.length === restaurants.length ? totalCount : result.length),
    [restaurants, result, totalCount],
  );

  const hasMoreData = useMemo(
    () => result.length !== resultCount,
    [result, resultCount],
  );

  const getRestaurants = useCallback(async () => {
    try {
      loadRestaurants();
      const { restaurants, total } = await fetchRestaurants({
        location: DEFAULT_LOCATION,
        limit,
        page,
        category,
      });

      loadRestaurantsSuccess(restaurants, total);
    } catch (error) {
      loadRestaurantsFailure((error as Error).message);
    }
  }, [page, isOpenNow, price, category]);

  const loadMoreData = useCallback(() => {
    if (!hasMoreData) return;
    loadMoreRestaurants();
  }, [hasMoreData, loadMoreRestaurants, getRestaurants]);

  useDeepCompareEffect(() => {
    changeFilters({ categories: category, prices: price, isOpenNow });
  }, [category]);

  useDeepCompareEffect(() => {
    getRestaurants();
  }, [page, filters]);

  return {
    restaurants: result,
    totalCount: resultCount,
    hasMoreData,
    loading,
    error,
    loadMoreData,
    reset,
  };
};

export default useRestaurantList;
