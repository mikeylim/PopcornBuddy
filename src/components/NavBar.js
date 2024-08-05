// components/Navbar.js
import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faStar, faList, faInfoCircle, faEnvelope, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // You'll need to implement actual auth state management

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left section - Logo */}
        <div className="flex-1">
          <Link href="/">
            <Image src="/icon.jpg" alt="PopcornBuddy Logo" width={50} height={50}/>
          </Link>
        </div>

        {/* Center section - Trending and Genre */}
        <div className="flex-1 flex justify-center space-x-4">
          <Link href="/trending">
            <span className="text-white hover:text-gray-300">Trending</span>
          </Link>
          <Link href="/genre">
            <span className="text-white hover:text-gray-300">Genre</span>
          </Link>
        </div>

        {/* Right section - Auth and Info links */}
        <div className="flex-1 flex justify-end space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/favorites">
                <span className="text-white hover:text-gray-300"><FontAwesomeIcon icon={faStar} /></span>
              </Link>
              <Link href="/watchlist">
                <span className="text-white hover:text-gray-300"><FontAwesomeIcon icon={faList} /></span>
              </Link>
              <Link href="/logout">
                <span className="text-white hover:text-gray-300"><FontAwesomeIcon icon={faSignOutAlt} /></span>
              </Link>
            </>
          ) : (
            <>
              <Link href="/signup">
                <span className="text-white hover:text-gray-300"><FontAwesomeIcon icon={faUserPlus} /></span>
              </Link>
              <Link href="/login">
                <span className="text-white hover:text-gray-300"><FontAwesomeIcon icon={faSignInAlt} /></span>
              </Link>
            </>
          )}
          <Link href="/contact">
            <span className="text-white hover:text-gray-300"><FontAwesomeIcon icon={faEnvelope} /></span>
          </Link>
          <Link href="/about">
            <span className="text-white hover:text-gray-300"><FontAwesomeIcon icon={faInfoCircle} /></span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;