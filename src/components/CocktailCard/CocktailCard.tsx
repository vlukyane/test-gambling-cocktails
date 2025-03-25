import { Suspense } from 'react';
import { Cocktail } from '../../types/cocktail';
import LazyImage from '../LazyImage/LazyImage';
import styles from './CocktailCard.module.scss';

interface CocktailCardProps {
  cocktail: Cocktail;
}

const CocktailCard = ({ cocktail }: CocktailCardProps) => {
  const ingredients = Object.entries(cocktail)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([key, value]) => {
      const measureKey = key.replace('Ingredient', 'Measure');
      const measure = cocktail[measureKey];
      return { ingredient: value, measure };
    });

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.info}>
          <h2 className={styles.title}>{cocktail.strDrink}</h2>
          <div className={styles.details}>
            <p className={styles.category}>{cocktail.strCategory}</p>
            <p className={styles.type}>{cocktail.strAlcoholic}</p>
            <p className={styles.glass}>{cocktail.strGlass}</p>
          </div>
          <div className={styles.ingredients}>
            <h3 className={styles.ingredientsTitle}>Ingredients</h3>
            <ul className={styles.ingredientsList}>
              {ingredients.map(({ ingredient, measure }, index) => (
                <li key={index} className={styles.ingredientItem}>
                  {measure && `${measure} `}
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.instructions}>
            <h3 className={styles.instructionsTitle}>Instructions</h3>
            <p>{cocktail.strInstructions}</p>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Suspense>
            <LazyImage
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
              className={styles.image}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default CocktailCard; 