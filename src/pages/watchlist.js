// pages/watchlist.js

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import MediaCard from "../components/MediaCard";
import Pagination from "../components/Pagination";
import styles from "../styles/MediaCard.module.css";

const WatchlistPage = () => {
    // Function to determine the number of movies per page based on screen size
    const getMoviesPerPage = () => {
        if (typeof window !== "undefined") {
            if (window.matchMedia("(max-width: 768px)").matches) {
                return 6; // 6 movies per page for small screens (2 columns, 3 rows)
            } else if (window.matchMedia("(max-width: 1024px)").matches) {
                return 6; // 6 movies per page for medium screens (2 columns, 3 rows)
            } else if (window.matchMedia("(max-width: 1279px)").matches) {
                return 5; // 5 movies per page for medium screens (4 columns, 1 row)
            } else {
                return 5; // 5 movies per page for large screens (5 columns, 1 row)
            }
        }
        return 5; // Default to 5 if window is not defined
    };

    const { user, isLoggedIn } = useAuth();
    const [watchlist, setWatchlist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage, setMoviesPerPage] = useState(getMoviesPerPage);

    useEffect(() => {
        const updateMoviesPerPage = () => {
            setMoviesPerPage(getMoviesPerPage());
        };
        window.addEventListener("resize", updateMoviesPerPage);
        return () => {
            window.removeEventListener("resize", updateMoviesPerPage);
        };
    }, []);

    useEffect(() => {
        const fetchWatchlist = async () => {
            if (isLoggedIn && user) {
                try {
                    const response = await axios.get(`/api/user/getWatchList`, {
                        params: {
                            userId: user.id,
                        },
                    });
                    setWatchlist(response.data.watchlist);
                } catch (error) {
                    console.error("Error fetching watchlist:", error.response?.data || error.message);
                }
            }
        };
        fetchWatchlist();
    }, [user, isLoggedIn]);

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = watchlist.slice(indexOfFirstMovie, indexOfLastMovie);

    const handlePageChange = (page) => setCurrentPage(page);

    if (!isLoggedIn) {
        return <p className="text-center mt-16">Please log in to see your watchlist.</p>;
    }

    return (
        <div className="container mx-auto mt-16">
            <h1 className="text-4xl font-bold text-center mb-10">Your Watchlist</h1>
            <div
                className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ${styles.gridContainer}`}
            >
                {currentMovies.map((movie) => (
                    <MediaCard key={movie.movieId} media={movie} />
                ))}
            </div>
            <Pagination
                pageCount={Math.ceil(watchlist.length / moviesPerPage)}
                onPageChange={handlePageChange}
                currentPage={currentPage}
            />
        </div>
    );
};

export default WatchlistPage;
