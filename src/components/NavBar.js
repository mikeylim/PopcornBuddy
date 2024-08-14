// components/NavBar.js
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
import MovieDropdown from "./MovieDropdown";
import styles from "../styles/NavBar.module.css"; // Import the CSS module

const NavBar = () => {
	const { isLoggedIn, logout } = useAuth();
	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [genres, setGenres] = useState([]);
	const router = useRouter(); // Get the router object

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
			if (event.key === "Enter" && showLogoutConfirm) {
				handleLogout();
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

	const handleSearchChange = async (e) => {
		const searchTerm = e.target.value;
		setSearchTerm(searchTerm);

		if (searchTerm.length > 2) {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${searchTerm}`
				);
				setSearchResults(response.data.results.slice(0, 6));
			} catch (error) {
				console.error("Error fetching search results:", error);
			}
		} else {
			setSearchResults([]);
		}
	};

	const closeDropdown = () => {
		setSearchResults([]);
	};

	// Function to check if a link is active
	const isActive = (pathname) => router.pathname === pathname;

	return (
		<nav className={styles.navbar}>
			<div className={styles.navbarContainer}>
				<div className={styles.logoContainer}>
					<Link href="/" passHref>
						<div className="cursor-pointer flex items-center">
							<Image
								className={`${styles.logo} inline`}
								src="/icon.svg"
								alt="PopcornBuddy Logo"
								width={50}
								height={50}
							/>
							<h1 className="inline text-white text-xl">PopcornBuddy</h1>
						</div>
					</Link>
				</div>

				<div className={styles.navLinks}>
					<Link href="/trending" passHref>
						<span
							className={`${styles.navLink} ${
								isActive("/trending") ? styles.activeLink : ""
							}`}>
							Trending
						</span>
					</Link>
					<Link href="/toprated" passHref>
						<span
							className={`${styles.navLink} ${
								isActive("/toprated") ? styles.activeLink : ""
							}`}>
							Top Rated
						</span>
					</Link>
					<Link href="/genre" passHref>
						<span
							className={`${styles.navLink} ${
								isActive("/genre") ? styles.activeLink : ""
							}`}>
							Genres
						</span>
					</Link>
				</div>

				<div className={styles.searchContainer}>
					<Image
						src="/search-icon.svg"
						alt="Search"
						width={20}
						height={20}
						className={styles.searchIcon}
					/>
					<input
						type="text"
						value={searchTerm}
						onChange={handleSearchChange}
						className={styles.searchInput}
						placeholder="Search for movies..."
					/>
					{searchResults.length > 0 && (
						<MovieDropdown movies={searchResults} onClose={closeDropdown} />
					)}
				</div>

				<div className={styles.authLinks}>
					{isLoggedIn ? (
						<>
							<Link href="/favorites" passHref>
								<span className={styles.authLink}>
									<FontAwesomeIcon icon={faStar} />
								</span>
							</Link>
							<Link href="/watchlist" passHref>
								<span className={styles.authLink}>
									<FontAwesomeIcon icon={faList} />
								</span>
							</Link>
							<span
								onClick={() => setShowLogoutConfirm(true)}
								className={styles.authLink}>
								<FontAwesomeIcon icon={faSignOutAlt} />
							</span>
							{showLogoutConfirm && (
								<div className={styles.logoutConfirm}>
									<div className={styles.logoutConfirmContent}>
										<p style={{ color: '#001F3F' }}>Are you sure you want to log out?</p>
										<div className={styles.logoutConfirmButtons}>
											<button
												onClick={() => setShowLogoutConfirm(false)}
												className={`${styles.logoutConfirmButton} ${styles.cancelButton}`}
												style={{ color: '#636363' }}
												>
												Cancel
											</button>
											<button
												onClick={handleLogout}
												className={`${styles.logoutConfirmButton} ${styles.logoutButton}`}>
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
								<span className={styles.authLink}>
									<FontAwesomeIcon icon={faUserPlus} />
								</span>
							</Link>
							<Link href="/login" passHref>
								<span className={styles.authLink}>
									<FontAwesomeIcon icon={faSignInAlt} />
								</span>
							</Link>
						</>
					)}
					<Link href="/contact" passHref>
						<span className={styles.authLink}>
							<FontAwesomeIcon icon={faEnvelope} />
						</span>
					</Link>
					<Link href="/about" passHref>
						<span className={styles.authLink}>
							<FontAwesomeIcon icon={faInfoCircle} />
						</span>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
