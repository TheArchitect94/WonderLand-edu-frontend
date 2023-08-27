"use client";
import CSHeading from "@Components/CSHeading";
import { Box, Grid } from "@mui/material";
import CSTable from "@Components/CSTable";
import React, { useEffect, useState } from "react";
import axios from "axios";
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


  const tableColumns = [
    { id: "id", label: "ID" },
    { id: "student_name", label: "Student Name" },
    { id: "previous_class", label: "Previous Class" },
    { id: "previous_school", label: "Previous School" },
    { id: "apply_class", label: "Apply Class" },
    { id: "religion", label: "Religion" },
    { id: "gender", label: "Gender" },
    { id: "place_of_birth", label: "Place of Birth" },
    { id: "date_of_birth", label: "Date of Birth" },
    { id: "father_name", label: "Father Name" },
    { id: "father_cnic_no", label: "Father CNIC No" },
    { id: "father_cell_no", label: "Father Cell No" },
    { id: "father_whatsapp_no", label: "Father Whatsapp No" },
    { id: "father_email", label: "Father Email" },
    { id: "father_education", label: "Father Education" },
    { id: "father_occupation", label: "Father Occupation" },
    { id: "mother_name", label: "Mother Name" },
    { id: "mother_cnic_no", label: "Mother CNIC No" },
    { id: "mother_cell_no", label: "Mother Cell No" },
    { id: "mother_whatsapp_no", label: "Mother Whatsapp No" },
    { id: "mother_email", label: "Mother Email" },
    { id: "mother_education", label: "Mother Education" },
    { id: "mother_occupation", label: "Mother Occupation" },
    { id: "guardian_name", label: "Guardian Name" },
    { id: "guardian_cnic_no", label: "Guardian CNIC No" },
    { id: "guardian_cell_no", label: "Guardian Cell No" },
    { id: "guardian_whatsapp_no", label: "Guardian Whatsapp No" },
    { id: "guardian_email", label: "Guardian Email" },
    { id: "guardian_education", label: "Guardian Education" },
    { id: "guardian_occupation", label: "Guardian Occupation" },
    { id: "address", label: "Address" },
    { id: "postal_code", label: "Postal Code" },
    { id: "created_at", label: "Created At" },
  ];
  


  let getData = () => {
    axios
      .get(`${baseURL}/admissionform`)
      .then((response) => {
        // console.log(response)
        setTableRows(response.data.admission_forms);
      })
      .catch((err) => {});
  };

  // Function to handle the delete button click
  const handleDelete = (id) => {
    axios.delete(`${baseURL}/admissionform/${id}`).then((response) => {
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
        <CSHeading
          Heading={"AdmissionForm Section"}
          Tagline={"See Student forms"}
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
