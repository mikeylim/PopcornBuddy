// components/MovieDropdown.js
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

const MovieDropdown = ({ movies, onClose }) => {
	const dropdownRef = useRef(null);

	useEffect(() => {
		// Handle click outside of the dropdown
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				onClose();
			}
		};

		// Add event listener
		document.addEventListener("mousedown", handleClickOutside);

		// Clean up the event listener on component unmount
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClose]);

	return (
		<div
			ref={dropdownRef}
			className="absolute bg-white border border-gray-300 rounded-lg shadow-md w-full max-h-96 overflow-y-auto z-10 mt-2">
			{movies.map((movie) => (
				<Link
					href={`https://www.themoviedb.org/movie/${movie.id}`}
					key={movie.id}
					legacyBehavior>
					<div className="flex items-center p-2 cursor-pointer hover:bg-gray-100">
						<Image
							src={
								movie.poster_path
									? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
									: "/no-poster.jpg"
							}
							alt={movie.title}
							width={50}
							height={75}
							className="rounded"
						/>
						<div className="ml-4">
							<p className="text-lg font-semibold">{movie.title}</p>
							<p className="text-gray-500">
								{movie.release_date
									? new Date(movie.release_date).getFullYear()
									: "N/A"}
							</p>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default MovieDropdown;
