// components/MovieCard.js
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaStar, FaList } from "react-icons/fa";
import axios from "axios";
import noPoster from "../../public/no-poster.jpg";
import styles from "../styles/MovieCard.module.css";
import LoginPrompt from "./LoginPrompt";
import { useAuth } from "../context/AuthContext"; // Use AuthContext

const MovieCard = ({ movie, genres }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const { isLoggedIn, user } = useAuth(); // Use the custom AuthContext to check if user is logged in
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    useEffect(() => {
        const checkFavoriteAndWatchlistStatus = async () => {
            if (isLoggedIn && user) {
                try {
                    // Check both favorite and watchlist statuses
                    const favoriteResponse = await axios.get(`/api/user/checkFavorite`, {
                        params: {
                            userId: user.id,
                            movieId: movie.id,
                        },
                    });
                    setIsFavorite(favoriteResponse.data.isFavorite);

                    const watchlistResponse = await axios.get(`/api/user/checkWatchlist`, {
                        params: {
                            userId: user.id,
                            movieId: movie.id,
                        },
                    });
                    setIsInWatchlist(watchlistResponse.data.isInWatchlist);
                } catch (error) {
                    console.error("Error checking favorite/watchlist status:", error.response?.data || error.message);
                }
            } else {
                // Reset states when the user is not logged in
                setIsFavorite(false);
                setIsInWatchlist(false);
            }
        };

        checkFavoriteAndWatchlistStatus();
    }, [user, movie.id, isLoggedIn]);

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : noPoster;

    const handleAddToFavorites = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            setShowLoginPrompt(true); // Show login prompt if not logged in
            return;
        }
        const action = isFavorite ? "removeFavorite" : "addFavorite";

        const userId = user?.id; // Ensure userId is correctly retrieved from context

        const dataToSend = {
            userId,
            movieId: movie.id,
            title: movie.title,
            posterPath: movie.poster_path || "",
            releaseDate: movie.release_date || "",
            action,
        };

        try {
            const response = await axios.post("/api/user/toggleFavorites", dataToSend);
            if (response.data.success) {
                setIsFavorite(!isFavorite);
            }
        } catch (error) {
            console.error("Failed to update favorites:", error.response?.data || error.message);
        }
    };

    const handleAddToWatchlist = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            setShowLoginPrompt(true); // Show login prompt if not logged in
            return;
        }

        const action = isInWatchlist ? "removeWatchlist" : "addWatchlist";

        const dataToSend = {
            userId: user?.id,
            movieId: movie.id,
            title: movie.title,
            posterPath: movie.poster_path || "",
            releaseDate: movie.release_date || "",
            action,
        };

        try {
            const response = await axios.post("/api/user/toggleWatchlist", dataToSend);
            if (response.data.success) {
                setIsInWatchlist(!isInWatchlist);
            }
        } catch (error) {
            console.error("Failed to update watchlist:", error.response?.data || error.message);
        }
    };

    const getGenreNames = (genreIds) => {
        return genreIds
            .map((id) => genres[id])
            .filter(Boolean)
            .slice(0, 2)
            .join("/");
    };

    return (
        <>
            {showLoginPrompt && <LoginPrompt onClose={() => setShowLoginPrompt(false)} />}
            <div className={`bg-white p-4 rounded shadow-lg ${styles.card}`}>
                <Link href={`/movie/${movie.id}`} passHref>
                    <div className={`relative ${styles.imageContainer}`}>
                        <Image
                            src={posterUrl}
                            alt={`Poster for ${movie.title}`}
                            layout="responsive"
                            width={500}
                            height={750}
                            className="rounded-t"
                            priority
                        />
                    </div>
                    <div className={`p-4 ${styles.content}`}>
                        <h2 className={`text-xl font-bold ${styles.title}`}>{movie.title}</h2>
                        <p className="text-gray-700 mt-2">
                            {new Date(movie.release_date).getFullYear()}
                            {" · "}
                            {getGenreNames(movie.genre_ids)}
                        </p>
                    </div>
                </Link>
                <div className="flex pl-3 pb-2 justify-between items-center">
                    <button
                        onClick={handleAddToFavorites}
                        aria-label={`Add ${movie.title} to favorites`}
                        className={`rounded-full ${isFavorite ? "text-red-500" : "text-gray-500"}`}>
                        <FaStar size={28} />
                    </button>
                    <button
                        onClick={handleAddToWatchlist}
                        aria-label={`Add ${movie.title} to watchlist`}
                        className={`mx-4 rounded-full ${
                            isInWatchlist ? "text-green-600" : "text-gray-500"
                        }`}>
                        <FaList size={28} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default MovieCard;
