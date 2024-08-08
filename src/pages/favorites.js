// pages/favorites.js
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Router from "next/router";

const Favorites = () => {
	const { isLoggedIn } = useAuth();
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		if (!isLoggedIn) {
			Router.push("/login");
		} else {
			// Fetch favorites from the server
			const fetchFavorites = async () => {
				try {
					const response = await axios.get("/api/favorites");
					setFavorites(response.data);
				} catch (error) {
					console.error("Error fetching favorites:", error);
				}
			};

			fetchFavorites();
		}
	}, [isLoggedIn]);

	if (!isLoggedIn) return null;

	return (
		<div className="container mx-auto p-4 mt-5">
			<h1 className="text-3xl font-bold text-center mb-8">Your Favorites</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
				{favorites.length > 0 ? (
					favorites.map((movie) => (
						<div key={movie.id} className="bg-gray-200 p-4 rounded shadow">
							<h2 className="text-xl font-bold">{movie.title}</h2>
							<p>{movie.description}</p>
						</div>
					))
				) : (
					<p className="text-center col-span-4">Your favorites list is empty.</p>
				)}
			</div>
		</div>
	);
};

export default Favorites;
