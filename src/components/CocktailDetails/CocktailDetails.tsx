import { useParams } from 'react-router-dom';
import { CocktailCode } from '../../types/cocktail';
import styles from './CocktailDetails.module.scss';

const CocktailDetails = () => {
  const { code } = useParams<{ code: CocktailCode }>();
  const title = code ? code.charAt(0).toUpperCase() + code.slice(1) : 'Cocktail';

  return (
    <div className={styles.details}>
      <h1>{title}</h1>
      <p>Details for {code || 'selected'} cocktail will be displayed here</p>
    </div>
  );
};

export default CocktailDetails; 