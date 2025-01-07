import React, { useState } from 'react';

const MovieSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchMovies = async () => {
        const apiKey = '99eb9fd1';
        const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.Response === 'True') {
                setMovies(data.Search);
                setErrorMessage(""); // Clear error message if the search is successful
            } else {
                setMovies([]);
                setErrorMessage("Invalid movie name. Please try again.");
            }
        } catch (error) {
            setMovies([]);
            setErrorMessage("An error occurred. Please try again later.");
        }
    };

    

    const handleSearch = () => {
        if (searchTerm.trim() === "") {
            setErrorMessage("Please enter a movie name.");
            setMovies([]);
        } else {
            fetchMovies();
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <input 
                type="text" 
                placeholder="Search a movie" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: "10px", width: "300px" }}
            />
            <button 
                id="search" 
                onClick={handleSearch} 
                style={{ padding: "10px 20px", marginLeft: "10px" }}
            >
                Search
            </button>

            {errorMessage && <div className="error" style={{ color: "red", marginTop: "20px" }}>{errorMessage}</div>}

            <div style={{ marginTop: "20px" }}>
                {movies.length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {movies.map((movie) => (
                            <li key={movie.imdbID} style={{ marginBottom: "20px" }}>
                                <img src={movie.Poster} alt={movie.Title} style={{ width: "150px", height: "auto" }} />
                                <h3>{movie.Title}</h3>
                                <p>Year: {movie.Year}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MovieSearch;
