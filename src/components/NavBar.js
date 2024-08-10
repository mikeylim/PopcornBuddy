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
import MovieDropdown from "./MovieDropdown"; // Make sure to import the MovieDropdown component

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

    // Function to get genre names based on genre IDs
    const getGenreNames = (genreIds) => {
        const genreNames = genreIds
            .map((id) => genres.find((genre) => genre.id === id)?.name)
            .filter(Boolean);
        return genreNames.slice(0, 3).join(", ");
    };

    const closeDropdown = () => {
        setSearchResults([]);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
                <div className="hidden md:flex justify-between items-center">
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
                                <MovieDropdown movies={searchResults} onClose={closeDropdown} />
                            )}
                        </div>
                    </div>

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
            </div>
        </nav>
    );
};

export default NavBar;
