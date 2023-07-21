import { useGlobalContext } from "../App";
import WatchedMoviesList from "./WatchedMoviesList";
import MovieDetails from "./MovieDetails";

const Summary = () => {
  const { onToggleMovies2, watchedMovies, isOpen2, id } = useGlobalContext();

  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const userRating = average(watchedMovies.map((movie) => movie.userRating));
  const imdbRating = average(watchedMovies.map((movie) => movie.imdbRating));
  const runTime = average(watchedMovies.map((movie) => movie.runTime));

  return (
    <div className="summary">
      <div className="header">
        <h2>movies you watched</h2>
        <button onClick={onToggleMovies2} className="open2">
          {isOpen2 ? "-" : "+"}
        </button>
      </div>

      {isOpen2 && (
        <>
          {id ? (
            <MovieDetails />
          ) : (
            <div className="watched-list">
              <div className="watched-summary">
                <span>📌 {watchedMovies.length}</span>
                <span>🌟 {userRating.toFixed(2)}</span>
                <span>🌟 {imdbRating.toFixed(2)}</span>
                <span>⏳ {runTime.toFixed(2)}</span>
              </div>
              {id ? <MovieDetails /> : <WatchedMoviesList />}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Summary;
