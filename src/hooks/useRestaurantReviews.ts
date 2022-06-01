import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchRestaurantReviews } from '~/services/restaurants';
import type { Review } from '~/types/restaurant';

const useRestaurantReviews = (id: string) => {
  const [totalCount, setTotalCount] = useState<number>(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getRestaurants = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const { reviews, total } = await fetchRestaurantReviews({
        id,
      });

      setReviews((prev) => [...prev, ...reviews]);
      setTotalCount(total);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getRestaurants();
  }, [id]);

  return { reviews, totalCount, loading, error };
};

export default useRestaurantReviews;
