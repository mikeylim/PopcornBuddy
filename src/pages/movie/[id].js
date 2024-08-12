import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaStar, FaList } from "react-icons/fa";
import styles from "../../styles/MovieDetails.module.css";
import LoginPrompt from "../../components/LoginPrompt";
import { useAuth } from "../../context/AuthContext"; // Import useAuth from your AuthContext

const MovieDetails = () => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [isInWatchlist, setIsInWatchlist] = useState(false);
	const [showLoginPrompt, setShowLoginPrompt] = useState(false);

	const { isLoggedIn, user } = useAuth(); // Use the custom AuthContext to check if the user is logged in
	const [movie, setMovie] = useState(null);
	const [error, setError] = useState(null);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		if (!id) return;

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

	useEffect(() => {
		const checkFavoriteStatus = async () => {
			if (isLoggedIn && user && movie) {
				try {
					const response = await axios.get(`/api/user/checkFavorite`, {
						params: {
							userId: user.id,
							movieId: movie.id,
						},
					});
					setIsFavorite(response.data.isFavorite);
				} catch (error) {
					console.error(
						"Error checking favorite status:",
						error.response?.data || error.message
					);
				}
			} else {
				// Reset states when the user is not logged in
				setIsFavorite(false);
			}
		};

		const checkWatchlistStatus = async () => {
			if (isLoggedIn && user && movie) {
				try {
					const response = await axios.get(`/api/user/checkWatchlist`, {
						params: {
							userId: user.id,
							movieId: movie.id,
						},
					});
					setIsInWatchlist(response.data.isInWatchlist);
				} catch (error) {
					console.error(
						"Error checking watchlist status:",
						error.response?.data || error.message
					);
				}
			} else {
				// Reset states when the user is not logged in
				setIsInWatchlist(false);
			}
		};

		checkFavoriteStatus();
		checkWatchlistStatus();
	}, [user, movie, isLoggedIn]);

	const handleAddToFavorites = async () => {
		if (!isLoggedIn) {
			setShowLoginPrompt(true);
			return;
		}

		const action = isFavorite ? "removeFavorite" : "addFavorite";
		try {
			const response = await axios.post("/api/user/toggleFavorites", {
				userId: user.id,
				movieId: movie.id,
				title: movie.title,
				posterPath: movie.poster_path,
				releaseDate: movie.release_date,
				genres: movie.genres.map((genre) => genre.name).join("/"),
				action,
			});
			if (response.data.success) {
				setIsFavorite(!isFavorite);
			}
		} catch (error) {
			console.error("Failed to update favorites:", error.response?.data || error.message);
		}
	};

	const handleAddToWatchlist = async () => {
		if (!isLoggedIn) {
			setShowLoginPrompt(true);
			return;
		}

		const action = isInWatchlist ? "removeWatchList" : "addWatchList";
		try {
			const response = await axios.post("/api/user/toggleFavorites", {
				userId: user.id,
				movieId: movie.id,
				title: movie.title,
				posterPath: movie.poster_path,
				releaseDate: movie.release_date,
				genres: movie.genres.map((genre) => genre.name).join("/"),
				action,
			});
			if (response.data.success) {
				setIsInWatchlist(!isInWatchlist);
			}
		} catch (error) {
			console.error("Failed to update watchlist:", error.response?.data || error.message);
		}
	};

	if (error) {
		return <p className="mt-16 text-red-500 text-center">{error}</p>;
	}

	if (!movie) {
		return <p className="main-color mt-16 text-center">Loading...</p>;
	}

	return (
		<div className="container mx-auto p-4 mt-16">
			{showLoginPrompt && <LoginPrompt onClose={() => setShowLoginPrompt(false)} />}
			<div className="flex flex-col md:flex-row">
				{/* Poster */}
				<div className="md:w-1/3">
					<Image
						src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
						alt={movie.title}
						width={500}
						height={750}
						className="rounded shadow-lg"
					/>
				</div>
				<div className={`${styles.movieInfoSection} main-color md:w-2/3 md:ml-8`}>
					<div className="flex justify-start">
						<h1 className="inline text-4xl font-bold">{movie.title}</h1>
						<button
							onClick={(e) => {
								e.preventDefault();
								handleAddToFavorites();
							}}
							className={`inline ml-8 mr-4 rounded-full ${
								isFavorite ? "text-red-500" : "text-gray-500"
							}`}>
							<FaStar size={36} />
						</button>
						<button
							onClick={(e) => {
								e.preventDefault();
								handleAddToWatchlist();
							}}
							className={`inline rounded-full ${
								isInWatchlist ? "text-green-600" : "text-gray-500"
							}`}>
							<FaList size={36} />
						</button>
					</div>
					<p className="text-lg 700 mt-4 italic">{movie.tagline}</p>
					<p className="mt-4 text-md">
						{new Date(movie.release_date)
							.toISOString()
							.split("T")[0]
							.replace(/-/g, "/")}{" "}
						· {movie.genres.map((genre) => genre.name).join("/")} ·{" "}
						{movie.production_countries.map((country) => country.name).join(", ")} ·{" "}
						{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
					</p>
					<div className="main-color text-md my-12">
						<p className="text-3xl font-bold mt-4">Overview</p>
						<p className="mt-3 leading-loose">{movie.overview}</p>
					</div>
                    <h3 className="main-color text-xl font-semibold">Rate this movie</h3>
                    <div className="flex items-center">
                        <fieldset className={styles.rating}>
                            <input
                                type="radio"
                                id="star5"
                                name="rating"
                                value="5"
                                className={styles.starRatingInput}
                            />
                            <label
                                className={`${styles.starRatingLabel} ${styles.full}`}
                                htmlFor="star5"
                                title="5 stars"></label>

                            <input
                                type="radio"
                                id="star4half"
                                name="rating"
                                value="4.5"
                                className={styles.starRatingInput}
                            />
                            <label
                                className={`${styles.starRatingLabel} ${styles.half}`}
                                htmlFor="star4half"
                                title="4.5 stars"></label>

                            <input
                                type="radio"
                                id="star4"
                                name="rating"
                                value="4"
                                className={styles.starRatingInput}
                            />
                            <label
                                className={`${styles.starRatingLabel} ${styles.full}`}
                                htmlFor="star4"
                                title="4 stars"></label>

                            <input
                                type="radio"
                                id="star3half"
                                name="rating"
                                value="3.5"
                                className={styles.starRatingInput}
                            />
                            <label
                                className={`${styles.starRatingLabel} ${styles.half}`}
                                htmlFor="star3half"
                                title="3.5 stars"></label>

                            <input
                                type="radio"
                                id="star3"
                                name="rating"
                                value="3"
                                className={styles.starRatingInput}
                            />
                            <label
                                className={`${styles.starRatingLabel} ${styles.full}`}
                                htmlFor="star3"
                                title="3 stars"></label>

                            <input
                                type="radio"
                                id="star2half"
                                name="rating"
                                value="2.5"
                                className={styles.starRatingInput}
                            />
                            <label
                                className={`${styles.starRatingLabel} ${styles.half}`}
                                htmlFor="star2half"
                                title="2.5 stars"></label>

                            <input
                                type="radio"
                                id="star2"
                                name="rating"
                                value="2"
                                className={styles.starRatingInput}
                            />
                            <label
                                className={`${styles.starRatingLabel} ${styles.full}`}
                                htmlFor="star2"
                                title="2 stars"></label>

                            <input
                                id="star1half"
                                name="rating"
                                type="radio"
                                value="1.5"
                                className={styles.starRatingInput}
                            />
                            <label
                                className={`${styles.starRatingLabel} ${styles.half}`}
                                htmlFor="star1half"
                                title="1.5 stars"></label>

                            <input
                                type="radio"
                                id="star1"
                                name="rating"
                                value="1"
                                className={styles.starRatingInput}
                            />
                            <label
                                className={`${styles.starRatingLabel} ${styles.full}`}
                                htmlFor="star1"
                                title="1 star"></label>

                            <input
                                type="radio"
                                id="starhalf"
                                name="rating"
                                value="0.5"
                                className={styles.starRatingInput}
                            />
                            <label
                                className={`${styles.starRatingLabel} ${styles.half}`}
                                htmlFor="starhalf"
                                title="0.5 stars"></label>
                        </fieldset>
                    </div>
				</div>
                <div>
					</div>
			</div>
		</div>
	);
};

export default MovieDetails;
