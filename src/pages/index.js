// pages/index.js
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard"; // Import the MovieCard component
import styles from "../styles/MovieCard.module.css";

const HomePage = () => {
	const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
	const [popularMovies, setPopularMovies] = useState([]);
	const [upcomingMovies, setUpcomingMovies] = useState([]); // State for upcoming movies
	const [genres, setGenres] = useState({});
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
				);
				const genresMap = response.data.genres.reduce((acc, genre) => {
					acc[genre.id] = genre.name;
					return acc;
				}, {});
				setGenres(genresMap);
			} catch (error) {
				console.error("Error fetching genres:", error);
			}
		};

		const fetchPopularMovies = async () => {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
				);
				setPopularMovies(response.data.results);
			} catch (error) {
				setError("Failed to fetch popular movies");
				console.error("Error fetching popular movies:", error);
			}
		};

		const fetchUpcomingMovies = async () => {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
				);
				setUpcomingMovies(response.data.results);
			} catch (error) {
				setError("Failed to fetch upcoming movies");
				console.error("Error fetching upcoming movies:", error);
			}
		};

		fetchGenres();
		fetchPopularMovies();
		fetchUpcomingMovies(); // Fetch upcoming movies
	}, []);

	return (
		<div className="container mx-auto mt-16">
			<h1 className="text-3xl font-bold text-center mt-16 mb-8">Popular Movies</h1>
			<div
				className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ${styles.gridContainer}`}>
				{popularMovies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} genres={genres} />
				))}
			</div>

			<h1 className="text-3xl font-bold text-center mt-20 mb-8">Upcoming Movies</h1>
			<div
				className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ${styles.gridContainer}`}>
				{upcomingMovies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} genres={genres} />
				))}
			</div>
		</div>
	);
};

export default HomePage;
