import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "../context/AuthContext"; // Assuming you're using AuthContext for authentication

const FavoritesPage = () => {
	const { user, isLoggedIn } = useAuth();
	const [favorites, setFavorites] = useState([]);

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

	if (!isLoggedIn) {
		return <p className="text-center mt-16">Please log in to see your favorite movies.</p>;
	}

	return (
		<div className="container mx-auto mt-16">
			<h1 className="text-4xl font-bold text-center mb-10">Your Favorites</h1>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
				{favorites.map((movie) => (
					<Link
						className="block text-center"
						href={`/movie/${movie.movieId}`}
						key={movie.movieId}>
						<div className="flex flex-col items-center">
							<img
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
