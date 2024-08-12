// utils/favoritesUtils.js
export const isMovieFavorite = (movieId, favorites) => {
    return favorites.some((fav) => fav.movieId === movieId);
};
