import { PriceFilter, DEFAULT_LOCALE } from '~/components/restaurant-filters';
import type { Restaurant, Review, Category } from '~/types/restaurant';
import { yelpApiClient } from './constants';

export const fetchRestaurants = async ({
  location,
  limit,
  page,
  price = [],
  isOpenNow: open_now = false,
  category,
}: {
  location: string;
  limit: number;
  page: number;
  price?: PriceFilter[];
  isOpenNow?: boolean;
  category: string[];
}): Promise<{ total: number; restaurants: Restaurant[] }> => {
  try {
    const { status, data } = await yelpApiClient.get('/businesses/search', {
      params: {
        categories: category.join(',') || 'restaurants',
        location,
        limit,
        offset: page * limit,
        open_now,
        price: price.join(', ') || undefined,
      },
    });

    if (status !== 200) {
      throw new Error('Status: ' + status);
    }

    const { total, businesses: restaurants } = data;

    return { total, restaurants };
  } catch (error) {
    throw new Error(
      'Error while fetching the restaurants: ' +
        (error as unknown as Error).message,
    );
  }
};

export const fetchRestaurantById = async ({
  id,
}: {
  id: string;
}): Promise<{ restaurant: Restaurant }> => {
  try {
    const { status, data } = await yelpApiClient.get(`/businesses/${id}`);

    if (status !== 200) {
      throw new Error('Status: ' + status);
    }

    const restaurant = data;

    return { restaurant };
  } catch (error) {
    throw new Error(
      'Error while fetching the restaurant by id: ' +
        id +
        ' ' +
        (error as unknown as Error).message,
    );
  }
};

export const fetchRestaurantReviews = async ({
  id,
}: {
  id: string;
}): Promise<{ total: number; reviews: Review[] }> => {
  try {
    const { status, data } = await yelpApiClient.get(
      `/businesses/${id}/reviews`,
      { params: { locale: 'en_US' } },
    );

    if (status !== 200) {
      throw new Error('Status: ' + status);
    }

    const { total, reviews } = data;

    return { total, reviews };
  } catch (error) {
    throw new Error(
      'Error while fetching the restaurants reviews: ' +
        (error as unknown as Error).message,
    );
  }
};

export const fetchRestaurantCategories = async ({
  locale = DEFAULT_LOCALE,
  limit = 5,
}: {
  locale?: string;
  limit?: number;
} = {}): Promise<{ total: number; categories: Category[] }> => {
  try {
    const { status, data } = await yelpApiClient.get('/categories', {
      params: {
        locale,
        alias: 'restaurants',
      },
    });

    if (status !== 200) {
      throw new Error('Status: ' + status);
    }

    const categories: Category[] = data.categories.filter(
      (category: Category) => category.parent_aliases.includes('restaurants'),
    );

    return { total: categories.length, categories: categories.slice(0, limit) };
  } catch (error) {
    throw new Error(
      'Error while fetching the categories: ' +
        (error as unknown as Error).message,
    );
  }
};

export default {
  fetchRestaurants,
  fetchRestaurantById,
  fetchRestaurantCategories,
};
