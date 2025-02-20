import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Sitemark from "./SitemarkIcon";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../redux/userSlice";
import { getLoggedInUser } from "../services";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem("token");
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSignIn = () => {
    navigate("/sign-in"); // Navigate to Sign In page
  };

  const handleSignUp = () => {
    navigate("/sign-up"); // Navigate to Sign Up page
  };

  React.useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const userData = await getLoggedInUser(token); // Get logged-in user details
          console.log(userData);
          
          dispatch(setUser(userData?.user)); // Set user details in Redux store
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
    };

    fetchUser();
  }, [token, dispatch]);

  const handleSignOut = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    dispatch(clearUser());
    // Redirect to the home page or any other page
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 10,
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Sitemark />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                variant={location.pathname === "/" ? "contained" : "text"}
                color="primary"
                size="small"
                onClick={() => navigate("/")}
              >
                Home
              </Button>
              <Button
                variant={
                  location.pathname === "/my-movies" ? "contained" : "text"
                }
                color="primary"
                size="small"
                onClick={() => navigate("/my-movies")}
              >
                My Movies
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {token ? ( // Check if token exists in local storage
              <>
                <Button color="primary" variant="text" size="small">
                  {user.name}
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  onClick={handleSignIn}
                >
                  Sign in
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={handleSignUp}
                >
                  Sign up
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ display: { sm: "flex", md: "none" } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem>Features</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem>
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth>
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth>
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
