// components/Navbar.js
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faStar, faList, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
          <img class="h-12 w-12" src="\icon.jpg" alt="Logo" className={styles.logo} />
      </Link>
      <div className={styles.navButtons}>
        <Link href="/about">
          <FontAwesomeIcon icon={faInfoCircle} /> About Us
        </Link>
        <Link href="/contact">
          <FontAwesomeIcon icon={faEnvelope} /> Contact Us
        </Link>
        <Link href="/login">
          <FontAwesomeIcon icon={faSignInAlt} /> Login
        </Link>
        <Link href="/signup">
          <FontAwesomeIcon icon={faUserPlus} /> Sign Up
        </Link>
        <Link href="/favorites">
          <FontAwesomeIcon icon={faStar} /> Favorites
        </Link>
        <Link href="/watchlist">
          <FontAwesomeIcon icon={faList} /> Watchlist
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
