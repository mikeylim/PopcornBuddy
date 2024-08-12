// pages/watchlist.js
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const WatchlistPage = () => {
	const { user, isLoggedIn } = useAuth();
	const [watchlist, setWatchlist] = useState([]);
	const [sortOption, setSortOption] = useState("recent"); // Default sorting option
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Set the number of items per page


	useEffect(() => {
		const fetchWatchlist = async () => {
			if (isLoggedIn && user) {
				try {
					const response = await axios.get(`/api/user/getWatchlist`, {
						params: {
							userId: user.id,
						},
					});
					setWatchlist(response.data.watchlist);
				} catch (error) {
					console.error(
						"Error fetching watchlist:",
						error.response?.data || error.message
					);
				}
			}
		};

		fetchWatchlist();
	}, [user, isLoggedIn]);

    // Get current page movies
	const indexOfLastMovie = currentPage * itemsPerPage;
	const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
	const currentMovies = watchlist.slice(indexOfFirstMovie, indexOfLastMovie);

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const handleSortChange = (e) => {
		setSortOption(e.target.value);
	};

	const sortedWatchlist = [...watchlist].sort((a, b) => {
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
		return <p className="text-center mt-16">Please log in to see your watchlist.</p>;
	}

	return (
		<div className="container mx-auto mt-16">
			<h1 className="text-4xl font-bold text-center mb-10">Your Watchlist</h1>
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
				{sortedWatchlist.map((movie) => (
					<Link
						className="block text-center"
						href={`/movie/${movie.movieId}`}
						key={movie.movieId}>
						<div className="flex flex-col items-center">
							<Image
								width={200}
								height={200}
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

            {/* Pagination Controls */}
			<div className="flex justify-center mt-8">
				{[...Array(Math.ceil(watchlist.length / itemsPerPage)).keys()].map((number) => (
					<button
						key={number + 1}
						onClick={() => paginate(number + 1)}
						className={`px-3 py-1 border rounded mx-1 ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
						{number + 1}
					</button>
				))}
			</div>
		</div>
	);
};

export default WatchlistPage;
