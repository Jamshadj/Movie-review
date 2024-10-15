import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

const MyList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axiosInstance.get('/my-movies'); // Your API endpoint
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await axiosInstance.delete(`/movies/${id}`);
      fetchMovies(); // Refresh the movie list after deletion
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <div>
      <h2>My List</h2>
      <Link to="/add-movie">Add Movie</Link>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>
            <Link to={`/edit-movie/${movie.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyList;