import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CocktailCode } from '../../types/cocktail.ts';
import { useCocktailStore } from '../../store/cocktailStore.ts';
import CocktailCard from '../../components/CocktailCard/CocktailCard.tsx';
import styles from './CocktailList.module.scss';

const menuItems: CocktailCode[] = ['margarita', 'mojito', 'a1', 'kir'];

const CocktailList = () => {
  const { cocktailCode } = useParams<{ cocktailCode: string }>();
  const { cocktails, loading, error, fetchCocktails } = useCocktailStore();

  useEffect(() => {
    if (cocktailCode && menuItems.includes(cocktailCode as CocktailCode)) {
      fetchCocktails(cocktailCode as CocktailCode);
    }
  }, [cocktailCode, fetchCocktails]);

  if (!cocktailCode) {
    return <Navigate to={`/${menuItems[0]}`} replace />;
  }

  if (!menuItems.includes(cocktailCode as CocktailCode)) {
    return <Navigate to="/404" replace />;
  }

  if (loading) {
    return <div className={styles.message}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.message}>{error}</div>;
  }

  const cocktailList = cocktails[cocktailCode as CocktailCode];

  if (!cocktailList?.length) {
    return <div className={styles.message}>No cocktails found</div>;
  }

  return (
    <div className={styles.container}>
      {cocktailList.map((cocktail) => (
        <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
      ))}
    </div>
  );
};

export default CocktailList;
