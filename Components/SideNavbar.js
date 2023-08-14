"use client";
import React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import WorkIcon from "@mui/icons-material/Work";
import CollectionsIcon from "@mui/icons-material/Collections";
import LogoutIcon from "@mui/icons-material/Logout";
import SlideshowIcon from '@mui/icons-material/Slideshow';
import NotesIcon from '@mui/icons-material/Notes';
import CallIcon from '@mui/icons-material/Call';
import BookIcon from '@mui/icons-material/Book';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useDispatch } from "react-redux";
import { logout } from "@Store/authSlice";
const SideNavbar = () => {
  const dispatch = useDispatch();
  const pages = [
    { icon: HomeIcon, name: "Home", routes: "/" },
    { icon: SlideshowIcon, name: "Slides", routes: "/admin/slides" },
    { icon: NewspaperIcon, name: "News", routes: "/admin/news" },
    { icon: WorkIcon, name: "Jobs", routes: "/admin/jobs" },
    { icon: CollectionsIcon, name: "Gallery", routes: "/admin/gallery" },
    { icon: NotesIcon, name: "AdmissionForm", routes: "/admin/admissionform" },
    { icon: CallIcon, name: "Contact", routes: "/admin/contact" },
    { icon: BookIcon, name: "BookList", routes: "/admin/booklist" },
    { icon: AccessTimeIcon, name: "TimeTable", routes: "/admin/timetable" },
    { icon: InsertDriveFileIcon, name: "Results", routes: "/admin/result" },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        "& .MuiDrawer-paper": {
          height: "calc(100vh - 64px)",
          width: "50px",
          borderRadius: "15px",
          backgroundColor: "#222",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
          marginTop: "12px",
          marginBottom: "20px",
          marginLeft: "20px",
        },
        position: "fixed",
        zIndex: 1,
        top: "64px",
        left: 0,
      }}
    >
   <List>
  {pages.map((page, index) => (
    <Tooltip key={index} title={page.name}>
      <ListItem component="a" button href={page.routes}>
        <ListItemIcon>
          {React.createElement(page.icon, {
            sx: { fontSize: "20px", color: "red" },
          })}
        </ListItemIcon>
        <ListItemText primary={page.name} />
      </ListItem>
    </Tooltip>
  ))}
</List>


      <Divider color="red" />
      <List>
        <Tooltip title="Logout">
          <ListItem component="a" button href="/admin" onClick={()=>{dispatch(logout())}}>
            <ListItemIcon>
              <LogoutIcon sx={{ fontSize: "20px", color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </Tooltip>
      </List>
    </Drawer>
  );
};

const linkStyle = {
  textDecoration: "none",
  color: "#fff",
};

export default SideNavbar;
