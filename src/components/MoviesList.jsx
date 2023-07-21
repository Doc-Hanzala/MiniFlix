import { useGlobalContext } from "../App";
import Loading from "./Loading";
import Error from "./Error";

const MoviesList = () => {
  const { movies, isOpen1, onToggleMovies1, loading, error, handleSelectId } =
    useGlobalContext();

  if (error) {
    return (
      <div className="movies-list">
        <div className="header">
          <h2>list</h2>
          <button onClick={onToggleMovies1} className="open1">
            {isOpen1 ? "-" : "+"}
          </button>
        </div>

        <Error error={error} />
      </div>
    );
  }

  return (
    <div className="movies-list">
      <div className="header">
        <h2>list</h2>
        <button onClick={onToggleMovies1} className="open1">
          {isOpen1 ? "-" : "+"}
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="list">
          <ul>
            {isOpen1 &&
              movies.map((movie) => {
                const { imdbID, Poster, Title, Year } = movie;
                return (
                  <li  className="hover" onClick={() => handleSelectId(imdbID)} key={imdbID}>
                    <img src={Poster} alt={Title} />
                    <div className="content">
                      <h3>{Title}</h3>
                      <p>{Year}</p>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
