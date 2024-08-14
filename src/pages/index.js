// pages/index.js
import Head from 'next/head';
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import styles from "../styles/MovieCard.module.css";

const HomePage = () => {
	// Function to determine the number of movies per page based on screen size
	const getMoviesPerPage = () => {
		if (typeof window !== "undefined") {
			if (window.matchMedia("(max-width: 768px)").matches) {
				return 6; // 6 movies per page for small screens (2 columns, 3 rows)
			} else if (window.matchMedia("(max-width: 1024px)").matches) {
				return 6; // 6 movies per page for medium screens (2 columns, 3 rows)
			} else if (window.matchMedia("(max-width: 1279px)").matches) {
				return 4; // 4 movies per page for medium screens (4 columns, 1 row)
			} else {
				return 5; // 5 movies per page for large screens (5 columns, 1 row)
			}
		}
		return 5; // Default to 5 if window is not defined
	};

	const [popularMovies, setPopularMovies] = useState([]);
	const [upcomingMovies, setUpcomingMovies] = useState([]);
	const [genres, setGenres] = useState({});
	const [error, setError] = useState(null);

	// Pagination states
	const [moviesPerPage, setMoviesPerPage] = useState(getMoviesPerPage);
	const [popularPage, setPopularPage] = useState(1);
	const [upcomingPage, setUpcomingPage] = useState(1);
	const [popularTotalPages, setPopularTotalPages] = useState(0);
	const [upcomingTotalPages, setUpcomingTotalPages] = useState(0);

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

		fetchGenres();
	}, []);

	useEffect(() => {
		const fetchPopularMovies = async () => {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${popularPage}`
				);
				setPopularMovies(response.data.results.slice(0, moviesPerPage));
				setPopularTotalPages(response.data.total_pages);
			} catch (error) {
				setError("Failed to fetch popular movies");
				console.error("Error fetching popular movies:", error);
			}
		};

		fetchPopularMovies();
	}, [popularPage, moviesPerPage]);

	useEffect(() => {
		const fetchUpcomingMovies = async () => {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${upcomingPage}`
				);
				setUpcomingMovies(response.data.results.slice(0, moviesPerPage));
				setUpcomingTotalPages(response.data.total_pages);
			} catch (error) {
				setError("Failed to fetch upcoming movies");
				console.error("Error fetching upcoming movies:", error);
			}
		};

		fetchUpcomingMovies();
	}, [upcomingPage, moviesPerPage]);

	const handlePopularPageChange = (newPage) => {
		setPopularPage(newPage);
	};

	const handleUpcomingPageChange = (newPage) => {
		setUpcomingPage(newPage);
	};

	return (
		<>
		<Head>
        <title>PopcornBuddy - Discover Popular and Upcoming Movies</title>
        <meta name="description" content="Explore the latest popular and upcoming movies with PopcornBuddy. Find your next favorite film and stay up to date with the latest releases." />
      </Head>
		<div className="container mx-auto mt-16">
			<h1 className="text-3xl font-bold text-center mt-16 mb-8">Popular Movies</h1>
			<div
				className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ${styles.gridContainer}`}>
				{popularMovies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} genres={genres} />
				))}
			</div>
			<Pagination
				pageCount={popularTotalPages}
				onPageChange={handlePopularPageChange}
				currentPage={popularPage}
			/>

			<h1 className="text-3xl font-bold text-center mt-20 mb-8">Upcoming Movies</h1>
			<div
				className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ${styles.gridContainer}`}>
				{upcomingMovies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} genres={genres} />
				))}
			</div>
			<Pagination
				pageCount={upcomingTotalPages}
				onPageChange={handleUpcomingPageChange}
				currentPage={upcomingPage}
			/>
		</div>
		</>
	);
};

export default HomePage;
