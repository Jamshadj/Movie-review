import React, { useEffect } from "react";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";
import { TextareaAutosize } from "@mui/material";
import { Button } from "@mui/material"; 
import { Snackbar } from '@mui/material'; 
import MuiAlert from '@mui/material/Alert'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { addMovie, updateMovie, getMovieById, deleteMovie } from "../services";
import { useSelector } from "react-redux";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddMovie() {
  const [movieData, setMovieData] = React.useState({
    title: "",
    director: "",
    releaseDate: "",
    genre: "",
    language: "",
    ottPlatform: "",
    description: "",
    userId: "", // Add userId to track movie owner
  });

  const [error, setError] = React.useState(""); // State for error message
  const [success, setSuccess] = React.useState(""); // State for success message
  const [openError, setOpenError] = React.useState(false); // Snackbar open state for error
  const [openSuccess, setOpenSuccess] = React.useState(false); // Snackbar open state for success
  const userId = useSelector((state) => state.user.id); // Logged-in user ID
  const [loading, setLoading] = React.useState(true); // Loading state
  const [isEditMode, setIsEditMode] = React.useState(false); // Determine if it's edit mode
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const fetchMovie = async () => {
      const params = new URLSearchParams(window.location.search);
      const movieId = params.get("edit"); // Get the movie ID from the URL

      if (movieId) {
        setIsEditMode(true); // Enable edit mode
        try {
          const response = await getMovieById(movieId); // Fetch the movie data
          setMovieData(response); // Set the movie data to state
        } catch (error) {
          console.error("Error fetching movie:", error);
          setError("Failed to fetch the movie."); // Set error message
          setOpenError(true); // Open error Snackbar
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      } else {
        setLoading(false); // If no movie ID, just set loading to false
      }
    };

    fetchMovie();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields are filled
    const isEmpty = Object.values(movieData).some((value) => {
      return typeof value === "string" && value.trim() === ""; // Only apply trim() to string values
    });
  
    if (isEmpty) {
      setError("All fields are required."); // Set error message
      setOpenError(true); // Open error Snackbar
      return; // Prevent submission
    }

    try {
      if (isEditMode) {
        await updateMovie(movieData.id, movieData); // Update the movie
        setSuccess("Movie updated successfully!"); // Set success message
        // Redirect to the movie detail page
        navigate(`/view-movie/${movieData.id}`); // Use navigate here
      } else {
        await addMovie(userId, movieData); // Add new movie
        setSuccess("Movie added successfully!"); // Set success message

        // Redirect to the new movie detail page
        navigate(`/view-movies`); // Use navigate here
      }
      
      setOpenSuccess(true); // Open success Snackbar

      // Reset form after successful submission if it's not in edit mode
      if (!isEditMode) {
        setMovieData({
          title: "",
          director: "",
          releaseDate: "",
          genre: "",
          language: "",
          ottPlatform: "",
          description: "",
          userId: "",
        });
      }
    } catch (error) {
      console.error("Error saving movie:", error);
      setError("Failed to save the movie."); // Set error message
      setOpenError(true); // Open error Snackbar
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMovie(movieData.id); // Call deleteMovie function
      setSuccess("Movie deleted successfully!"); // Show success message
      setOpenSuccess(true);

      // Redirect to '/my-movies' after successful deletion
      navigate('/my-movies');
    } catch (error) {
      console.error("Error deleting movie:", error);
      setError("Failed to delete the movie."); // Show error message
      setOpenError(true);
    }
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="title" required>
            Title
          </FormLabel>
          <OutlinedInput
            id="title"
            name="title"
            type="text"
            placeholder="Enter movie title"
            autoComplete="off"
            required
            size="small"
            value={movieData.title}
            onChange={handleChange}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="director" required>
            Director
          </FormLabel>
          <OutlinedInput
            id="director"
            name="director"
            type="text"
            placeholder="Enter director's name"
            autoComplete="off"
            required
            size="small"
            value={movieData.director}
            onChange={handleChange}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="release-date" required>
            Release Date
          </FormLabel>
          <OutlinedInput
            id="release-date"
            name="releaseDate"
            type="date"
            placeholder="Select release date"
            required
            size="small"
            value={movieData.releaseDate}
            onChange={handleChange}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="genre" required>
            Genre
          </FormLabel>
          <OutlinedInput
            id="genre"
            name="genre"
            type="text"
            placeholder="Enter movie genre"
            autoComplete="off"
            required
            size="small"
            value={movieData.genre}
            onChange={handleChange}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="language" required>
            Language
          </FormLabel>
          <OutlinedInput
            id="language"
            name="language"
            type="text"
            placeholder="Enter language"
            autoComplete="off"
            required
            size="small"
            value={movieData.language}
            onChange={handleChange}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="ott-platform" required>
            OTT Platform
          </FormLabel>
          <OutlinedInput
            id="ott-platform"
            name="ottPlatform"
            type="text"
            placeholder="Enter OTT platform"
            autoComplete="off"
            required
            size="small"
            value={movieData.ottPlatform}
            onChange={handleChange}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="description" required>
            Description
          </FormLabel>
          <TextareaAutosize
            id="description"
            name="description"
            minRows={3}
            placeholder="Enter movie description"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              resize: 'none'
            }}
            required
            value={movieData.description}
            onChange={handleChange}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          {/* Show Update or Save Button */}
          <Button type="submit" variant="contained">
            {isEditMode ? "Update" : "Save"}
          </Button>

          {/* Show Delete Button if the user is the movie owner */}
          {isEditMode && userId === movieData.user.id && (
            <Button
              type="button"
              variant="contained"
              color="error"
              onClick={handleDelete}
              style={{ marginTop: '10px' }}
            >
              Delete
            </Button>
          )}
        </FormGrid>
      </Grid>

      {/* Snackbar for error messages */}
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>

      {/* Snackbar for success messages */}
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success">
          {success}
        </Alert>
      </Snackbar>
    </form>
  );
}
