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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
} from "@mui/material";
import CSHeading from "@Components/CSHeading";
import CSTextField from "@Components/CSTextField";
import CSTable from "@Components/CSTable";
import baseURL from "@Config/baseURL";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CSButton from "@Components/CSButton";
import DeleteIcon from "@mui/icons-material/Delete";
import StudentResultTable from "@Components/StudentResultTable";
import SendIcon from '@mui/icons-material/Send';
export default function Page() {
  const [model, setModel] = useState({});
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [Severity, setSeverity] = useState("error");
  const [refresh, Setrefresh] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [subjectArray, setSubjectArray] = useState([]);
  const [isaddsubject, setIsAddSubject] = useState(false);
  const router = useRouter();
  const tableColumns = [
    { id: "classname", label: "Classname" },
    { id: "studentname", label: "Student Name" },
    { id: "subjects", label: "Subjects" },
  ];

  // console.log(tableRows, "Table Rows");

  // console.log(subjectArray, "Subject Array");
  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjectArray];
    updatedSubjects[index][field] = value;
    setSubjectArray(updatedSubjects);
  };

  const handleAddSubject = () => {
    const newSubject = {
      subject_name: "",
      marks: 0,
      total_marks: 0,
    };
    setSubjectArray([...subjectArray, newSubject]);
  };

  const handleRemoveSubject = (index) => {
    const updatedSubjects = [...subjectArray];
    updatedSubjects.splice(index, 1);
    setSubjectArray(updatedSubjects);
  };

  const SendData = () => {
    const requestData = {
      class_name: model.class_name,
      student_name: model.student_name,
      subjects: subjectArray,
    };

    axios
      .post(`${baseURL}/studentresult`, requestData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log(response, "response"); // Log the entire response for debugging
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
        // console.log(error, "Error"); // Log the entire error object for debugging
        setAlertContent(
          error.response?.data?.message ||
            "An error occurred while processing the request."
        );
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
      .get(`${baseURL}/studentresult`)
      .then((response) => {
        const responseData = response.data;
        if (responseData.student_results) {
          const transformedTableRows = [];
          for (const className in responseData.student_results) {
            for (const studentName in responseData.student_results[className]) {
              const studentData =
                responseData.student_results[className][studentName];
              const subjects = studentData.subjects.map((subject) => ({
                subject_name: subject.subject_name,
                marks: subject.marks,
                total_marks: subject.total_marks,
              }));
              const transformedEntry = {
                id: studentData.id,
                classname: className,
                studentname: studentName,
                subjects: subjects,
              };
              transformedTableRows.push(transformedEntry);
            }
          }
          setTableRows(transformedTableRows);
        } else {
          // console.error("No student_results found in the response.");
        }
      })
      .catch((err) => {
        // console.error("API Request Error:", err);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${baseURL}/studentresult/${id}`)
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          Setrefresh(!refresh);
          setAlertContent("Student deleted successfully.");
          setSeverity("success");
        } else {
          setAlertContent("Failed to delete student.");
          setSeverity("error");
        }
        setAlertOpen(true);
      })
      .catch((error) => {
        // Handle error
        // console.error(error);
        setAlertContent("Failed to delete student.");
        setSeverity("error");
        setAlertOpen(true);
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
        <CSHeading Heading={"Result Section"} Tagline={"Edit Result"} />
      </Box>
      <Box sx={{ border: "1.8px solid #7b0c0d", borderRadius: 5, p: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
                label="Student name"
                size="small"
                required={true}
                value={model.student_name || ""}
                onChange={(e) =>
                  setModel({ ...model, student_name: e.target.value })
                }
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ pt: 1.5 }}>
            {subjectArray.map((subject, index) => (
              <Grid container spacing={2} sx={{ p: 1.5 }} key={index}>
                <Grid item md={4}>
                  <CSTextField
                    label="Subject name"
                    size="small"
                    required={true}
                    value={subject.subject_name || ""}
                    onChange={(e) =>
                      handleSubjectChange(index, "subject_name", e.target.value)
                    }
                  />
                </Grid>
                <Grid item md={4}>
                  <CSTextField
                    label="Marks"
                    size="small"
                    required={true}
                    value={subject.marks || ""}
                    onChange={(e) =>
                      handleSubjectChange(index, "marks", e.target.value)
                    }
                  />
                </Grid>
                <Grid item md={4}>
                  <CSTextField
                    label="Total Marks"
                    size="small"
                    required={true}
                    value={subject.total_marks || ""}
                    onChange={(e) =>
                      handleSubjectChange(index, "total_marks", e.target.value)
                    }
                  />
                </Grid>
              </Grid>
            ))}
            <Grid item md={12}>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <CSButton
                  label="Add Subject"
                  startIcon={<AddCircleIcon />}
                  onClick={handleAddSubject}
                  fullwidth
                  color={"success"}
                />
              </Box>
            </Grid>
          </Grid>

          <Button type="submit" variant="outlined" color="success" startIcon={<SendIcon/>}>
            Submit Data
          </Button>
        </form>
      </Box>
      <Box sx={{ paddingY: 3 }}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <StudentResultTable
              columns={tableColumns}
              rows={tableRows}
              onDelete={handleDelete}
              rowsPerPage={10}
            />
          </Grid>
        </Grid>
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
