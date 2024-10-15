import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { getMovieById } from "../services";
import { useNavigate, useParams } from "react-router-dom";
import { Button, CardHeader, Rating } from "@mui/material";
import ReviewDialog from "./ReviewDialog";
import { useSelector } from "react-redux";

const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export default function MovieDetialView() {
  const { id } = useParams();
  const [movie, setMovie] = React.useState(null); // State to hold movie details
  const [loading, setLoading] = React.useState(true); // State to manage loading status
  const [openReviewDialog, setOpenReviewDialog] = React.useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate(); 
  // Fetch movie details by ID when component mounts
  React.useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(id);
        setMovie(response); // Set the movie data to state
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchMovie();
  }, [id]); // Fetch movie whenever movieId changes

  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleEditClick = () => {
    navigate(`/movie?edit=${movie.id}`); // Navigate to edit page with movie ID
  };

  if (loading) return <Typography>Loading...</Typography>; // Loading state
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 12 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(3)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 3 ? "Mui-focused" : ""}
            sx={{ height: "100%" }}
          >
            <SyledCardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div>
                <Typography gutterBottom variant="h6" component="div">
                  {movie.title}
                </Typography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  {movie.description}
                </StyledTypography>
                <Typography gutterBottom variant="caption" component="div">
                  Genre: {movie.genre}
                </Typography>
                <Typography gutterBottom variant="caption" component="div">
                  Language: {movie.language}
                </Typography>
                {movie.ottPlatform && (
                  <Typography gutterBottom variant="caption" component="div">
                    Ott Platform: {movie.ottPlatform}
                  </Typography>
                )}
                <Typography gutterBottom variant="caption" component="div">
                  Release Date: {movie.releaseDate}
                </Typography>
                <CardHeader
                  avatar={
                    <Avatar
                      alt={movie.director}
                      src="/static/images/avatar/2.jpg"
                    />
                  }
                  title={movie.director}
                  subheader="Director"
                />
              </div>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              {user?.id === movie.user.id ? (
                  <Button variant="contained" onClick={handleEditClick}>Edit</Button>
                ) : (
                  <Button variant="contained" onClick={() => setOpenReviewDialog(true)}>
                    Add Review
                  </Button>
                )}
              </Box>
              <Box mt={3}>
                <Typography variant="h6" gutterBottom>
                  Reviews
                </Typography>
                {movie.reviews && movie.reviews.length > 0 ? (
                  movie.reviews.map((review) => (
                    <Card key={review.id} sx={{ mb: 2 }}>
                      <CardContent>
                        {/* Star Rating */}
                        <Rating
                          name={`rating-${review.id}`}
                          value={review.starCount}
                          readOnly // Ensure the rating is read-only
                          sx={{ mb: 2 }}
                        />
                        <Typography variant="body1">{review.comment}</Typography>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No reviews available.
                  </Typography>
                )}
              </Box>
            </SyledCardContent>
          </SyledCard>
        </Grid>
      </Grid>
      <ReviewDialog open={openReviewDialog} handleClose={() => setOpenReviewDialog(false)} />
    </Box>
  );
}
