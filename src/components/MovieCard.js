// components/MovieCard.js
import { useState } from "react";
import Image from "next/image";
import { FaHeart, FaList } from "react-icons/fa";

const MovieCard = ({ movie }) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [isInWatchlist, setIsInWatchlist] = useState(false);

	const handleAddToFavorites = () => {
		setIsFavorite(!isFavorite);
		// Here you can add logic to save the movie to favorites
	};

	const handleAddToWatchlist = () => {
		setIsInWatchlist(!isInWatchlist);
		// Here you can add logic to save the movie to watchlist
	};

	return (
		<div className="border border-gray-300 rounded-lg shadow-md overflow-hidden">
			<Image
				src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				alt={movie.title}
				width={500}
				height={750}
				className="object-cover w-full"
			/>
			<div className="p-4">
				<h2 className="text-lg font-bold mb-2">{movie.title}</h2>
				<p className="text-gray-600">{movie.release_date}</p>
				<div className="flex justify-between items-center mt-4">
					<button
						onClick={handleAddToFavorites}
						className={`p-2 rounded-full ${
							isFavorite ? "text-red-500" : "text-gray-500"
						}`}>
						<FaHeart size={24} />
					</button>
					<button
						onClick={handleAddToWatchlist}
						className={`p-2 rounded-full ${
							isInWatchlist ? "text-green-500" : "text-gray-500"
						}`}>
						<FaList size={24} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
