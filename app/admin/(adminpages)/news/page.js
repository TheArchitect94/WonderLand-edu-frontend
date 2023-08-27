"use client";
import CSHeading from "@Components/CSHeading";
import CSTextField from "@Components/CSTextField";
import baseURL from "@Config/baseURL";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import axios from "axios";
import CSTable from '@Components/CSTable'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import SendIcon from '@mui/icons-material/Send';
export default function Page() {
  const [model, setModel] = useState({});
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [Severity, setSeverity] = useState("error");
  const [refresh, Setrefresh] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const tableColumns = [
    { id: "image_url", label: "Image" },
    { id: "title", label: "Title" },
    { id: "description", label: "Description" },
  ];
  const SendData = () => {
    // console.log("Model data:", model);
    const formData = new FormData();
    formData.append("title", model.title);
    formData.append("description", model.description);
    formData.append("image", model.image);
    axios
      .post(`${baseURL}/news`, formData)
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

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  let getData = () => {
    axios
      .get(`${baseURL}/news`)
      .then((response) => {
        setTableRows(response.data.news);
      })
      .catch((err) => {});
  };

  // Function to handle the delete button click
  const handleDelete = (id) => {
    axios.delete(`${baseURL}/news/${id}`).then((response) => {
      // console.log(response);
      if (response.data.status) {
        Setrefresh(!refresh);
      } else {
        null;
      }
    });
  };

  const router = useRouter();
  const authData = useSelector((state) => state.auth);
  const { token, user } = authData;
  useEffect(() => {
    if (!token || user?.role !== "ADMIN") {
      router.replace("/admin");
    }
        getData();
        // console.log(authData,"State Auth Data in use Effect")
  }, [refresh,token, user, router]);


  return (
    <div>
      <Box>
        <CSHeading Heading={"News Section"} Tagline={"Add Latest News"} />
      </Box>
      <Box sx={{ p: 3 }}>
        <Box sx={{ border: "1.8px solid #7b0c0d", borderRadius: 5, p: 2 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Box>
                  <Typography>Select Image</Typography>
                  <CSTextField
                    type="file"
                    inputProps={{
                      accept: ".jpg,.png,.pdf", // Specify accepted file types
                    }}
                    onChange={(e) =>
                      setModel({ ...model, image: e.target.files[0] })
                    }
                  />
                </Box>
              </Grid>
              <Grid item md={6}>
                <CSTextField
                  size="small"
                  required={true}
                  label="News Heading "
                  onChange={(e) =>
                    setModel({ ...model, title: e.target.value })
                  }
                />
              </Grid>
              <Grid item md={6}>
                <CSTextField
                  label={"News Content"}
                  size="small"
                  required={true}
                  onChange={(e) =>
                    setModel({ ...model, description: e.target.value })
                  }
                />
              </Grid>
              <Grid item md={12}>
                <Button
                  type="submit"
                  variant="outlined"
                  startIcon={<SendIcon/>}
                  color="success"
                  fullWidth
                >
                  Submit Data
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Box sx={{ paddingY: 3 }}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <CSTable
                rows={tableRows}
                columns={tableColumns}
                onDelete={handleDelete}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
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
    </div>
  );
}
