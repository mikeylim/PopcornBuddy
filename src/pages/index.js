// pages/index.js
import { useState } from "react";
import axios from "axios";
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const apiKey = "0609ebbe13f887b723d066bb5937d1db";

  const handleSearch = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&page=${currentPage}`
      );
      if (response.data.results.length > 0) {
        setMovies(response.data.results);
      } else {
        setError("No results found");
        setMovies([]);
      }
    } catch (error) {
      setError("Failed to fetch movies");
      setMovies([]);
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
    handleSearch(new Event('submit')); // Trigger a new search with the updated page
  };

  return (
    <div className="container mx-auto p-4">
      <NavBar />
      <h1 className="text-3xl font-bold text-center mb-8">Movie Search</h1>
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination 
        pageCount={20} // You might want to calculate this based on total_pages from API response
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;