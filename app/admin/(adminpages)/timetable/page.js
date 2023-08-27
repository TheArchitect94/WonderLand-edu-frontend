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
import SendIcon from "@mui/icons-material/Send";

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
    { id: "classname", label: "Classname" },
    { id: "day", label: "Day" },
    { id: "subject", label: "Subject" },
    { id: "start_time", label: "Start Time" },
    { id: "end_time", label: "End Time" },
  ];
  const SendData = () => {
    // console.log("Model data:", model);
    axios
      .post(`${baseURL}/timetable`, model)
      .then((response) => {
        // console.log(response, "response");
        if (response.status === 201) {
          setAlertContent(response.data.message);
          setSeverity("success");
          setAlertOpen(true);
          Setrefresh(!refresh);
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

  const getData = () => {
    axios
      .get(`${baseURL}/timetable`) // Fetch timetable data
      .then((response) => {
        // console.log(response.data);

        // Transform the timetable data for the table
        const transformedTableRows = [];
        for (const className in response.data.timetable) {
          for (const day in response.data.timetable[className]) {
            for (const entry of response.data.timetable[className][day]) {
              const transformedEntry = {
                id: entry.id, // Replace with the actual ID of the entry
                classname: className,
                day: day,
                subject: entry.subject,
                start_time: entry.start_time,
                end_time: entry.end_time,
              };
              transformedTableRows.push(transformedEntry);
            }
          }
        }
        setTableRows(transformedTableRows);
      })
      .catch((err) => {
        // console.error(err);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${baseURL}/timetable/${id}`).then((response) => {
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
        <CSHeading Heading={"Timetable  Section"} Tagline={"Edit TimeTable"} />
      </Box>
      <Box sx={{ p: 3 }}>
        <Box sx={{ border: "1.8px solid #7b0c0d", borderRadius: 5, p: 2 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <CSTextField
                  size="small"
                  required={true}
                  label="Class name"
                  value={model.classname || ""}
                  onChange={(e) =>
                    setModel({ ...model, classname: e.target.value })
                  }
                />
              </Grid>
              <Grid item md={6}>
                <CSTextField
                  label="Day"
                  size="small"
                  required={true}
                  value={model.day || ""}
                  onChange={(e) => setModel({ ...model, day: e.target.value })}
                />
              </Grid>
              <Grid item md={6}>
                <CSTextField
                  label="Subject"
                  size="small"
                  required={true}
                  value={model.subject || ""}
                  onChange={(e) =>
                    setModel({ ...model, subject: e.target.value })
                  }
                />
              </Grid>
              <Grid item md={6}>
                <CSTextField
                  label="Start Time"
                  size="small"
                  required={true}
                  value={model.start_time || ""}
                  onChange={(e) =>
                    setModel({ ...model, start_time: e.target.value })
                  }
                />
              </Grid>
              <Grid item md={6}>
                <CSTextField
                  label="End Time"
                  size="small"
                  required={true}
                  value={model.end_time || ""}
                  onChange={(e) =>
                    setModel({ ...model, end_time: e.target.value })
                  }
                />
              </Grid>
              <Grid item md={12}>
                <Button
                  type="submit"
                  variant="outlined"
                  startIcon={<SendIcon />}
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
