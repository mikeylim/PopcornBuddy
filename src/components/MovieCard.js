// components/MovieCard.js
import styles from '../styles/MovieCard.module.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white p-4 rounded shadow-lg">
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || 'Movie poster'}
          className="w-full h-auto rounded-t"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-t">
          No image available
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{movie.title || 'Unknown Title'}</h2>
        <p className="text-gray-700 mb-2">
          Year: {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}
        </p>
        {movie.id && (
          <a
            href={`https://www.themoviedb.org/movie/${movie.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View on TMDB
          </a>
        )}
      </div>
    </div>
  );
};

export default MovieCard;