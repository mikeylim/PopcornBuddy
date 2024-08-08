// pages/watchlist.js
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Router from "next/router";

const Watchlist = () => {
	const { isLoggedIn } = useAuth();
	const [watchlist, setWatchlist] = useState([]);

	useEffect(() => {
		if (!isLoggedIn) {
			Router.push("/login");
		} else {
			// Fetch watchlist from the server
			const fetchWatchlist = async () => {
				try {
					const response = await axios.get("/api/watchlist");
					setWatchlist(response.data);
				} catch (error) {
					console.error("Error fetching watchlist:", error);
				}
			};

			fetchWatchlist();
		}
	}, [isLoggedIn]);

	if (!isLoggedIn) return null;

	return (
		<div className="container mx-auto p-4 mt-5">
			<h1 className="text-3xl font-bold text-center mb-8">Your Watchlist</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
				{watchlist.length > 0 ? (
					watchlist.map((movie) => (
						<div key={movie.id} className="bg-gray-200 p-4 rounded shadow">
							<h2 className="text-xl font-bold">{movie.title}</h2>
							<p>{movie.description}</p>
						</div>
					))
				) : (
					<p className="text-center col-span-4">Your watchlist is empty.</p>
				)}
			</div>
		</div>
	);
};

export default Watchlist;
