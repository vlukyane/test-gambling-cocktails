import { Link, useLocation } from 'react-router-dom';
import { COCKTAIL_CODES } from '../../constants/cocktails';
import styles from './Navigation.module.scss';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

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
            {COCKTAIL_CODES.map((code) => (
              <li key={code} className={styles.menuItem}>
                <Link
                  to={`/${code}`}
                  className={`${styles.link} ${location.pathname.slice(1) === code ? styles.active : ''}`}
                  onClick={closeMenu}
                >
                  {code.charAt(0).toUpperCase() + code.slice(1)}
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