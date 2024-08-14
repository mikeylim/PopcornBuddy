// pages/favorites.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import MediaCard from "../components/MediaCard";
import Pagination from "../components/Pagination";
import styles from "../styles/MediaCard.module.css";

const FavoritesPage = () => {
	// Function to determine the number of movies per page based on screen size
	const getMoviesPerPage = () => {
		if (typeof window !== "undefined") {
			if (window.matchMedia("(max-width: 768px)").matches) {
				return 6; // 6 movies per page for small screens (2 columns, 3 rows)
			} else if (window.matchMedia("(max-width: 1024px)").matches) {
				return 6; // 6 movies per page for medium screens (2 columns, 3 rows)
			} else if (window.matchMedia("(max-width: 1279px)").matches) {
				return 5; // 4 movies per page for medium screens (4 columns, 1 row)
			} else {
				return 5; // 6 movies per page for large screens (5 columns, 1 row)
			}
		}
		return 5; // Default to 5 if window is not defined
	};

	const { user, isLoggedIn } = useAuth();
	const [favorites, setFavorites] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [moviesPerPage, setMoviesPerPage] = useState(getMoviesPerPage);
	const [sortOption, setSortOption] = useState("recent");

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

	useEffect(() => {
		const sortMovies = () => {
			let sortedMovies = [...favorites];
			switch (sortOption) {
				case "recent":
					sortedMovies.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
					break;
				case "oldest":
					sortedMovies.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
					break;
				case "alphabetA-Z":
					sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
					break;
				case "alphabetZ-A":
					sortedMovies.sort((a, b) => b.title.localeCompare(a.title));
					break;
				case "recentlyAdded":
					sortedMovies.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
					break;
				case "oldestAdded":
					sortedMovies.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
					break;
				default:
					break;
			}
			setFavorites(sortedMovies);
		};

		sortMovies();
	}, [sortOption, favorites]);

	// Calculate the number of items to display on the current page based on moviesPerPage
	const indexOfLastMovie = currentPage * moviesPerPage;
	const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
	const currentMovies = favorites.slice(indexOfFirstMovie, indexOfLastMovie);

	const handlePageChange = (page) => setCurrentPage(page);

	if (!isLoggedIn) {
		return <p className="text-center mt-16">Please log in to see your favorite movies.</p>;
	}

	return (
		<div className="container mx-auto mt-16">
			<h1 className="text-3xl font-bold text-center mb-10">Your Favorites</h1>

			<div className="mb-4 flex justify-start">
				<select
					value={sortOption}
					onChange={(e) => setSortOption(e.target.value)}
					className="p-2 border rounded">
					<option value="recent">Sort by Recent</option>
					<option value="oldest">Sort by Oldest</option>
					<option value="alphabetA-Z">Sort by Alphabet (A-Z)</option>
					<option value="alphabetZ-A">Sort by Alphabet (Z-A)</option>
					<option value="recentlyAdded">Sort by Added Time (Recent)</option>
					<option value="oldestAdded">Sort by Added Time (Oldest)</option>
				</select>
			</div>

			<div
				className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ${styles.gridContainer}`}>
				{currentMovies.map((movie) => (
					<MediaCard key={movie.movieId} media={movie} />
				))}
			</div>

			<Pagination
				pageCount={Math.ceil(favorites.length / moviesPerPage)}
				onPageChange={handlePageChange}
				currentPage={currentPage}
			/>
		</div>
	);
};

export default FavoritesPage;
