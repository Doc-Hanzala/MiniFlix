import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import { createContext, useContext, useEffect, useState } from "react";
import { useSearchMovie } from "./components/custom-hooks/useSearchMovie";
import { useLocalStorage } from "./components/custom-hooks/useLocalStorage";

export const appContext = createContext();

export const useGlobalContext = () => useContext(appContext);

function App() {
  const [watchedMovies, setWatchedMovies] = useLocalStorage([], "watched");
  const [search, setSearch] = useState("");
  const [id, setId] = useState(null);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  // all handle functions

  const onToggleMovies1 = () => {
    setIsOpen1(!isOpen1);
  };

  const onToggleMovies2 = () => {
    setIsOpen2(!isOpen2);
  };

  const handleSelectId = (id) => {
    setId((selectId) => (id === selectId ? null : id));
  };

  const handleDeleteMovie = () => {
    setId(null);
  };

  const handleAddWatchedMovies = (newMovie) => {
    setWatchedMovies([...watchedMovies, newMovie]);
    localStorage.setItem(
      "watchedMovies",
      JSON.stringify([...watchedMovies, newMovie])
    );
  };

  const handleDelWatchedMovie = (id) => {
    const newWatchedMovies = watchedMovies.filter(
      (movie) => movie.imdbID !== id
    );
    setWatchedMovies(newWatchedMovies);
  };

  const { movies, loading, error } = useSearchMovie(search);

  return (
    <>
      <appContext.Provider
        value={{
          movies,
          watchedMovies,
          isOpen1,
          isOpen2,
          onToggleMovies1,
          onToggleMovies2,
          loading,
          error,
          id,
          handleSelectId,
          handleDeleteMovie,
          handleAddWatchedMovies,
          handleDelWatchedMovie,
        }}
      >
        <Navbar movies={movies} search={search} setSearch={setSearch} />
        <Movies />
      </appContext.Provider>
    </>
  );
}

export default App;
