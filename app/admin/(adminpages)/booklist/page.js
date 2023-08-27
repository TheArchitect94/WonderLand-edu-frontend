"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import CSHeading from "@Components/CSHeading";
import CSTextField from "@Components/CSTextField";
import CSTable from "@Components/CSTable";
import baseURL from "@Config/baseURL";
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
  const router = useRouter()
  
  const tableColumns = [
    { id: "image_url", label: "Image" },
    { id: "class_name", label: "Classname" },
    { id: "book_description", label: "Description" },
    { id: "book_title", label: "Book Title" },
    { id: "book_price", label: "Price" },
  ];
  const SendData = () => {
    // console.log("Model data:", model);
    
    const formData = new FormData();
  formData.append("class_name", model.class_name);
  formData.append("book_title", model.book_title);
  formData.append("book_description", model.book_description);
  formData.append("book_price", model.book_price);

  if (model.image_url) {
    formData.append("image_url", model.image_url, model.image_url.name);
  }
    const config = {
      headers: {
        "Content-Type": "multipart/form-data", // Make sure this matches the Postman request
      },
    };
  
    axios
      .post(`${baseURL}/booklist`, formData, config)
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
      .get(`${baseURL}/booklist`)
      .then((response) => {
        // console.log(response.data);
        const booksData = response.data.map((classData) => classData.books);
        const allBooks = booksData.flat();
        setTableRows(allBooks);
      })
      .catch((err) => {});
  };

  const handleDelete = (id) => {
    axios.delete(`${baseURL}/booklist/${id}`).then((response) => {
      // console.log(response);
      if (response.data.status) {
        Setrefresh(!refresh);
      } else {
        null;
      }
    });
  };
 


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
          <CSHeading Heading={"BookList Section"} Tagline={"Edit Booklists"} />
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
                        accept: ".jpg,.png,.pdf", 
                      }}
                      onChange={(e) =>{
                        // console.log("Image File Selected:", e.target.files[0]);
                          setModel({ ...model, image_url: e.target.files[0] })
                      }
                        
                      }
                    />
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <CSTextField
                    size="small"
                    required={true}
                    label="Class name"
                    value={model.class_name || ""}
                    onChange={(e) =>
                      setModel({ ...model, class_name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item md={6}>
                  <CSTextField
                    label="Book Title"
                    size="small"
                    required={true}
                    value={model.book_title || ""}
                    onChange={(e) =>
                      setModel({ ...model, book_title: e.target.value })
                    }
                  />
                </Grid>
                <Grid item md={6}>
                  <CSTextField
                    label="Book Description"
                    size="small"
                    required={true}
                    value={model.book_description || ""}
                    onChange={(e) =>
                      setModel({ ...model, book_description: e.target.value })
                    }
                  />
                </Grid>
                <Grid item md={6}>
                  <CSTextField
                    label="Book Price"
                    size="small"
                    required={true}
                    value={model.book_price || ""}
                    onChange={(e) =>
                      setModel({ ...model, book_price: e.target.value })
                    }
                  />
                </Grid>
                <Grid item md={12}>
                  <Button
                    type="submit"
                    variant="outlined"
                    color="success"
                    fullWidth
                    startIcon={<SendIcon />}
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
