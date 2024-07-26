// pages/index.js
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';

const Home = ({ movies }) => {
  return (
    <div>
      <NavBar />
      <SearchBar />
      {/* <div className="movie-list">
        {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div> */}
      <Pagination pageCount={10} onPageChange={() => {}} />
    </div>
  );
};

export default Home;
