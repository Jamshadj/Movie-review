import axiosInstance from "./axiosInstance";

const signup = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/v1/users/signup", payload);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

const signin = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/v1/users/signin", payload);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

const getLoggedInUser = async (token) => {
  try {
    const response = await axiosInstance.get("/api/v1/users/auth", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

const addMovie = async (userId, movieData) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/movies/${userId}`,
      movieData
    ); // Include userId in the URL
    return response.data;
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};

const getMovies = async (userId) => {
  try {
    console.log(userId);

    const response = await axiosInstance.get(`/api/v1/movies/user/${userId}`); // Include userId in the URL
    return response.data;
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};

const getMovieById = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/api/v1/movies/${movieId}`); // Include movieId in the URL
    return response.data;
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};

const addReview = async (movieId, review) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/movies/${movieId}/reviews`,
      review
    );
    console.log("Review submitted:", response.data);
  } catch (error) {
    console.error("Error submitting review:", error);
  }
};

const getRatedMovies = async (page,itemsPerPage) => {
  try {
    const response = await axiosInstance.get(`/api/v1/movies/top-rated?page=${page}&size=${itemsPerPage}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const updateMovie = async (movieId, updatedMovieData) => {
  try {
    const response = await axiosInstance.put(`/api/v1/movies/${movieId}`, updatedMovieData);
    return response.data;
  } catch (error) {
    console.error('Error updating movie:', error);
    throw error;
  }
};

const deleteMovie = async (movieId) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/movies/${movieId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

const searchMovies = async (searchTerm, page, itemsPerPage, filters) => {
  try {
    const response = await axiosInstance.get(`/api/v1/movies/search`, {
      params: {
        query: searchTerm,
        page: page,
        itemsPerPage: itemsPerPage,
        language: filters.language,
        genre: filters.genre,
        releaseDate: filters.releaseDate,
        rating: filters.rating,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};


export {
  signup,
  signin,
  addMovie,
  getLoggedInUser,
  getMovies,
  getMovieById,
  addReview,
  getRatedMovies,
  updateMovie,
  deleteMovie,
  searchMovies
};
