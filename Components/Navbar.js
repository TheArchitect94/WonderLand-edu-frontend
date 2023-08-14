"use client";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  ThemeProvider,
  createTheme,
  MenuList,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import styled from "styled-components";

const NavbarWrapper = styled(AppBar)(({ issticky }) => ({
  width: "85%",
  position: "fixed",
  top: issticky ? 0 : "50px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
}));

const pages = [
  { name: "Home", route: "/" },
  { name: "About Us", route: "/about" },
  { name: "Admissions", route: "/admission" },
  {
    name: "Students",
    dropdown: [
      { name: "Book Lists", route: "/booklist" },
      { name: "TimeTable", route: "/timetable" },
      { name: "Results", route: "/result" },
    ],
  },
  { name: "News", route: "/news" },
  { name: "Jobs", route: "/jobs" },
  { name: "Gallery", route: "/gallery" },
  { name: "Contact", route: "/contact" },
];

function Navbar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [issticky, setIssticky] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = (route) => {
    handleCloseUserMenu();
    window.location.href = route;
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      setIssticky(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ThemeProvider theme={createTheme()}>
      <NavbarWrapper
        key="navbar"
        position={issticky ? "fixed" : "static"}
        issticky={issticky.toString()}
        sx={{
          backgroundColor: "white",
          top: 0,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar
              src="https://wonderland.edu.pk/assets/wgs-logo.png"
              alt="Logo"
              sx={{
                marginRight: "14px",
                display: { xs: "none", md: "flex" },
                width: "120px",
                height: "auto",
                borderRadius: 0,
              }}
            />

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon sx={{ color: "black" }} />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuList>
                  {pages.map((page, i) => (
                    <MenuItem key={i} onClick={() => navigate(page.route)}>
                      <Typography textAlign="center" color="black">
                        {page.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>

            <Avatar
              src="https://wonderland.edu.pk/assets/wgs-logo.png"
              alt="Logo"
              sx={{
                marginRight: "14px",
                display: { xs: "flex", md: "none" },
                mr: 5,
                width: "120px",
                height: "auto",
                borderRadius: 0,
              }}
            />

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              {pages.map((page, i) => (
                <Box key={i} sx={{ mx: 1 }}>
                  {page.dropdown ? (
                    <Tooltip title="DropDown">
                      <Typography
                        onClick={handleOpenUserMenu}
                        style={{
                          color: "black",
                          textDecorationLine: "none",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        {page.name}
                      </Typography>
                    </Tooltip>
                  ) : (
                    <Typography
                      variant="body1"
                      component="a"
                      color="black"
                      href={page.route}
                      sx={{
                        textDecoration: "none",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      {page.name}
                    </Typography>
                  )}
                </Box>
              ))}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {pages
                  .find((page) => page.name === "Students")
                  ?.dropdown?.map((menu, i) => (
                    <MenuItem
                      key={`${menu.name}-${i}`}
                      onClick={() => navigate(menu.route)}
                    >
                      <Typography textAlign="center" color={"black"}>
                        {menu.name}
                      </Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </NavbarWrapper>
    </ThemeProvider>
  );
}

export default Navbar;
