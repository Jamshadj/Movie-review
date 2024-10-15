import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import {
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import { getRatedMovies, searchMovies } from "../services"; // Import the searchMovies function
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
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

const StyledCardContent = styled(CardContent)({
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

export function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); // Trigger the search in the parent component
  };

  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [movies, setMovies] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState(""); // State for the search term
  const ITEMS_PER_PAGE = 5;
  const [openFilterDialog, setOpenFilterDialog] = React.useState(false);
  const [filters, setFilters] = React.useState({
    language: "",
    genre: "",
    releaseDate: "",
    rating: "",
  });
  const [filterOptions, setFilterOptions] = React.useState({ languages: [], genres: [] });
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/view-movie/${id}`); // Navigate to movie detail page
  };

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  React.useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = searchTerm
          ? await searchMovies(searchTerm, page, ITEMS_PER_PAGE) // Call the search API
          : await getRatedMovies(page, ITEMS_PER_PAGE); // Call the rated movies API
        setFilterOptions({
          languages: response.data.distinctLanguages || [],
          genres: response.data.distinctGenres || [],
        });
        setMovies(response.data.movies);
        setTotalPages(Math.ceil(response.data.totalPages / ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchMovies();
  }, [page, searchTerm]); // Re-fetch movies when page or search term changes

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handlePageChange = (event, value) => {
    setPage(value - 1); // Update page (subtracting 1 to match API index)
  };

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handleClick = () => {
    console.info("You clicked the filter chip.");
  };

  const handleOpenFilterDialog = () => {
    setOpenFilterDialog(true);
  };

  const handleCloseFilterDialog = () => {
    setOpenFilterDialog(false);
  };

  const handleFilterSubmit = async () => {
    try {
      const response = await searchMovies(
        searchTerm,
        page,
        ITEMS_PER_PAGE,
        filters
      ); // Pass filters to API
      setMovies(response.data.movies);
      setTotalPages(Math.ceil(response.data.totalPages / ITEMS_PER_PAGE));
      handleCloseFilterDialog(); // Close dialog after filtering
    } catch (error) {
      console.error("Error fetching filtered movies:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div>
        <Typography variant="h4" gutterBottom>
          Top 5 Movies with the Highest Average Rating
        </Typography>
        <Typography>
          Discover the top-rated movies as voted by our community.
        </Typography>
      </div>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "row",
          gap: 1,
          width: { xs: "100%", md: "fit-content" },
          overflow: "auto",
        }}
      >
        <Search onSearch={setSearchTerm} /> {/* Pass the search handler */}
        <IconButton size="small" aria-label="RSS feed" onClick={handleOpenFilterDialog}>
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          width: "100%",
          justifyContent: "space-between",
          alignItems: { xs: "start", md: "center" },
          gap: 4,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            gap: 3,
            overflow: "auto",
          }}
        >
          <Chip onClick={handleClick} size="medium" label="All categories" />
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            gap: 1,
            width: { xs: "100%", md: "fit-content" },
          }}
        >
          <Search onSearch={setSearchTerm} /> {/* Pass the search handler */}
          <IconButton size="small" aria-label="RSS feed" onClick={handleOpenFilterDialog}>
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={4}>
      {movies.map((movie, index) => (
          <Grid key={index} item xs={12} md={4}>
            <StyledCard
              onMouseEnter={() => handleFocus(index)}
              onMouseLeave={handleBlur}
              onClick={() => handleCardClick(movie.id)}
              tabIndex={0}
              aria-label={`Read more about ${movie.title}`}
              sx={{
                outline:
                  focusedCardIndex === index ? "2px solid lightblue" : "none",
              }}
            >
              <StyledCardContent>
                <StyledTypography variant="h6" component="div">
                  {movie.title}
                </StyledTypography>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {movie.description}
                </StyledTypography>
              </StyledCardContent>
              <CardHeader
                avatar={
                  <Avatar
                    alt={movie.director}
                    src="/static/images/avatar/2.jpg"
                  />
                }
                style={{ padding: "1rem" }}
                title={movie.director}
                subheader={movie.language}
              />
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page + 1} // Convert back to 1-indexed
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 3 }}
      />
      <Dialog open={openFilterDialog} onClose={handleCloseFilterDialog}>
        <DialogTitle>Filter Movies</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            name="language"
            value={filters.language}
            onChange={handleFilterChange}
            displayEmpty
            sx={{ mb: 2 }}
          >
            <MenuItem value="">
              <em>All Languages</em>
            </MenuItem>
            {filterOptions.languages.map((language, index) => (
              <MenuItem key={index} value={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
          <Select
            fullWidth
            name="genre"
            value={filters.genre}
            onChange={handleFilterChange}
            displayEmpty
            sx={{ mb: 2 }}
          >
            <MenuItem value="">
              <em>All Genres</em>
            </MenuItem>
            {filterOptions.genres.map((genre, index) => (
              <MenuItem key={index} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
          <Select
            fullWidth
            name="releaseDate"
            value={filters.releaseDate}
            onChange={handleFilterChange}
            displayEmpty
            sx={{ mb: 2 }}
          >
            <MenuItem value="">
              <em>All Release Dates</em>
            </MenuItem>
            <MenuItem value="lastYear">Last Year</MenuItem>
            <MenuItem value="lastMonth">Last Month</MenuItem>
            <MenuItem value="lastWeek">Last Week</MenuItem>
          </Select>
          <Select
            fullWidth
            name="rating"
            value={filters.rating}
            onChange={handleFilterChange}
            displayEmpty
            sx={{ mb: 2 }}
          >
            <MenuItem value="">
              <em>All Ratings</em>
            </MenuItem>
            <MenuItem value="5">5 and below</MenuItem>
            <MenuItem value="7">4 and below</MenuItem>
            <MenuItem value="9">3 and below</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFilterDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFilterSubmit} color="primary">
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
