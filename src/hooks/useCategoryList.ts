import { useCallback, useState, useEffect } from 'react';

import { fetchRestaurantCategories } from '~/services/restaurants';
import type { Category } from '~/types/restaurant';

const useCategoryList = () => {
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setCategories([]);
    setError(null);
    setLoading(false);
    setTotal(0);
  }, []);

  const getCategories = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const { categories: data, total } = await fetchRestaurantCategories({
        limit: 20,
      });

      setCategories(data);
      setTotal(0);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  return { categories, loading, error, total };
};

export default useCategoryList;
