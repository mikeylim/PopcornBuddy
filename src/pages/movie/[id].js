// pages/movie/[id].js
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaStar, FaList, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "../../styles/MovieDetails.module.css";
import LoginPrompt from "../../components/LoginPrompt";
import noPoster from "../../../public/no-poster.jpg";
import { useAuth } from "../../context/AuthContext"; // Import useAuth from your AuthContext

const MovieDetails = () => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [isInWatchlist, setIsInWatchlist] = useState(false);
	const [rating, setRating] = useState(0);
	const [showLoginPrompt, setShowLoginPrompt] = useState(false);
	const [reviews, setReviews] = useState([]);
	const [reviewContent, setReviewContent] = useState("");

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
		const checkUserStatus = async () => {
			if (isLoggedIn && user && movie) {
				try {
					const response = await axios.get(`/api/user/checkUserStatus`, {
						params: {
							userId: user.id,
							movieId: movie.id,
						},
					});
					setIsFavorite(response.data.isFavorite);
					setIsInWatchlist(response.data.isInWatchlist);
					if (response.data.rating) {
						setRating(response.data.rating);
					}
				} catch (error) {
					console.error(
						"Error checking statuses:",
						error.response?.data || error.message
					);
				}
			} else {
				// Reset states when the user is not logged in
				setIsFavorite(false);
				setIsInWatchlist(false);
				setRating(0);
			}
		};

		checkUserStatus();
	}, [user, movie, isLoggedIn]);

	const handleAddToFavorites = async () => {
		if (!isLoggedIn) {
			setShowLoginPrompt(true); // Show login prompt if not logged in
			return;
		}
		const action = isFavorite ? "removeFavorite" : "addFavorite";

		const userId = user?.id; // Ensure userId is correctly retrieved from context

		const dataToSend = {
			userId,
			movieId: movie.id,
			title: movie.title,
			posterPath: movie.poster_path || "",
			releaseDate: movie.release_date || "",
			action,
		};

		try {
			const response = await axios.post("/api/user/toggleFavorites", dataToSend);
			if (response.data.success) {
				setIsFavorite(!isFavorite);
				toast.success(`Movie ${isFavorite ? "removed from" : "added to"} Favorites!`, {
					position: "bottom-right",
				});
			}
		} catch (error) {
			toast.error("Failed to update favorites");
			console.error("Failed to update favorites:", error.response?.data || error.message);
		}
	};

	const handleAddToWatchlist = async () => {
		if (!isLoggedIn) {
			setShowLoginPrompt(true); // Show login prompt if not logged in
			return;
		}

		const action = isInWatchlist ? "removeWatchlist" : "addWatchlist";

		const dataToSend = {
			userId: user?.id,
			movieId: movie.id,
			title: movie.title,
			posterPath: movie.poster_path || "",
			releaseDate: movie.release_date || "",
			action,
		};

		try {
			const response = await axios.post("/api/user/toggleWatchlist", dataToSend);
			if (response.data.success) {
				setIsInWatchlist(!isInWatchlist);
				toast.success(`Movie ${isInWatchlist ? "removed from" : "added to"} Watchlist!`, {
					position: "bottom-right",
				});
			}
		} catch (error) {
			toast.error("Failed to update watchlist");
			console.error("Failed to update watchlist:", error.response?.data || error.message);
		}
	};

	const handleRating = async (e) => {
		const selectedRating = Number(e.target.value);

		if (!isLoggedIn) {
			setShowLoginPrompt(true);
			return;
		}

		try {
			const response = await axios.post("/api/user/toggleRating", {
				userId: user.id,
				movieId: movie.id,
				rating: selectedRating,
			});

			if (response.data.success) {
				setRating(selectedRating);
				toast.success("Rating updated!", {
					position: "bottom-right",
				});
			}
		} catch (error) {
			toast.error("Failed to update rating");
			console.error("Failed to update rating:", error.response?.data || error.message);
		}
	};

	useEffect(() => {
		const fetchReviews = async () => {
			if (isLoggedIn && user && movie) {
				try {
					const response = await axios.get(`/api/user/getReviews`, {
						params: {
							userId: user.id,
							movieId: movie.id,
						},
					});
					setReviews(response.data.reviews);
				} catch (error) {
					console.error("Error fetching reviews:", error.response?.data || error.message);
				}
			}
		};

		fetchReviews();
	}, [user, movie, isLoggedIn]);

	const handleReviewSubmit = async (e) => {
		e.preventDefault();
		if (!isLoggedIn) {
			setShowLoginPrompt(true);
			return;
		}

		try {
			const response = await axios.post("/api/user/submitReview", {
				userId: user.id,
				movieId: movie.id,
				content: reviewContent,
			});

			if (response.data.success) {
				toast.success("Review submitted successfully!", {
					position: "bottom-right",
				});
				setReviewContent("");
				// Refresh reviews
				const updatedReviews = await axios.get(`/api/user/getReviews`, {
					params: {
						userId: user.id,
						movieId: movie.id,
					},
				});
				setReviews(updatedReviews.data.reviews);
			}
		} catch (error) {
			toast.error("Failed to submit review");
			console.error("Failed to submit review:", error.response?.data || error.message);
		}
	};

	const handleDeleteReview = async (reviewId) => {
		if (!isLoggedIn || !user) {
			setShowLoginPrompt(true);
			return;
		}

		try {
			const response = await axios.delete("/api/user/deleteReview", {
				data: { userId: user.id, reviewId },
			});

			if (response.data.success) {
				toast.success("Review deleted successfully!", {
					position: "bottom-right",
				});
				// Update the reviews state to remove the deleted review
				setReviews(reviews.filter((review) => review._id !== reviewId));
			}
		} catch (error) {
			toast.error("Failed to delete review");
			console.error("Failed to delete review:", error.response?.data || error.message);
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
						src={
							movie.poster_path
								? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
								: noPoster
						}
						alt={movie.title}
						width={500}
						height={750}
						className="movieCard rounded shadow-lg"
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
							className={`inline ml-10 mr-6 rounded-full ${
								isFavorite ? "text-red-500" : "text-gray-500"
							}`}>
							<FaStar size={40} />
						</button>
						<button
							onClick={(e) => {
								e.preventDefault();
								handleAddToWatchlist();
							}}
							className={`inline rounded-full ${
								isInWatchlist ? "text-green-600" : "text-gray-500"
							}`}>
							<FaList size={40} />
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
					<p className="main-color text-3xl font-semibold">Rate this movie</p>
					<div className="flex items-center">
						<fieldset className={styles.rating}>
							<input
								type="radio"
								id="star5"
								name="rating"
								value="5"
								className={styles.starRatingInput}
								checked={rating === 5}
								onChange={handleRating}
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
								checked={rating === 4.5}
								onChange={handleRating}
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
								checked={rating === 4}
								onChange={handleRating}
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
								checked={rating === 3.5}
								onChange={handleRating}
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
								checked={rating === 3}
								onChange={handleRating}
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
								checked={rating === 2.5}
								onChange={handleRating}
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
								checked={rating === 2}
								onChange={handleRating}
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
								checked={rating === 1.5}
								onChange={handleRating}
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
								checked={rating === 1}
								onChange={handleRating}
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
								checked={rating === 0.5}
								onChange={handleRating}
							/>
							<label
								className={`${styles.starRatingLabel} ${styles.half}`}
								htmlFor="starhalf"
								title="0.5 stars"></label>
						</fieldset>
					</div>
					<div className="container mx-auto">
						<div className="mt-8">
							<p className="main-color text-3xl font-semibold">Leave a Review</p>
							<form onSubmit={handleReviewSubmit}>
								<textarea
									className="w-full p-4 mt-2 border rounded"
									rows="4"
									value={reviewContent}
									onChange={(e) => setReviewContent(e.target.value)}
									placeholder="Write your review here..."></textarea>
								<div className="flex justify-end mt-2">
									<button
										type="submit"
										className="btn-submit mt-2 px-4 py-2  text-white rounded hover:bg-blue-600">
										Submit Review
									</button>
								</div>
							</form>
						</div>

						{/* Display Reviews */}
						<div className="mt-8">
							<h3 className="main-color text-2xl font-semibold">Reviews</h3>
							{isLoggedIn ? (
								reviews.length > 0 ? (
									reviews.map((review, index) => (
										<div
											key={index}
											className="mt-4 p-4 border rounded flex justify-between items-start">
											<div>
												<p className="main-color">{review.content}</p>
												<p className="text-sm text-gray-500 mt-2">
													{new Date(review.createdAt).toLocaleString()}
												</p>
											</div>
											<button
												onClick={() => handleDeleteReview(review._id)}
												className="text-red-500 hover:text-red-700"
												aria-label="Delete review">
												<FaTrash />
											</button>
										</div>
									))
								) : (
									<p className="mt-2">No reviews yet.</p>
								)
							) : (
								<p className="mt-2">Log in to see reviews.</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieDetails;
