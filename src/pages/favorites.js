// pages/favorites.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import MediaCard from "../components/MediaCard";
import Pagination from "../components/Pagination";

const FavoritesPage = () => {
  const { user, isLoggedIn } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 

  useEffect(() => {
    const fetchFavorites = async () => {
      if (isLoggedIn && user) {
        try {
          const response = await axios.get(`/api/user/getFavorites`, {
            params: {
              userId: user.id,
            },
          });
          setFavorites(response.data.favorites);
        } catch (error) {
          console.error("Error fetching favorites:", error.response?.data || error.message);
        }
      }
    };

    fetchFavorites();
  }, [user, isLoggedIn]);

  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = favorites.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (page) => setCurrentPage(page);

  if (!isLoggedIn) {
    return <p className="text-center mt-16">Please log in to see your favorite movies.</p>;
  }

  return (
    <div className="container mx-auto mt-16">
      <h1 className="text-4xl font-bold text-center mb-10">Your Favorites</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
        {currentMovies.map((movie) => (
          <MediaCard key={movie.movieId} media={movie} />
        ))}
      </div>

      <Pagination
        pageCount={Math.ceil(favorites.length / itemsPerPage)}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
};

export default FavoritesPage;
