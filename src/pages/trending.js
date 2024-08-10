import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const TrendingPage = () => {
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState(null);

	const apiKey = "0609ebbe13f887b723d066bb5937d1db";

	useEffect(() => {
		const fetchTrendingMovies = async () => {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
				);
				setMovies(response.data.results);
			} catch (error) {
				setError("Failed to fetch trending movies");
				console.error("Error fetching trending movies:", error);
			}
		};

		fetchTrendingMovies();
	}, []);

	return (
		<div className="container mx-auto mt-16">
			<h1 className="text-3xl font-bold text-center mb-8">Trending Movies</h1>
			{error && <p className="text-red-500 text-center">{error}</p>}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
				{movies.map((movie) => (
					<div key={movie.id} className="bg-white p-4 rounded shadow-lg">
						<Image
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt={movie.title}
							className="w-full h-auto rounded-t"
						/>
						<div className="p-4">
							<h2 className="text-xl font-bold mb-2">{movie.title}</h2>
							<p className="text-gray-700 mb-2">
								Year: {new Date(movie.release_date).getFullYear()}
							</p>
							<Link
								href={`https://www.themoviedb.org/movie/${movie.id}`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 hover:underline">
								View on TMDB
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TrendingPage;
