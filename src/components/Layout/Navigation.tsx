import { Link, useLocation } from 'react-router-dom';
import { CocktailCode } from '../../types/cocktail';
import styles from './Navigation.module.scss';
import { useState, useEffect } from 'react';

const menuItems: CocktailCode[] = ['margarita', 'mojito', 'a1', 'kir'];

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname.slice(1) || menuItems[0];
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    closeMenu();
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 500) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className={styles.header}>
        {!isOpen &&<button 
          className={`${styles.headerBurger} ${isOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>}
      </header>
      
      <div 
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
        onClick={closeMenu}
      />
      
      <nav className={`${styles.navigation} ${isOpen ? styles.open : ''}`}>
        <div className={styles.container}>
          <ul className={styles.menu}>
            {menuItems.map((item) => (
              <li key={item} className={styles.menuItem}>
                <Link
                  to={`/${item}`}
                  className={`${styles.link} ${currentPath === item ? styles.active : ''}`}
                  onClick={closeMenu}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigation; 