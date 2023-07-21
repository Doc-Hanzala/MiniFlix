import MoviesList from "./MoviesList";
import WatchedMovies from "./WatchedMovies";

const Movies = () => {
  return (
    <div className="movies">
      <MoviesList />
      <WatchedMovies />
    </div>
  );
};

export default Movies;
