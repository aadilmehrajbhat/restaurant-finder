import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchRestaurantById } from '~/services/restaurants';
import type { Restaurant } from '~/types/restaurant';

const useRestaurantDetail = (id: string) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getRestaurant = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await fetchRestaurantById({ id });

      setRestaurant(data.restaurant);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getRestaurant();
  }, [id]);

  return { restaurant, loading, error };
};

export default useRestaurantDetail;
