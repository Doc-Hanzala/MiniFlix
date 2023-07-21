import { useEffect, useRef } from "react";

const Navbar = ({ movies, setSearch, search }) => {
  const refContainer = useRef(null);

  useEffect(() => {
    refContainer.current.focus();
  }, []);

  return (
    <nav>
      <div className="logo">
        <h1>mini flix</h1>
      </div>
      <input
        type="text"
        placeholder="search movies.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        ref={refContainer}
      />
      <div className="result">
        <p>found {movies.length} results</p>
      </div>
    </nav>
  );
};

export default Navbar;
