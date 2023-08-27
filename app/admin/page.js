"use client";
import { useEffect, useState } from "react";
import { Box, Button, Fade, Grid, TextField } from "@mui/material";
import { Alert } from "@mui/lab";
import axios from "axios";
import baseURL from "@Config/baseURL";
import Link from "next/link";
import CSTextField from "@Components/CSTextField";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "@Store/authSlice";
import SendIcon from '@mui/icons-material/Send';
export default function Page() {
  const [model, setModel] = useState({});
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [severity, setSeverity] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const selectAuthData = (state) => state.auth;
  const authData = useSelector(selectAuthData);
  const { token, user } = authData;  
  // console.log(authData,"AuthData")
  const loginUser = () => {
    // console.log("Model data:", model);
    axios
      .post(`${baseURL}/login`, model)
      .then((response) => {
        // console.log(response, "response");
        if (response.status === 200) {
          setAlertContent(response.data.message);
          setAlert(true);
          setSeverity("success");
          dispatch(login({
            token: response.data.token,
            user: response.data.user,
          }));
          window.location.href = "/admin/slides";
        } else {
          setAlertContent(response.data.message);
          setAlert(true);
          setSeverity("warning");
        }
      })
      .catch((error) => {
        // console.log(error, "Error");
        // setAlertContent(error.data.message);
        setAlert(true);
        setSeverity("error");
      });
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid item md={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              border: "1.8px solid #7b0c0d",
              width: "50%",
              borderRadius: "25px",
              p: 3,
              backgroundColor: "#F5F8F5",
            }}
          >
            <CSTextField
              required={true}
              label="Email"
              fullWidth
              variant="standard"
              onChange={(e) => setModel({ ...model, email: e.target.value })}
            />
            <CSTextField
              required={true}
              label="Password"
              fullWidth
              variant="standard"
              onChange={(e) => setModel({ ...model, password: e.target.value })}
            />
            <Box sx={{ p: 2 }}>
              <Button
                variant="outlined"
                color="success"
                fullWidth
                startIcon={<SendIcon/>}
                onClick={loginUser}
              >
                Login
              </Button>
            </Box>
            {alert && (
              <Fade
                in={alert}
                timeout={{ enter: 1000, exit: 1000 }}
                onExited={() => {
                  setTimeout(() => {
                    setAlert(false);
                  }, 2000);
                }}
              >
                <Alert variant="outlined" severity={severity}>
                  {alertContent}
                </Alert>
              </Fade>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>

  );
}
