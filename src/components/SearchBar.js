// components/SearchBar.js
import { useState } from "react";
import axios from "axios";
import styles from "../styles/SearchBar.module.css";

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => {
	return (
		<form onSubmit={handleSearch} className="mb-8 text-center">
			<input
				type="text"
				name="search"
				placeholder="Search for a movie..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="p-2 border border-gray-400 rounded text-black"
			/>
			<button type="submit" className="p-2 ml-2 bg-blue-500 text-white rounded">
				Search
			</button>
		</form>
	);
};

export default SearchBar;
