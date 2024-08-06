import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const TrendingPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMBD_API_KEY}`
        );
        setMovies(response.data.results);
      } catch (error) {
        setError("Failed to fetch trending movies");
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleAddToFavorites = (movie) => {
    setFavorites([...favorites, movie]);
  };

  const handleAddToWatchlist = (movie) => {
    setWatchlist([...watchlist, movie]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Trending Movies</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            handleAddToFavorites={handleAddToFavorites} 
            handleAddToWatchlist={handleAddToWatchlist} 
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingPage;
