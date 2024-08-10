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

// 	// Handle Escape key to cancel the modal
// 	useEffect(() => {
// 		const handleKeyDown = (event) => {
// 			if (event.key === "Escape") {
// 				setShowLogoutConfirm(false);
// 			}
// 		};

// 		if (showLogoutConfirm) {
// 			document.addEventListener("keydown", handleKeyDown);
// 		} else {
// 			document.removeEventListener("keydown", handleKeyDown);
// 		}

// 		// Cleanup the event listener on component unmount or when modal closes
// 		return () => {
// 			document.removeEventListener("keydown", handleKeyDown);
// 		};
// 	}, [showLogoutConfirm]);

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
// 												className="submit px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
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





// NOT WORKING

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faSignInAlt,
//   faUserPlus,
//   faStar,
//   faList,
//   faInfoCircle,
//   faEnvelope,
//   faSignOutAlt,
// } from "@fortawesome/free-solid-svg-icons";
// import Image from "next/image";
// import { useAuth } from "../context/AuthContext";

// const NavBar = () => {
//   const { isLoggedIn, logout } = useAuth();
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredMovies, setFilteredMovies] = useState([]);
  
//   const handleLogout = () => {
//     logout();
//     setShowLogoutConfirm(false);
//   };

//   // Handle Escape key to cancel the modal
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Escape") {
//         setShowLogoutConfirm(false);
//       }
//     };

//     if (showLogoutConfirm) {
//       document.addEventListener("keydown", handleKeyDown);
//     } else {
//       document.removeEventListener("keydown", handleKeyDown);
//     }

//     // Cleanup the event listener on component unmount or when modal closes
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [showLogoutConfirm]);

//   useEffect(() => {
//     if (!isLoggedIn) {
//       setShowLogoutConfirm(false);
//     }
//   }, [isLoggedIn]);

//   const handleSearchChange = async (e) => {
//     setSearchTerm(e.target.value);
//     if (e.target.value.length > 0) {
//       setShowDropdown(true);

