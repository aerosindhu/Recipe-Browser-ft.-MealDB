import { useCallback, useEffect, useState } from 'react';
import { fetchCategories, filterByCategory, searchRecipesByName } from '../services/api.js';
import { useDebounce } from './useDebounce.js';

export function useRecipes(query, category) {
  const debouncedQuery = useDebounce(query, 450);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchCategories()
      .then((cats) => {
        if (!cancelled) setCategories(cats);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const load = async () => {
      try {
        let data = [];
        if (debouncedQuery && debouncedQuery.trim().length > 0) {
          data = await searchRecipesByName(debouncedQuery);
          if (category && category !== 'All') {
            data = data.filter((m) => m.strCategory === category);
          }
        } else if (category && category !== 'All') {
          data = await filterByCategory(category);
        } else {
          data = await searchRecipesByName('');
        }
        if (!cancelled) setRecipes(data);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, category, reloadKey]);

  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  return { recipes, categories, loading, error, refetch };
}
