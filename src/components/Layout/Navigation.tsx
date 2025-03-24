import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CocktailCode } from '../../types/cocktail';
import styles from './Navigation.module.scss';

const menuItems: CocktailCode[] = ['margarita', 'mojito', 'a1', 'kir'];

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname.slice(1) || menuItems[0];

  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <ul className={styles.menu}>
          {menuItems.map((item) => (
            <li key={item} className={styles.menuItem}>
              <Link
                to={`/${item}`}
                className={`${styles.link} ${currentPath === item ? styles.active : ''}`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 