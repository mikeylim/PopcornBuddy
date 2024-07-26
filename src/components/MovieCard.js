// components/MovieCard.js
import styles from '../styles/MovieCard.module.css';

const MovieCard = ({ movie }) => {
  return (
    <div className={styles.card}>
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.genre}</p>
      <p>{movie.director}</p>
      <button>Details</button>
    </div>
  );
};

export default MovieCard;
