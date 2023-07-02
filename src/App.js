import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./search.svg";
import MovieCart from "./MovieCart";

const App_Url = "http://www.omdbapi.com?apikey=5bc9a04d";


function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchMovies = async (title) => {
    const response = await fetch(`${App_Url}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("spiderman");
    
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="search for movies"
          value={searchTerm}
          onChange={(e) => {setSearchTerm(e.target.value) }}
        />
        <img src={searchIcon}
          alt="search icon"
          onClick={() => {searchMovies(searchTerm) }} />
      </div>



      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCart movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
