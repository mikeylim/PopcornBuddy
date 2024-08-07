// components/NavBar.js
import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserPlus,
  faStar,
  faList,
  faInfoCircle,
  faEnvelope,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setShowLogoutConfirm(false);
    }
  }, [isLoggedIn]);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left section - Logo */}
        <div className="flex-1">
          <Link href="/" passHref>
            <div className="cursor-pointer flex items-center">
              <Image className="inline" src="/icon.jpg" alt="PopcornBuddy Logo" width={50} height={50} />
              <h1 className="inline text-white text-xl">PopcornBuddy</h1>
            </div>
          </Link>
        </div>

        {/* Center section - Trending and Genre */}
        <div className="flex-1 flex justify-center space-x-4">
          <Link href="/trending" passHref>
            <span className="text-white hover:text-gray-300 cursor-pointer">Trending</span>
          </Link>
          <Link href="/genre" passHref>
            <span className="text-white hover:text-gray-300 cursor-pointer">Genre</span>
          </Link>
        </div>

        {/* Right section - Auth and Info links */}
        <div className="flex-1 flex justify-end space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/favorites" passHref>
                <span className="text-white hover:text-gray-300 cursor-pointer">
                  <FontAwesomeIcon icon={faStar} />
                </span>
              </Link>
              <Link href="/watchlist" passHref>
                <span className="text-white hover:text-gray-300 cursor-pointer">
                  <FontAwesomeIcon icon={faList} />
                </span>
              </Link>
              <span
                onClick={() => setShowLogoutConfirm(true)}
                className="text-white hover:text-gray-300 cursor-pointer"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
              </span>
              {showLogoutConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded shadow-lg">
                    <p>Are you sure you want to log out?</p>
                    <div className="mt-4 flex justify-center space-x-2">
                      <button
                        onClick={() => setShowLogoutConfirm(false)}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <Link href="/signup" passHref>
                <span className="text-white hover:text-gray-300 cursor-pointer">
                  <FontAwesomeIcon icon={faUserPlus} />
                </span>
              </Link>
              <Link href="/login" passHref>
                <span className="text-white hover:text-gray-300 cursor-pointer">
                  <FontAwesomeIcon icon={faSignInAlt} />
                </span>
              </Link>
            </>
          )}
          <Link href="/contact" passHref>
            <span className="text-white hover:text-gray-300 cursor-pointer">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </Link>
          <Link href="/about" passHref>
            <span className="text-white hover:text-gray-300 cursor-pointer">
              <FontAwesomeIcon icon={faInfoCircle} />
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;



// // components/NavBar.js
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
// 	faSignInAlt,
// 	faUserPlus,
// 	faStar,
// 	faList,
// 	faInfoCircle,
// 	faEnvelope,
// 	faSignOutAlt,
// } from "@fortawesome/free-solid-svg-icons";
// import Image from "next/image";
// import { useAuth } from "../context/AuthContext";

// const NavBar = () => {
// 	const { isLoggedIn, logout } = useAuth();
// 	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

// 	const handleLogout = () => {
// 		logout();
// 		setShowLogoutConfirm(false);
// 	};

// 	useEffect(() => {
// 		if (!isLoggedIn) {
// 			setShowLogoutConfirm(false);
// 		}
// 	}, [isLoggedIn]);

// 	return (
// 		<nav className="bg-gray-800 p-4">
// 			<div className="container mx-auto flex justify-between items-center">
// 				{/* Left section - Logo */}
// 				<div className="flex-1">
// 					<Link href="/" passHref>
// 						<div className="cursor-pointer flex items-center">
// 							<Image
// 								className="inline"
// 								src="/icon.jpg"
// 								alt="PopcornBuddy Logo"
// 								width={50}
// 								height={50}
// 							/>
// 							<h1 className="inline text-white text-xl">PopcornBuddy</h1>
// 						</div>
// 					</Link>
// 				</div>

// 				{/* Center section - Trending and Genre */}
// 				<div className="flex-1 flex justify-center space-x-4">
// 					<Link href="/trending" passHref>
// 						<span className="text-white hover:text-gray-300 cursor-pointer">
// 							Trending
// 						</span>
// 					</Link>
// 					<Link href="/genre" passHref>
// 						<span className="text-white hover:text-gray-300 cursor-pointer">Genre</span>
// 					</Link>
// 				</div>

// 				{/* Right section - Auth and Info links */}
// 				<div className="flex-1 flex justify-end space-x-4">
// 					{isLoggedIn ? (
// 						<>
// 							<Link href="/favorites" passHref>
// 								<span className="text-white hover:text-gray-300 cursor-pointer">
// 									<FontAwesomeIcon icon={faStar} />
// 								</span>
// 							</Link>
// 							<Link href="/watchlist" passHref>
// 								<span className="text-white hover:text-gray-300 cursor-pointer">
// 									<FontAwesomeIcon icon={faList} />
// 								</span>
// 							</Link>
// 							<span
// 								onClick={() => setShowLogoutConfirm(true)}
// 								className="text-white hover:text-gray-300 cursor-pointer">
// 								<FontAwesomeIcon icon={faSignOutAlt} />
// 							</span>
// 							{showLogoutConfirm && (
// 								<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
// 									<div className="bg-white p-6 rounded shadow-lg">
// 										<p>Are you sure you want to log out?</p>
// 										<div className="mt-4 flex justify-center space-x-2">
// 											<button
// 												onClick={() => setShowLogoutConfirm(false)}
// 												className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
// 												Cancel
// 											</button>
// 											<button
// 												onClick={handleLogout}
// 												className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
// 												Log Out
// 											</button>
// 										</div>
// 									</div>
// 								</div>
// 							)}
// 						</>
// 					) : (
// 						<>
// 							<Link href="/signup" passHref>
// 								<span className="text-white hover:text-gray-300 cursor-pointer">
// 									<FontAwesomeIcon icon={faUserPlus} />
// 								</span>
// 							</Link>
// 							<Link href="/login" passHref>
// 								<span className="text-white hover:text-gray-300 cursor-pointer">
// 									<FontAwesomeIcon icon={faSignInAlt} />
// 								</span>
// 							</Link>
// 						</>
// 					)}
// 					<Link href="/contact" passHref>
// 						<span className="text-white hover:text-gray-300 cursor-pointer">
// 							<FontAwesomeIcon icon={faEnvelope} />
// 						</span>
// 					</Link>
// 					<Link href="/about" passHref>
// 						<span className="text-white hover:text-gray-300 cursor-pointer">
// 							<FontAwesomeIcon icon={faInfoCircle} />
// 						</span>
// 					</Link>
// 				</div>
// 			</div>
// 		</nav>
// 	);
// };

// export default NavBar;
