import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CocktailCode, Cocktail } from '../types/cocktail';
import { useCocktailStore } from '../store/cocktailStore';
import { COCKTAIL_CODES, DEFAULT_COCKTAIL } from '../constants/cocktails';

type UseCocktailsReturn = 
  | { redirect: JSX.Element }
  | { loading: true }
  | { error: string }
  | { cocktailList: Cocktail[] };

export const useCocktails = (): UseCocktailsReturn => {
  const { cocktailCode } = useParams<{ cocktailCode: string }>();
  const { cocktails, loading, error, fetchCocktails } = useCocktailStore();

  useEffect(() => {
    if (cocktailCode && COCKTAIL_CODES.includes(cocktailCode as CocktailCode)) {
      fetchCocktails(cocktailCode as CocktailCode);
    }
  }, [cocktailCode, fetchCocktails]);

  if (!cocktailCode) {
    return { redirect: <Navigate to={`/${DEFAULT_COCKTAIL}`} replace /> };
  }

  if (!COCKTAIL_CODES.includes(cocktailCode as CocktailCode)) {
    return { redirect: <Navigate to="/404" replace /> };
  }

  if (loading) {
    return { loading: true };
  }

  if (error) {
    return { error };
  }

  const cocktailList = cocktails[cocktailCode as CocktailCode];

  if (!cocktailList?.length) {
    return { error: 'No cocktails found' };
  }

  return { cocktailList };
}; 