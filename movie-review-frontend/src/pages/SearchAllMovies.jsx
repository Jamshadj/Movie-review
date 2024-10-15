import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';


const SearchAllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useState({
    genre: '',
    language: '',
    releaseDate: '',
    rating: '',
  });

  useEffect(() => {
    fetchAllMovies();
  }, []);

  const fetchAllMovies = async () => {
    try {
      const response = await axiosInstance.get('/movies'); // Endpoint for all movies
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get('/movies', {
        params: searchParams,
      });
      setMovies(response.data);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleRating = async (movieId, rating, comment) => {
    try {
      await axiosInstance.post(`/movies/${movieId}/review`, { rating, comment }); // Review submission
      fetchAllMovies(); // Refresh movies after adding a review
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div>
      <h2>Search All Movies</h2>
      <div>
        <input placeholder="Genre" value={searchParams.genre} onChange={(e) => setSearchParams({ ...searchParams, genre: e.target.value })} />
        <input placeholder="Language" value={searchParams.language} onChange={(e) => setSearchParams({ ...searchParams, language: e.target.value })} />
        <input type="date" value={searchParams.releaseDate} onChange={(e) => setSearchParams({ ...searchParams, releaseDate: e.target.value })} />
        <input placeholder="Rating" type="number" min="1" max="5" value={searchParams.rating} onChange={(e) => setSearchParams({ ...searchParams, rating: e.target.value })} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <p>Average Rating: {movie.averageRating}</p>
            <button onClick={() => handleRating(movie.id, 5, 'Great movie!')}>Rate 5 stars</button> {/* Example of rating */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchAllMovies;