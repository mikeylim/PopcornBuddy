import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/TrendingGenre.module.css";

const GenrePage = () => {
	const [movies, setMovies] = useState([]);
	const [genre, setGenre] = useState("");
	const [error, setError] = useState(null);
	const [genres, setGenres] = useState({});

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

	const handleGenreChange = async (event) => {
		const selectedGenre = event.target.value;
		setGenre(selectedGenre);
		setError(null);

		if (selectedGenre === "") {
			setMovies([]);
			return;
		}

		try {
			const promises = [];

			// Fetch the first 5 pages of results based on the genre
			for (let i = 1; i <= 5; i++) {
				promises.push(
					axios.get(
						`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${selectedGenre}&page=${i}`
					)
				);
			}

			const responses = await Promise.all(promises);
			const fetchedMovies = responses.flatMap((response) => response.data.results || []);

			// Sort movies by year
			fetchedMovies.sort((a, b) => {
				const yearA = parseInt(a.release_date);
				const yearB = parseInt(b.release_date);
				return yearB - yearA; // Sort in descending order
			});

			setMovies(fetchedMovies);
		} catch (error) {
			setError("Failed to fetch movies");
			console.error("Error fetching movies:", error);
			setMovies([]);
		}
	};

	const getGenreNames = (genreIds) => {
		return genreIds.map((id) => genres[id]).filter(Boolean).slice(0, 2).join("/");
	};

	return (
		<div className="container mx-auto mt-16">
			<h1 className="text-3xl font-bold text-center mb-8">Movies by Genre</h1>
			<div className="text-center mb-8">
				<select
					onChange={handleGenreChange}
					value={genre}
					className="p-2 border border-gray-400 rounded text-black">
					<option value="">Select a Genre</option>
					{Object.keys(genres).map((id) => (
						<option key={id} value={id}>
							{genres[id]}
						</option>
					))}
				</select>
			</div>
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

export default GenrePage;
