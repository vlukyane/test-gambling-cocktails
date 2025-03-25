import { useNavigate } from 'react-router-dom';
import { CocktailCode } from '../../types/cocktail';
import styles from './CocktailList.module.scss';

const menuItems: CocktailCode[] = ['margarita', 'mojito', 'a1', 'kir'];

const CocktailList = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.list}>
      {menuItems.map((item) => (
        <div
          key={item}
          className={styles.item}
          onClick={() => navigate(`/${item}`)}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </div>
      ))}
    </div>
  );
};

export default CocktailList; 