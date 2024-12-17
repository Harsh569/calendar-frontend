import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { theme } from "../theme";
import NotesIcon from "@mui/icons-material/Notes";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

function Header() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();
    setOpenProfileDialog(true);
  };

  const handleCloseProfileDialog = () => {
    setOpenProfileDialog(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/login");
    handleMenuClose();
  };

  const userEmail = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName");

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: `${theme.palette.primary.main}` }}
    >
      <Toolbar>
        <NotesIcon
          sx={{
            marginRight: { xs: 1, sm: 2 },
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        />
        <Typography
          variant={isMobile ? "subtitle1" : "h6"}
          sx={{
            flexGrow: 1,
            fontSize: { xs: "1rem", sm: "1.25rem" },
            marginLeft: { xs: 1, sm: 2 },
          }}
        >
          Manage Your Notes
        </Typography>
        <IconButton
          onClick={handleMenuOpen}
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
        >
          <AccountCircleIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>

      <Dialog open={openProfileDialog} onClose={handleCloseProfileDialog}>
        <DialogTitle>User Profile</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Name: {userName}</Typography>
          <Typography variant="body1">Email: {userEmail}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfileDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

export default Header;
