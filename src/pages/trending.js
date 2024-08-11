// pages/trending.js
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/TrendingGenre.module.css";

const TrendingPage = () => {
	const [movies, setMovies] = useState([]);
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

		const fetchTrendingMovies = async () => {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
				);
				setMovies(response.data.results);
			} catch (error) {
				setError("Failed to fetch trending movies");
				console.error("Error fetching trending movies:", error);
			}
		};

		fetchGenres();
		fetchTrendingMovies();
	}, []);

	const getGenreNames = (genreIds) => {
		return genreIds.map((id) => genres[id]).filter(Boolean).slice(0, 2).join("/");
	};

	return (
		<div className="container mx-auto mt-16">
			<h1 className="text-3xl font-bold text-center mb-8">Trending Movies</h1>
			{error && <p className="text-red-500 text-center">{error}</p>}
			<div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ${styles.gridContainer}`}>
				{movies.map((movie) => (
					<Link key={movie.id} href={`/movie/${movie.id}`} passHref>
						<div className={`bg-white p-4 rounded shadow-lg ${styles.card}`}>
							<div className={`relative ${styles.imageContainer}`}>
								<Image
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default TrendingPage;
