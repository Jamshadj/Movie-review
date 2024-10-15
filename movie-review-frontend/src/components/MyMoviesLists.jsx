import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import { useSelector } from "react-redux";
import { getMovies } from "../services";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function MyMoviesLists() {
  const user = useSelector((state) => state.user);
  const [movies, setMovies] = React.useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  React.useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies(user.id);
        setMovies(response || []); // Ensure response.data is an array or fallback to an empty array
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]); // Fallback to an empty array on error
      }
    };

    fetchMovies();
  }, [user.id]);

  const handleCardClick = (id) => {
    navigate(`/movie?edit=${id}`); // Navigate to the edit page with the movie ID
  };
  const handleAddMovie = () => {
    if (token) {
      navigate("/movie"); // Navigate to the movie page if token exists
    } else {
      alert("You need to sign in to add a movie."); // Show alert if no token
    }
  };

  const handleSignIn = () => {
    navigate("/signin"); // Navigate to the SignIn page
  };

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          My Movie Collection
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Explore your personal movie collection! Here, you can see all the
          films you have added. Share your favorites and discover new cinematic
          gems. Each title represents a moment in your viewing journey—celebrate
          your choices with us!
        </Typography>
      </Box>
      {token ? (
        <Button type="submit" variant="contained" onClick={handleAddMovie}>
          Add Movie
        </Button>
      ) : (
        <>
          <Button variant="contained" onClick={handleSignIn}>
            Sign In
          </Button>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            You need to sign in to add a movie.
          </Typography>
        </>
      )}
      <Grid container spacing={2}>
        {Array.isArray(movies) && movies.length > 0 ? (
          movies.map((movie, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={index}
              sx={{ display: "flex" }}
            >
              <Card
                variant="outlined"
                onClick={() => handleCardClick(movie.id)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flexGrow: 1,
                }}
              >
                <CardContent>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ color: "black", fontWeight: "bold" }}
                  >
                    {movie.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ color: "text.secondary" }}
                  >
                    {movie.description}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        alt={movie.director}
                        src="/static/images/avatar/2.jpg"
                      />
                    }
                    title={movie.director}
                    subheader={movie.language}
                  />
                  {movie.genre}
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No movies found.</Typography>
        )}
      </Grid>
    </Container>
  );
}