//       try {
//         const res = await fetch(
//           `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${e.target.value}`
//         );
//         const data = await res.json();
//         setFilteredMovies(data.results.slice(0, 6));
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     } else {
//       setShowDropdown(false);
//       setFilteredMovies([]);
//     }
//   };

//   const handleClickOutside = (event) => {
//     if (!event.target.closest(".searchbar-container")) {
//       setShowDropdown(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <nav className="bg-gray-800 p-4">
//       <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
//         {/* Left section - Logo */}
//         <div className="flex-1">
//           <Link href="/" passHref legacyBehavior>
//             <div className="cursor-pointer flex items-center">
//               <Image
//                 className="inline"
//                 src="/icon.jpg"
//                 alt="PopcornBuddy Logo"
//                 width={50}
//                 height={50}
//               />
//               <h1 className="inline text-white text-xl">PopcornBuddy</h1>
//             </div>
//           </Link>
//         </div>

//         {/* Center section - Trending, Genre, and Searchbar */}
//         <div className="flex-1 flex justify-center items-center space-x-4">
//           <Link href="/trending" passHref legacyBehavior>
//             <span className="text-white hover:text-gray-300 cursor-pointer">
//               Trending
//             </span>
//           </Link>
//           <Link href="/genre" passHref legacyBehavior>
//             <span className="text-white hover:text-gray-300 cursor-pointer">Genre</span>
//           </Link>
//           <div className="relative searchbar-container">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               placeholder="Search for movies..."
//               className="p-2 w-full md:w-64 border border-gray-400 rounded text-black"
//             />
//             {showDropdown && (
//               <div className="absolute w-full md:w-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-96 overflow-auto mt-1 z-10">
//                 {filteredMovies.map((movie) => (
//                   <div
//                     key={movie.id}
//                     className="cursor-pointer flex items-center space-x-3 p-2 hover:bg-gray-200"
//                   >
//                     <Image
//                       src={
//                         movie.poster_path
//                           ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
//                           : "/placeholder.jpg"
//                       }
//                       alt={movie.title}
//                       width={50}
//                       height={75}
//                       className="rounded"
//                     />
//                     <div>
//                       <h2 className="text-sm font-medium">{movie.title}</h2>
//                       <p className="text-xs text-gray-500">
//                         {new Date(movie.release_date).getFullYear()} •{" "}
//                         {movie.genre_ids.slice(0, 3).join(", ")}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right section - Auth and Info links */}
//         <div className="flex-1 flex justify-end space-x-4">
//           {isLoggedIn ? (
//             <>
//               <Link href="/favorites" passHref legacyBehavior>
//                 <span className="text-white hover:text-gray-300 cursor-pointer">
//                   <FontAwesomeIcon icon={faStar} />
//                 </span>
//               </Link>
//               <Link href="/watchlist" passHref legacyBehavior>
//                 <span className="text-white hover:text-gray-300 cursor-pointer">
//                   <FontAwesomeIcon icon={faList} />
//                 </span>
//               </Link>
//               <span
//                 onClick={() => setShowLogoutConfirm(true)}
//                 className="text-white hover:text-gray-300 cursor-pointer">
//                 <FontAwesomeIcon icon={faSignOutAlt} />
//               </span>
//               {showLogoutConfirm && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                   <div className="bg-white p-6 rounded shadow-lg">
//                     <p>Are you sure you want to log out?</p>
//                     <div className="mt-4 flex justify-center space-x-2">
//                       <button
//                         onClick={() => setShowLogoutConfirm(false)}
//                         className="submit px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
//                         Cancel
//                       </button>
//                       <button
//                         onClick={handleLogout}
//                         className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
//                         Log Out
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           ) : (
//             <>
//               <Link href="/signup" passHref legacyBehavior>
//                 <span className="text-white hover:text-gray-300 cursor-pointer">
//                   <FontAwesomeIcon icon={faUserPlus} />
//                 </span>
//               </Link>
//               <Link href="/login" passHref legacyBehavior>
//                 <span className="text-white hover:text-gray-300 cursor-pointer">
//                   <FontAwesomeIcon icon={faSignInAlt} />
//                 </span>
//               </Link>
//             </>
//           )}
//           <Link href="/contact" passHref legacyBehavior>
//             <span className="text-white hover:text-gray-300 cursor-pointer">
//               <FontAwesomeIcon icon={faEnvelope} />
//             </span>
//           </Link>
//           <Link href="/about" passHref legacyBehavior>
//             <span className="text-white hover:text-gray-300 cursor-pointer">
//               <FontAwesomeIcon icon={faInfoCircle} />
//             </span>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;




// WORKING
// // components/NavBar.js
// import { useState, useEffect, useRef } from "react";
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
// import axios from "axios";

// const NavBar = () => {
// 	const { isLoggedIn, logout } = useAuth();
// 	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
// 	const [searchTerm, setSearchTerm] = useState("");
// 	const [searchResults, setSearchResults] = useState([]);
// 	const [genres, setGenres] = useState([]);
// 	const dropdownRef = useRef(null);

// 	useEffect(() => {
// 		// Fetch genres on component mount
// 		const fetchGenres = async () => {
// 			try {
// 				const response = await axios.get(
// 					`https://api.themoviedb.org/3/genre/movie/list?api_key=0609ebbe13f887b723d066bb5937d1db&language=en-US`
// 				);
// 				setGenres(response.data.genres);
// 			} catch (error) {
// 				console.error("Error fetching genres:", error);
// 			}
// 		};

// 		fetchGenres();
// 	}, []);

// 	const handleLogout = () => {
// 		logout();
// 		setShowLogoutConfirm(false);
// 	};

// 	useEffect(() => {
// 		const handleKeyDown = (event) => {
// 			if (event.key === "Escape") {
// 				setShowLogoutConfirm(false);
// 			}
// 		};

// 		if (showLogoutConfirm) {
// 			document.addEventListener("keydown", handleKeyDown);
// 		} else {
// 			document.removeEventListener("keydown", handleKeyDown);
// 		}

// 		return () => {
// 			document.removeEventListener("keydown", handleKeyDown);
// 		};
// 	}, [showLogoutConfirm]);

// 	useEffect(() => {
// 		if (!isLoggedIn) {
// 			setShowLogoutConfirm(false);
// 		}
// 	}, [isLoggedIn]);

// 	useEffect(() => {
// 		const handleClickOutside = (event) => {
// 			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// 				setSearchResults([]);
// 			}
// 		};
// 		document.addEventListener("mousedown", handleClickOutside);
// 		return () => {
// 			document.removeEventListener("mousedown", handleClickOutside);
// 		};
// 	}, []);

// 	const handleSearchChange = async (e) => {
// 		const searchTerm = e.target.value;
// 		setSearchTerm(searchTerm);

// 		if (searchTerm.length > 2) {
// 			try {
// 				const response = await axios.get(
// 					`https://api.themoviedb.org/3/search/movie?api_key=0609ebbe13f887b723d066bb5937d1db&query=${searchTerm}`
// 				);
// 				setSearchResults(response.data.results.slice(0, 6));
// 			} catch (error) {
// 				console.error("Error fetching search results:", error);
// 			}
// 		} else {
// 			setSearchResults([]);
// 		}
// 	};

// 	// Function to get genre names based on genre IDs
// 	const getGenreNames = (genreIds) => {
// 		const genreNames = genreIds
// 			.map((id) => genres.find((genre) => genre.id === id)?.name)
// 			.filter(Boolean);
// 		return genreNames.slice(0, 3).join(", ");
// 	};

// 	return (
//         <nav className="bg-gray-800 p-4 md:flex md:justify-between md:items-center">
// 			<div className="container mx-auto flex justify-between items-center">
// 				{/* Left section - Logo and Links */}
// 				<div className="flex items-center space-x-14">
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
// 					<div className="flex items-center space-x-4">
// 						<Link href="/trending" passHref>
// 							<span className="text-white hover:text-gray-300 cursor-pointer">
// 								Trending
// 							</span>
// 						</Link>
// 						<Link href="/genre" passHref>
// 							<span className="text-white hover:text-gray-300 cursor-pointer">
// 								Genre
// 							</span>
// 						</Link>
// 					</div>
// 				</div>

// 				{/* Center section - Search Bar */}
// 				<div className="relative flex-1 mx-14">
// 					<input
// 						type="text"
// 						value={searchTerm}
// 						onChange={handleSearchChange}
// 						className="w-full px-4 py-2 rounded-lg"
// 						placeholder="Search for movies..."
// 						style={{ width: "350px" }}
// 					/>
// 					{searchResults.length > 0 && (
// 						<ul
// 							ref={dropdownRef}
// 							className="absolute z-10 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto mt-1">
// 							{searchResults.map((movie) => (
// 								<li
// 									key={movie.id}
// 									className="flex items-center p-2 border-b border-gray-200 hover:bg-gray-100">
// 									<Image
// 										src={
// 											movie.poster_path
// 												? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
// 												: "/no-poster.jpg"
// 										}
// 										alt={movie.title}
// 										width={50}
// 										height={75}
// 										className="rounded"
// 									/>
// 									<div className="ml-2">
// 										<h2 className="text-sm font-semibold">{movie.title}</h2>
// 										<p className="text-xs text-gray-600">
// 											{new Date(movie.release_date).getFullYear()}
// 										</p>
// 										<p className="text-xs text-gray-600">
// 											{getGenreNames(movie.genre_ids)}
// 										</p>
// 									</div>
// 								</li>
// 							))}
// 						</ul>
// 					)}
// 				</div>

// 				{/* Right section - Auth and Info links */}
// 				<div className="flex items-center space-x-4">
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
// 												className="submit px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
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



// Working BEST

// // components/NavBar.js
// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faSignInAlt,
//   faUserPlus,
//   faStar,
//   faList,
//   faInfoCircle,
//   faEnvelope,
//   faSignOutAlt,
// } from "@fortawesome/free-solid-svg-icons";
// import Image from "next/image";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";

// const NavBar = () => {
//   const { isLoggedIn, logout } = useAuth();
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [genres, setGenres] = useState([]);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     // Fetch genres on component mount
//     const fetchGenres = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/genre/movie/list?api_key=0609ebbe13f887b723d066bb5937d1db&language=en-US`
//         );
//         setGenres(response.data.genres);
//       } catch (error) {
//         console.error("Error fetching genres:", error);
//       }
//     };

//     fetchGenres();
//   }, []);

//   const handleLogout = () => {
//     logout();
//     setShowLogoutConfirm(false);
//   };

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Escape") {
//         setShowLogoutConfirm(false);
//       }
//     };

//     if (showLogoutConfirm) {
//       document.addEventListener("keydown", handleKeyDown);
//     } else {
//       document.removeEventListener("keydown", handleKeyDown);
//     }

//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [showLogoutConfirm]);

//   useEffect(() => {
//     if (!isLoggedIn) {
//       setShowLogoutConfirm(false);
//     }
//   }, [isLoggedIn]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setSearchResults([]);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleSearchChange = async (e) => {
//     const searchTerm = e.target.value;
//     setSearchTerm(searchTerm);

//     if (searchTerm.length > 2) {
//       try {
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/search/movie?api_key=0609ebbe13f887b723d066bb5937d1db&query=${searchTerm}`
//         );
//         setSearchResults(response.data.results.slice(0, 6));
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//       }
//     } else {
//       setSearchResults([]);
//     }
//   };

//   // Function to get genre names based on genre IDs
//   const getGenreNames = (genreIds) => {
//     const genreNames = genreIds
//       .map((id) => genres.find((genre) => genre.id === id)?.name)
//       .filter(Boolean);
//     return genreNames.slice(0, 3).join(", ");
//   };

//   return (
//     <nav className="bg-gray-800 p-4 md:flex md:justify-between md:items-center">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Left section - Logo and Links */}
//         <div className="flex items-center space-x-14">
//           <Link href="/" passHref>
//             <div className="cursor-pointer flex items-center">
//               <Image
//                 className="inline"
//                 src="/icon.jpg"
//                 alt="PopcornBuddy Logo"
//                 width={50}
//                 height={50}
//               />
//               <h1 className="inline text-white text-xl">PopcornBuddy</h1>
//             </div>
//           </Link>
//           <div className="flex items-center space-x-4">
//             <Link href="/trending" passHref>
//               <span className="text-white hover:text-gray-300 cursor-pointer">
//                 Trending
//               </span>
//             </Link>
//             <Link href="/genre" passHref>
//               <span className="text-white hover:text-gray-300 cursor-pointer">
//                 Genre
//               </span>
//             </Link>
//           </div>
//         </div>

//         {/* Center section - Search Bar */}
//         <div className="relative flex-1 mx-14">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             className="w-full px-4 py-2 rounded-lg"
//             placeholder="Search for movies..."
//             style={{ width: "350px" }}
//           />
//           {searchResults.length > 0 && (
//             <ul
//               ref={dropdownRef}
//               className="absolute z-10 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto mt-1">
//               {searchResults.map((movie) => (
//                 <li
//                   key={movie.id}
//                   className="flex items-center p-2 border-b border-gray-200 hover:bg-gray-100">
//                   <Image
//                     src={
//                       movie.poster_path
//                         ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
//                         : "/no-poster.jpg"
//                     }
//                     alt={movie.title}
//                     width={50}
//                     height={75}
//                     className="rounded"
//                   />
//                   <div className="ml-2">
//                     <h2 className="text-sm font-semibold">{movie.title}</h2>
//                     <p className="text-xs text-gray-600">
//                       {movie.release_date
//                         ? new Date(movie.release_date).getFullYear()
//                         : "N/A"}
//                     </p>
//                     <p className="text-xs text-gray-600">
//                       {movie.genre_ids.length > 0
//                         ? getGenreNames(movie.genre_ids)
//                         : "N/A"}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Right section - Auth and Info links */}
//         <div className="flex items-center space-x-4">
//           {isLoggedIn ? (
//             <>
//               <Link href="/favorites" passHref>
//                 <span className="text-white hover:text-gray-300 cursor-pointer">
//                   <FontAwesomeIcon icon={faStar} />
//                 </span>
//               </Link>
//               <Link href="/watchlist" passHref>
//                 <span className="text-white hover:text-gray-300 cursor-pointer">
//                   <FontAwesomeIcon icon={faList} />
//                 </span>
//               </Link>
//               <span
//                 onClick={() => setShowLogoutConfirm(true)}
//                 className="text-white hover:text-gray-300 cursor-pointer">
//                 <FontAwesomeIcon icon={faSignOutAlt} />
//               </span>
//               {showLogoutConfirm && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                   <div className="bg-white p-6 rounded shadow-lg">
//                     <p>Are you sure you want to log out?</p>
//                     <div className="mt-4 flex justify-center space-x-2">
//                       <button
//                         onClick={() => setShowLogoutConfirm(false)}
//                         className="submit px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
//                         Cancel
//                       </button>
//                       <button
//                         onClick={handleLogout}
//                         className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
//                         Log Out
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           ) : (
//             <>
//               <Link href="/signup" passHref>
//                 <span className="text-white hover:text-gray-300 cursor-pointer">
//                   <FontAwesomeIcon icon={faUserPlus} />
//                 </span>
//               </Link>
//               <Link href="/login" passHref>
//                 <span className="text-white hover:text-gray-300 cursor-pointer">
//                   <FontAwesomeIcon icon={faSignInAlt} />
//                 </span>
//               </Link>
//             </>
//           )}
//           <Link href="/contact" passHref>
//             <span className="text-white hover:text-gray-300 cursor-pointer">
//               <FontAwesomeIcon icon={faEnvelope} />
//             </span>
//           </Link>
//           <Link href="/about" passHref>
//             <span className="text-white hover:text-gray-300 cursor-pointer">
//               <FontAwesomeIcon icon={faInfoCircle} />
//             </span>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;


// // Version 3

// // components/NavBar.js
// import { useState, useEffect, useRef } from "react";
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
// import axios from "axios";

// const NavBar = () => {
// 	const { isLoggedIn, logout } = useAuth();
// 	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
// 	const [searchTerm, setSearchTerm] = useState("");
// 	const [searchResults, setSearchResults] = useState([]);
// 	const [genres, setGenres] = useState([]);
// 	const dropdownRef = useRef(null);

// 	useEffect(() => {
// 		// Fetch genres on component mount
// 		const fetchGenres = async () => {
// 			try {
// 				const response = await axios.get(
// 					`https://api.themoviedb.org/3/genre/movie/list?api_key=0609ebbe13f887b723d066bb5937d1db&language=en-US`
// 				);
// 				setGenres(response.data.genres);
// 			} catch (error) {
// 				console.error("Error fetching genres:", error);
// 			}
// 		};

// 		fetchGenres();
// 	}, []);

// 	const handleLogout = () => {
// 		logout();
// 		setShowLogoutConfirm(false);
// 	};

// 	useEffect(() => {
// 		const handleKeyDown = (event) => {
// 			if (event.key === "Escape") {
// 				setShowLogoutConfirm(false);
// 			}
// 		};

// 		if (showLogoutConfirm) {
// 			document.addEventListener("keydown", handleKeyDown);
// 		} else {
// 			document.removeEventListener("keydown", handleKeyDown);
// 		}

// 		return () => {
// 			document.removeEventListener("keydown", handleKeyDown);
// 		};
// 	}, [showLogoutConfirm]);

// 	useEffect(() => {
// 		if (!isLoggedIn) {
// 			setShowLogoutConfirm(false);
// 		}
// 	}, [isLoggedIn]);

// 	useEffect(() => {
// 		const handleClickOutside = (event) => {
// 			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// 				setSearchResults([]);
// 			}
// 		};
// 		document.addEventListener("mousedown", handleClickOutside);
// 		return () => {
// 			document.removeEventListener("mousedown", handleClickOutside);
// 		};
// 	}, []);

// 	const handleSearchChange = async (e) => {
// 		const searchTerm = e.target.value;
// 		setSearchTerm(searchTerm);

// 		if (searchTerm.length > 2) {
// 			try {
// 				const response = await axios.get(
// 					`https://api.themoviedb.org/3/search/movie?api_key=0609ebbe13f887b723d066bb5937d1db&query=${searchTerm}`
// 				);
// 				setSearchResults(response.data.results.slice(0, 6));
// 			} catch (error) {
// 				console.error("Error fetching search results:", error);
// 			}
// 		} else {
// 			setSearchResults([]);
// 		}
// 	};

// 	// Function to get genre names based on genre IDs
// 	const getGenreNames = (genreIds) => {
// 		const genreNames = genreIds
// 			.map((id) => genres.find((genre) => genre.id === id)?.name)
// 			.filter(Boolean);
// 		return genreNames.slice(0, 3).join(", ");
// 	};

// 	return (
// 		<nav className="bg-gray-800 p-4 flex flex-wrap items-center justify-between md:flex-nowrap">
// 			<div className="flex items-center space-x-6">
// 				<Link href="/" passHref>
// 					<div className="cursor-pointer flex items-center">
// 						<Image
// 							className="inline"
// 							src="/icon.jpg"
// 							alt="PopcornBuddy Logo"
// 							width={50}
// 							height={50}
// 						/>
// 						<h1 className="inline text-white text-xl ml-2">PopcornBuddy</h1>
// 					</div>
// 				</Link>
// 				<div className="hidden md:flex items-center space-x-4">
// 					<Link href="/trending" passHref>
// 						<span className="text-white hover:text-gray-300 cursor-pointer">
// 							Trending
// 						</span>
// 					</Link>
// 					<Link href="/genre" passHref>
// 						<span className="text-white hover:text-gray-300 cursor-pointer">
// 							Genre
// 						</span>
// 					</Link>
// 				</div>
// 			</div>

// 			<div className="relative flex-1 mx-2 md:mx-14 mt-4 md:mt-0">
// 				<div className="relative">
// 					<input
// 						type="text"
// 						value={searchTerm}
// 						onChange={handleSearchChange}
// 						className="w-full px-10 py-2 rounded-lg border border-gray-400"
// 						placeholder="Search for movies..."
// 						style={{ width: "350px" }}
// 					/>
// 					<Image
// 						src="/search-icon.svg"
// 						alt="Search Icon"
// 						width={20}
// 						height={20}
// 						className="absolute left-3 top-1/2 transform -translate-y-1/2"
// 					/>
// 				</div>
// 				{searchResults.length > 0 && (
// 					<ul
// 						ref={dropdownRef}
// 						className="absolute z-10 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto mt-1">
// 						{searchResults.map((movie) => (
// 							<li
// 								key={movie.id}
// 								className="flex items-center p-2 border-b border-gray-200 hover:bg-gray-100">
// 								<Image
// 									src={
// 										movie.poster_path
// 											? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
// 											: "/no-poster.jpg"
// 									}
// 									alt={movie.title}
// 									width={50}
// 									height={75}
// 									className="rounded"
// 								/>
// 								<div className="ml-2">
// 									<h2 className="text-sm font-semibold">{movie.title}</h2>
// 									<p className="text-xs text-gray-600">
// 										{movie.release_date
// 											? new Date(movie.release_date).getFullYear()
// 											: "N/A"}
// 									</p>
// 									<p className="text-xs text-gray-600">
// 										{getGenreNames(movie.genre_ids)}
// 									</p>
// 								</div>
// 							</li>
// 						))}
// 					</ul>
// 				)}
// 			</div>

// 			<div className="flex items-center space-x-4">
// 				{isLoggedIn ? (
// 					<>
// 						<Link href="/favorites" passHref>
// 							<span className="text-white hover:text-gray-300 cursor-pointer">
// 								<FontAwesomeIcon icon={faStar} />
// 							</span>
// 						</Link>
// 						<Link href="/watchlist" passHref>
// 							<span className="text-white hover:text-gray-300 cursor-pointer">
// 								<FontAwesomeIcon icon={faList} />
// 							</span>
// 						</Link>
// 						<span
// 							onClick={() => setShowLogoutConfirm(true)}
// 							className="text-white hover:text-gray-300 cursor-pointer">
// 							<FontAwesomeIcon icon={faSignOutAlt} />
// 						</span>
// 						{showLogoutConfirm && (
// 							<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
// 								<div className="bg-white p-6 rounded shadow-lg">
// 									<p>Are you sure you want to log out?</p>
// 									<div className="mt-4 flex justify-center space-x-2">
// 										<button
// 											onClick={() => setShowLogoutConfirm(false)}
// 											className="submit px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
// 											Cancel
// 										</button>
// 										<button
// 											onClick={handleLogout}
// 											className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
// 											Log Out
// 										</button>
// 									</div>
// 								</div>
// 							</div>
// 						)}
// 					</>
// 				) : (
// 					<>
// 						<Link href="/signup" passHref>
// 							<span className="text-white hover:text-gray-300 cursor-pointer">
// 								<FontAwesomeIcon icon={faUserPlus} />
// 							</span>
// 						</Link>
// 						<Link href="/login" passHref>
// 							<span className="text-white hover:text-gray-300 cursor-pointer">
// 								<FontAwesomeIcon icon={faSignInAlt} />
// 							</span>
// 						</Link>
// 					</>
// 				)}
// 				<Link href="/contact" passHref>
// 					<span className="text-white hover:text-gray-300 cursor-pointer">
// 						<FontAwesomeIcon icon={faEnvelope} />
// 					</span>
// 				</Link>
// 				<Link href="/about" passHref>
// 					<span className="text-white hover:text-gray-300 cursor-pointer">
// 						<FontAwesomeIcon icon={faInfoCircle} />
// 					</span>
// 				</Link>
// 			</div>
// 		</nav>
// 	);
// };

// export default NavBar;



// Version 4
import { useState, useEffect, useRef } from "react";
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
import axios from "axios";

const NavBar = () => {
    const { isLoggedIn, logout } = useAuth();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [genres, setGenres] = useState([]);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
                );
                setGenres(response.data.genres);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchGenres();
    }, []);

    const handleLogout = () => {
        logout();
        setShowLogoutConfirm(false);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setShowLogoutConfirm(false);
            }
        };

        if (showLogoutConfirm) {
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [showLogoutConfirm]);

    useEffect(() => {
        if (!isLoggedIn) {
            setShowLogoutConfirm(false);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSearchResults([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearchChange = async (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);

        if (searchTerm.length > 2) {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
                );
                setSearchResults(response.data.results.slice(0, 6));
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const getGenreNames = (genreIds) => {
        const genreNames = genreIds
            .map((id) => genres.find((genre) => genre.id === id)?.name)
            .filter(Boolean);
        return genreNames.slice(0, 3).join(", ");
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
                {/* Single Layer for larger screens, Multiple Layers for mobile */}
                <div className="hidden md:flex justify-between items-center">
                    {/* Left section - Logo and Links */}
                    <div className="flex items-center space-x-14">
                        <Link href="/" passHref>
                            <div className="cursor-pointer flex items-center">
                                <Image
                                    className="inline"
                                    src="/icon.jpg"
                                    alt="PopcornBuddy Logo"
                                    width={50}
                                    height={50}
                                />
                                <h1 className="inline text-white text-xl ml-2">PopcornBuddy</h1>
                            </div>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Link href="/trending" passHref>
                                <span className="text-white hover:text-gray-300 cursor-pointer">
                                    Trending
                                </span>
                            </Link>
                            <Link href="/genre" passHref>
                                <span className="text-white hover:text-gray-300 cursor-pointer">
                                    Genre
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Center section - Search Bar */}
                    <div className="relative flex-1 mx-14">
                        <div className="relative w-full max-w-md">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full px-10 py-2 rounded-lg"
                                placeholder="Search for movies..."
                            />
                            <Image
                                src="/search-icon.svg"
                                alt="Search"
                                width={20}
                                height={20}
                                className="absolute left-3 top-2.5"
                            />
                            {searchResults.length > 0 && (
                                <ul
                                    ref={dropdownRef}
                                    className="absolute z-10 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto mt-1">
                                    {searchResults.map((movie) => (
                                        <li
                                            key={movie.id}
                                            className="flex items-center p-2 border-b border-gray-200 hover:bg-gray-100">
                                            <Image
                                                src={
                                                    movie.poster_path
                                                        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                                                        : "/no-poster.jpg"
                                                }
                                                alt={movie.title}
                                                width={50}
                                                height={75}
                                                className="rounded"
                                            />
                                            <div className="ml-2">
                                                <h2 className="text-sm font-semibold">
                                                    {movie.title}
                                                </h2>
                                                <p className="text-xs text-gray-600">
                                                    {movie.release_date
                                                        ? new Date(movie.release_date).getFullYear()
                                                        : "N/A"}
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    {movie.genre_ids
                                                        ? getGenreNames(movie.genre_ids)
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Right section - Auth and Info links */}
                    <div className="flex items-center space-x-4">
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
                                    className="text-white hover:text-gray-300 cursor-pointer">
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                </span>
                                {showLogoutConfirm && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="bg-white p-6 rounded shadow-lg">
                                            <p>Are you sure you want to log out?</p>
                                            <div className="mt-4 flex justify-center space-x-2">
                                                <button
                                                    onClick={() => setShowLogoutConfirm(false)}
                                                    className="submit px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleLogout}
                                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
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

                {/* Mobile - Three Layers */}
                <div className="block md:hidden">
                    {/* Top Layer */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-4">
                            <Link href="/" passHref>
                                <div className="cursor-pointer flex items-center">
                                    <Image
                                        className="inline"
                                        src="/icon.jpg"
                                        alt="PopcornBuddy Logo"
                                        width={50}
                                        height={50}
                                    />
                                    <h1 className="inline text-white text-xl ml-2">PopcornBuddy</h1>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/trending" passHref>
                                <span className="text-white hover:text-gray-300 cursor-pointer">
                                    Trending
                                </span>
                            </Link>
                            <Link href="/genre" passHref>
                                <span className="text-white hover:text-gray-300 cursor-pointer">
                                    Genre
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Middle Layer */}
                    <div className="relative flex justify-center mb-4">
                        <div className="relative w-full max-w-md">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full px-10 py-2 rounded-lg"
                                placeholder="Search for movies..."
                                style={{ width: "100%" }}
                            />
                            <Image
                                src="/search-icon.svg"
                                alt="Search"
                                width={20}
                                height={20}
                                className="absolute left-3 top-2.5"
                            />
                            {searchResults.length > 0 && (
                                <ul
                                    ref={dropdownRef}
                                    className="absolute z-10 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto mt-1">
                                    {searchResults.map((movie) => (
                                        <li
                                            key={movie.id}
                                            className="flex items-center p-2 border-b border-gray-200 hover:bg-gray-100">
                                            <Image
                                                src={
                                                    movie.poster_path
                                                        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                                                        : "/no-poster.jpg"
                                                }
                                                alt={movie.title}
                                                width={50}
                                                height={75}
                                                className="rounded"
                                            />
                                            <div className="ml-2">
                                                <h2 className="text-sm font-semibold">
                                                    {movie.title}
                                                </h2>
                                                <p className="text-xs text-gray-600">
                                                    {movie.release_date
                                                        ? new Date(movie.release_date).getFullYear()
                                                        : "N/A"}
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    {movie.genre_ids
                                                        ? getGenreNames(movie.genre_ids)
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Bottom Layer */}
                    <div className="flex justify-center space-x-4">
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
                                    className="text-white hover:text-gray-300 cursor-pointer">
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                </span>
                                {showLogoutConfirm && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="bg-white p-6 rounded shadow-lg">
                                            <p>Are you sure you want to log out?</p>
                                            <div className="mt-4 flex justify-center space-x-2">
                                                <button
                                                    onClick={() => setShowLogoutConfirm(false)}
                                                    className="submit px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleLogout}
                                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
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
            </div>
        </nav>
    );
};

export default NavBar;
