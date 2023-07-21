import { useGlobalContext } from "../App";
import { ImCross } from "react-icons/im";

const WatchedMoviesList = () => {
  const { watchedMovies, handleDelWatchedMovie } = useGlobalContext();

  return (
    <div className="watched-movies-list">
      <ul>
        {watchedMovies.map((movie) => {
          const { imdbID, imdbRating, runTime, userRating, title, poster } =
            movie;
          return (
            <li key={imdbID}>
              <button
                onClick={() => handleDelWatchedMovie(imdbID)}
                className="close"
              >
                <ImCross />
              </button>
              <img src={poster} alt={title} />
              <div className="watched-content">
                <h4>{title}</h4>
                <span>🌟 {userRating}</span>
                <span>🌟 {imdbRating}</span>
                <span>⏳ {runTime}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WatchedMoviesList;
