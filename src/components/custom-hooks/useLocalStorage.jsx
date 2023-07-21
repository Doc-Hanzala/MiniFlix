import { useEffect, useState } from "react";

export function useLocalStorage(initialState, key) {
  const [value, setValue] = useState(() => {
    const storedMovies = localStorage.getItem(key);
    return JSON.parse(storedMovies) || initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);


  return [value,setValue]
}
