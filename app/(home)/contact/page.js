"use client";
import CSHeading from "@Components/CSHeading";
import CSTextField from "@Components/CSTextField";
import baseURL from "@Config/baseURL";
import { Alert, Box, Button, Grid, Snackbar, TextareaAutosize, Typography } from "@mui/material";
import axios from "axios";
import dynamic from "next/dynamic";
import React, { useState } from "react";
const ReviewCarousel = dynamic(
  () => import("../../../Components/ReviewCarousel"),
  { ssr: false }
);
export default function Page() {
  const [model, setModel] = useState({});
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [Severity, setSeverity] = useState("error");
  const [alertOpen, setAlertOpen] = useState(false);
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const SendData = () => {
    // console.log("Model data:", model);
    const formData = new FormData();
    formData.append("title", model.title);
    formData.append("description", model.description);
    formData.append("image", model.image);
    axios
      .post(`${baseURL}/contact`, model)
      .then((response) => {
        // console.log(response, "response");
        if (response.status === 201) {
          setAlertContent(response.data.message);
          setSeverity("success");
          setAlertOpen(true);
        } else {
          setAlertContent(response.data.message);
          setSeverity("warning");
          setAlertOpen(true);
        }
      })
      .catch((error) => {
        // console.log(error, "Error");
        setAlertContent(error.response?.data?.message || "An error occurred");
        setSeverity("error");
        setAlertOpen(true);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    SendData();
  };
  return (
    <div>
      <Box sx={{ p: 2, pt: 8 }}>
        <CSHeading Heading={"Contact Us"} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "700px",
            border: "1.8px solid #7b0c0d",
            borderRadius: 5,
            p: 3,
          }}
        >
          <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography textAlign="center" color="#7b0c0d" variant="h6">
                Send Us a Message
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CSTextField
                size="small"
                required={true}
                label="Full name"
                onChange={(e) =>
                  setModel({ ...model, fullname: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CSTextField
                size="small"
                required={true}
                label="Email"
                onChange={(e) =>
                  setModel({ ...model, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CSTextField
                size="small"
                required={true}
                label="Phone number"
                onChange={(e) =>
                  setModel({ ...model, phone_number: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CSTextField
                size="small"
                required={true}
                label="City"
                onChange={(e) =>
                  setModel({ ...model, city: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                minRows={2}
                maxRows={10}
                aria-label="textarea"
                placeholder="Your message"
                style={{
                  width: "100%",
                  minHeight: "100px",
                  fontSize: "16px",
                }}
                onChange={(e) =>
                  setModel({ ...model, message: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
              sx={{ backgroundColor: "#7b0c0d", color: "white" }}
                    type="submit"
                    variant="contained"
                    // color="success"
                    fullWidth
                  >
                   Send Message
                  </Button>
            
            </Grid>
          </Grid>
          </form>
          <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleAlertClose} severity={Severity}>
            {alertContent}
          </Alert>
        </Snackbar>
        </Box>
      </Box>

      <Box sx={{ p: 1 }}>
        <ReviewCarousel />
      </Box>
    
    </div>
  );
}
