import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaStar, FaList } from "react-icons/fa";
import styles from "../styles/MovieCard.module.css"; // Assuming the CSS file is named this way
import noPoster from "../../public/no-poster.jpg"; // Import the fallback image


const MovieCard = ({ movie, genres }) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [isInWatchlist, setIsInWatchlist] = useState(false);
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : noPoster; // Fallback to no-poster.jpg

	const handleAddToFavorites = () => {
		setIsFavorite(!isFavorite);
		// Logic to save the movie to favorites can be added here
	};

	const handleAddToWatchlist = () => {
		setIsInWatchlist(!isInWatchlist);
		// Logic to save the movie to watchlist can be added here
	};

	const getGenreNames = (genreIds) => {
		return genreIds.map((id) => genres[id]).filter(Boolean).slice(0, 2).join("/");
	};

	return (
		<Link key={movie.id} href={`/movie/${movie.id}`} passHref>
			<div className={`bg-white p-4 rounded shadow-lg ${styles.card}`}>
				<div className={`relative ${styles.imageContainer}`}>
					<Image
						src={posterUrl}
						alt={movie.title}
						layout="fill"
						objectFit="cover"
						className="rounded-t"
					/>
				</div>
				<div className={`p-4 ${styles.content}`}>
					<h2 className={`text-xl font-bold ${styles.title}`}>{movie.title}</h2>
					<p className="text-gray-700 mt-2">
						{new Date(movie.release_date).getFullYear()}
						{" · "}
						{getGenreNames(movie.genre_ids)}
					</p>
					<div className="flex justify-start items-center mt-3">
						<button
							onClick={(e) => {
								e.preventDefault();
								handleAddToFavorites();
							}}
							className={`rounded-full ${
								isFavorite ? "text-red-500" : "text-gray-500"
							}`}>
							<FaStar size={28} />
						</button>
						<button
							onClick={(e) => {
								e.preventDefault();
								handleAddToWatchlist();
							}}
							className={`mx-4 rounded-full ${
								isInWatchlist ? "text-green-600" : "text-gray-500"
							}`}>
							<FaList size={28} />
						</button>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default MovieCard;
