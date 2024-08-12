// pages/favorites.js
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const FavoritesPage = () => {
	const { user, isLoggedIn } = useAuth();
	const [favorites, setFavorites] = useState([]);
	const [sortOption, setSortOption] = useState("recent"); // Default sorting option

	useEffect(() => {
		const fetchFavorites = async () => {
			if (isLoggedIn && user) {
				try {
					const response = await axios.get(`/api/user/getFavorites`, {
						params: {
							userId: user.id,
						},
					});
					setFavorites(response.data.favorites);
				} catch (error) {
					console.error(
						"Error fetching favorites:",
						error.response?.data || error.message
					);
				}
			}
		};

		fetchFavorites();
	}, [user, isLoggedIn]);

	const handleSortChange = (e) => {
		setSortOption(e.target.value);
	};

	const sortedFavorites = [...favorites].sort((a, b) => {
		switch (sortOption) {
			case "recent":
				return new Date(b.releaseDate) - new Date(a.releaseDate);
			case "recent-reversed":
				return new Date(a.releaseDate) - new Date(b.releaseDate);
			case "highest-rating":
				return b.rating - a.rating;
			case "lowest-rating":
				return a.rating - b.rating;
			case "title-az":
				return a.title.localeCompare(b.title);
			case "title-za":
				return b.title.localeCompare(a.title);
			default:
				return 0;
		}
	});

	if (!isLoggedIn) {
		return <p className="text-center mt-16">Please log in to see your favorite movies.</p>;
	}

	return (
		<div className="container mx-auto mt-16">
			<h1 className="text-4xl font-bold text-center mb-10">Your Favorites</h1>

			<div className="mb-6 flex justify-center">
				<select
					value={sortOption}
					onChange={handleSortChange}
					className="p-2 rounded text-black rounded-md shadow-sm focus:outline-none focus:ring-[#1f2937] focus:border-[#1f2937]">
					<option value="recent">Sort by Recent</option>
					<option value="recent-reversed">Sort by Oldest</option>
					<option value="title-az">Sort by Title (A-Z)</option>
					<option value="title-za">Sort by Title (Z-A)</option>
				</select>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
				{sortedFavorites.map((movie) => (
					<Link
						className="block text-center"
						href={`/movie/${movie.movieId}`}
						key={movie.movieId}>
						<div className="flex flex-col items-center">
							<Image
								width={200}
								height={300}
								src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
								alt={movie.title}
								className="rounded shadow-lg mb-2 hover:scale-105 transform transition-transform"
							/>
							<h2 className="main-color text-md font-semibold">{movie.title}</h2>
							<p className="text-gray-600">
								{new Date(movie.releaseDate).getFullYear()}
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default FavoritesPage;
