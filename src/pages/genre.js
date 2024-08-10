import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const myLoader = ({ src }) => {
	return `https://image.tmdb.org/t/p/w500${src}`;
};

const GenrePage = () => {
	const [movies, setMovies] = useState([]);
	const [genre, setGenre] = useState("");
	const [error, setError] = useState(null);
	const [genres, setGenres] = useState([]);

	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
				);
				setGenres(response.data.genres);
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

	return (
		<div className="container mx-auto mt-16">
			<h1 className="text-3xl font-bold text-center mb-8">Movies by Genre</h1>
			<div className="text-center mb-8">
				<select
					onChange={handleGenreChange}
					value={genre}
					className="p-2 border border-gray-400 rounded text-black">
					<option value="">Select a Genre</option>
					{genres.map((genre) => (
						<option key={genre.id} value={genre.id}>
							{genre.name}
						</option>
					))}
				</select>
			</div>
			{error && <p className="text-red-500 text-center">{error}</p>}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
				{movies.map((movie, index) => (
					<div
						key={`${movie.id}-${genre}-${index}`}
						className="bg-white p-4 rounded shadow-lg">
						{movie.poster_path ? (
							<Image
								loader={myLoader}
								src={`${movie.poster_path}?${new Date().getTime()}`} // Add cache-busting query param
								alt={movie.title}
								width={500}
								height={750}
								className="w-full h-auto rounded-t"
							/>
						) : (
							<div className="bg-gray-300 w-full h-64 flex items-center justify-center">
								<span className="text-gray-500">No Image Available</span>
							</div>
						)}
						<div className="p-4">
							<h2 className="text-xl font-bold mb-2">{movie.title}</h2>
							<p className="text-gray-700 mb-2">
								Year: {new Date(movie.release_date).getFullYear()}
							</p>
							<a
								href={`https://www.themoviedb.org/movie/${movie.id}`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 hover:underline">
								View on TMDB
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default GenrePage;
