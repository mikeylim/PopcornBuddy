import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

const MovieDetails = () => {
	const [movie, setMovie] = useState(null);
	const [error, setError] = useState(null);
	const router = useRouter();
	const { id } = router.query; // Get the movie ID from the URL

	useEffect(() => {
		if (!id) return; // Do nothing if there's no ID in the URL

		const fetchMovieDetails = async () => {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
				);
				setMovie(response.data);
			} catch (error) {
				setError("Failed to fetch movie details");
				console.error("Error fetching movie details:", error);
			}
		};

		fetchMovieDetails();
	}, [id]);

	if (error) {
		return <p className="text-red-500 text-center">{error}</p>;
	}

	if (!movie) {
		return <p className="text-center">Loading...</p>;
	}

	// Formatting the movie information
    const releaseDate = new Date(movie.release_date).toLocaleDateString("en-US");
	const genres = movie.genres.map((genre) => genre.name).join("/");
	const originCountries = movie.production_countries.map((country) => country.name).join(", ");
	const runtime = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;

	const formattedInfo = `${releaseDate} · ${genres} · ${originCountries} · ${runtime}`;

	return (
		<div className="container mx-auto p-4 mt-16">
			<div className="flex flex-col md:flex-row">
				<div className="md:w-1/3">
					<Image
						src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
						alt={movie.title}
						width={500}
						height={750}
						className="rounded shadow-lg"
					/>
				</div>
				<div className="md:w-2/3 md:ml-8">
					<h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
					<p className="text-md text-gray-600 mb-4">{formattedInfo}</p>
					<p className="text-lg text-gray-700 mb-4 italic">{movie.tagline}</p>
					<p className="text-md text-gray-600 mb-4">{movie.overview}</p>
				</div>
			</div>
		</div>
	);
};

export default MovieDetails;
