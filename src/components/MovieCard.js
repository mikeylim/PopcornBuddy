import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaStar, FaList } from "react-icons/fa";
import styles from "../styles/MovieCard.module.css";
import noPoster from "../../public/no-poster.jpg";

const MovieCard = ({ movie, genres }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : noPoster;

    const handleAddToFavorites = (e) => {
        e.preventDefault();
        setIsFavorite(!isFavorite);
        // Logic to save the movie to favorites can be added here
    };

    const handleAddToWatchlist = (e) => {
        e.preventDefault();
        setIsInWatchlist(!isInWatchlist);
        // Logic to save the movie to watchlist can be added here
    };

    const getGenreNames = (genreIds) => {
        return genreIds.map((id) => genres[id]).filter(Boolean).slice(0, 2).join("/");
    };

    return (
        <Link href={`/movie/${movie.id}`} passHref>
            <div className={`bg-white p-4 rounded shadow-lg ${styles.card}`}>
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
                    <h2 className={`text-xl font-bold ${styles.title}`}>
                        {movie.title}
                    </h2>
                    <p className="text-gray-700 mt-2">
                        {new Date(movie.release_date).getFullYear()}
                        {" · "}
                        {getGenreNames(movie.genre_ids)}
                    </p>
                    <div className="flex justify-start items-center mt-3">
                        <button
                            onClick={handleAddToFavorites}
                            aria-label={`Add ${movie.title} to favorites`}
                            className={`rounded-full ${isFavorite ? "text-red-500" : "text-gray-500"}`}
                        >
                            <FaStar size={28} />
                        </button>
                        <button
                            onClick={handleAddToWatchlist}
                            aria-label={`Add ${movie.title} to watchlist`}
                            className={`mx-4 rounded-full ${isInWatchlist ? "text-green-600" : "text-gray-500"}`}
                        >
                            <FaList size={28} />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
