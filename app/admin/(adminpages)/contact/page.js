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

export default function Page() {
  const [model, setModel] = useState({});
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [Severity, setSeverity] = useState("error");
  const [refresh, Setrefresh] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const router = useRouter();

  const tableColumns = [
    { id: "fullname", label: "Full Name" },
    { id: "email", label: "Email Address" },
    { id: "phone_number", label: "Phone no" },
    { id: "city", label: "City" },
    { id: "message", label: "Message" },
  ];
  let getData = () => {
    axios
      .get(`${baseURL}/contact`)
      .then((response) => {
        setTableRows(response.data.contact);
      })
      .catch((err) => {});
  };

  const handleDelete = (id) => {
    axios.delete(`${baseURL}/contact/${id}`).then((response) => {
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
    // console.log(authData, "State Auth Data in use Effect");
  }, [refresh, token, user, router]);

  return (
    <div>
      <Box>
        <CSHeading
          Heading={"Contact Section"}
          Tagline={"See who have contacted you"}
        />
      </Box>
      <Box sx={{ p: 3 }}>
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
    </div>
  );
}
