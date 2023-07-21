import { useEffect, useState } from "react";
import { useGlobalContext } from "../App";
import { AiOutlineArrowLeft } from "react-icons/ai";
import StarRating from "../components/Stars/StarRating";
import Loading from "./Loading";

const key = "d04f8063";

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [loading, setloading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const { id, handleDeleteMovie, handleAddWatchedMovies, watchedMovies } =
    useGlobalContext();

  const isWatched = watchedMovies.map((movie) => movie.imdbID).includes(id);

  const watchUserRating = watchedMovies.find(
    (movie) => movie.imdbID === id
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Director: director,
    Genre: genre,
    Plot: plot,
    Actors: actors,
    imdbRating,
    Poster: poster,
    Runtime: runTime,
    Released: released,
  } = movie;

  const handleAddMovie = () => {
    const newMovie = {
      imdbID: id,
      title,
      poster,
      runTime: Number(runTime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating,
    };

    handleAddWatchedMovies(newMovie);
    handleDeleteMovie();
  };

  useEffect(() => {
    const getMovie = async () => {
      setloading(true);
      const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${id}`);
      const data = await res.json();
      setMovie(data);
      setloading(false);
    };

    getMovie();
  }, [id]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie| ${title} `;

    return function () {
      document.title = "Mini Flix";
    };
  }, [title]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="single-movie">
      <div className="header-movie">
        <img src={poster} alt={title} />
        <button onClick={handleDeleteMovie} className="btn">
          <AiOutlineArrowLeft />
        </button>

        <div className="movie-content">
          <h3>{title}</h3>
          <p>
            {year} - {runTime}
          </p>
          <p>{genre}</p>
          <p>🌟 {imdbRating} IMDB Rating </p>
        </div>
      </div>

      {!isWatched ? (
        <div className="add-movie">
          <StarRating
            maxRating={10}
            color="yellow"
            onSetRating={setUserRating}
           
          />

          {userRating && <button onClick={handleAddMovie}>add to list</button>}
        </div>
      ) : (
        <p className="add-movie">
          you have already added this movie with a rating of {watchUserRating}🌟
        </p>
      )}

      <div className="movie-details">
        <em>{actors}</em>
        <p>{plot}</p>
        <h3>{director}</h3>
      </div>
    </div>
  );
};

export default MovieDetails;
