// pages/watchlist.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import MediaCard from "../components/MediaCard";
import Pagination from "../components/Pagination";

const WatchlistPage = () => {
  const { user, isLoggedIn } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Changed to 5 items per page

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (isLoggedIn && user) {
        try {
          const response = await axios.get(`/api/user/getWatchlist`, {
            params: {
              userId: user.id,
            },
          });
          setWatchlist(response.data.watchlist);
        } catch (error) {
          console.error(
            "Error fetching watchlist:",
            error.response?.data || error.message
          );
        }
      }
    };

    fetchWatchlist();
  }, [user, isLoggedIn]);

  // Get current page movies
  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = watchlist.slice(indexOfFirstMovie, indexOfLastMovie);

  // Change page
  const handlePageChange = (page) => setCurrentPage(page);

  if (!isLoggedIn) {
    return <p className="text-center mt-16">Please log in to see your watchlist.</p>;
  }

  return (
    <div className="container mx-auto mt-16">
      <h1 className="text-4xl font-bold text-center mb-10">Your Watchlist</h1>

      {/* Movie Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
        {currentMovies.map((movie) => (
          <MediaCard key={movie.movieId} media={movie} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        pageCount={Math.ceil(watchlist.length / itemsPerPage)}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
};

export default WatchlistPage;