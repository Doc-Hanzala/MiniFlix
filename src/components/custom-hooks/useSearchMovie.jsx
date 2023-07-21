import { useEffect, useState } from "react";

const key = "d04f8063";

export function useSearchMovie(search) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const getMovies = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${search}`,
          { signal: controller.signal }
        );
        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        setLoading(false);
        setError("");
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
        setLoading(false);
      }
    };

    if (search.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    getMovies();

    return function () {
      controller.abort();
    };
  }, [search]);

  return { movies, loading, error };
}
