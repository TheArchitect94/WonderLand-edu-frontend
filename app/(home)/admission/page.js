"use client";

const ReviewCarousel = dynamic(
  () => import("../../../Components/ReviewCarousel"),
  { ssr: false }
);
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Alert, Button, Grid, Snackbar, TextField } from "@mui/material";
import CSTextField from "@Components/CSTextField";
import CSDropDown from "@Components/CSDropDown";
import dynamic from "next/dynamic";
import CSHeading from "@Components/CSHeading";
import axios from "axios";
import baseURL from "@Config/baseURL";
const steps = [
  "Student Details",
  "Father Details",
  "Mother Details",
  "Guardian Details",
  "Other Details",
];
const StudentDetails = ({ model, setModel }) => {
  return (
    <div>
      <Box>
        <form>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <CSTextField
                size="small"
                required={true}
                label="Student Name"
                onChange={(e) =>
                  setModel({ ...model, student_name: e.target.value })
                }
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                size="small"
                required={true}
                label="Previouse class"
                onChange={(e) =>
                  setModel({ ...model, previous_class: e.target.value })
                }
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                size="small"
                required={true}
                label="Previous School"
                onChange={(e) =>
                  setModel({ ...model, previous_school: e.target.value })
                }
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, apply_class: e.target.value })
                }
                size="small"
                required={true}
                label="Apply Class"
                //    variant='standard'
              />
            </Grid>

            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, religion: e.target.value })
                }
                size="small"
                required={true}
                label="Religion"
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6} sx={{ mt: 0.4 }}>
              <CSDropDown
                label="Select Gender"
                // value={model.course}
                onChange={(e) => setModel({ ...model, gender: e.target.value })}
                required={true}
                disabled={false}
                options={[
                  { id: "male", name: "Male" },
                  { id: "female", name: "Female" },
                  { id: "other", name: "Other" },
                ]}
                displayField="name"
                valueField="id"
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, place_of_birth: e.target.value })
                }
                size="small"
                required={true}
                label="Place of Birth"
                //    variant='standard'
              />
            </Grid>

            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, date_of_birth: e.target.value })
                }
                size="small"
                required={true}
                label="Date of Birth"
                type="date"
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

const FatherDetails = ({ model, setModel }) => {
  return (
    <div>
      <form>
        <Box>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, father_name: e.target.value })
                }
                size="small"
                required={true}
                label="Father name"
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, father_cnic_no: e.target.value })
                }
                size="small"
                required={true}
                label="Cnic no"
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, father_cell_no: e.target.value })
                }
                size="small"
                required={true}
                label="Cell no"
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, father_whatsapp_no: e.target.value })
                }
                size="small"
                required={true}
                label="Whatsapp no"
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, father_email: e.target.value })
                }
                size="small"
                required={true}
                label="Email id"
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, father_education: e.target.value })
                }
                size="small"
                required={true}
                label="Education"
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, father_occupation: e.target.value })
                }
                size="small"
                required={true}
                label="Occupation"
                //    variant='standard'
              />
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};

const MotherDetails = ({ model, setModel }) => {
  return (
    <div>
      <form>
        <Box>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, mother_name: e.target.value })
                }
                size="small"
                required={true}
                label="Mother name"
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, mother_cnic_no: e.target.value })
                }
                size="small"
                required={true}
                label="Cnic no"
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, mother_cell_no: e.target.value })
                }
                size="small"
                required={true}
                label="Cell no"
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, mother_education: e.target.value })
                }
                size="small"
                required={true}
                label="Education"
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, mother_whatsapp_no: e.target.value })
                }
                size="small"
                required={true}
                label="Whatsapp no"
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, mother_email: e.target.value })
                }
                size="small"
                required={true}
                label="Email id"
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, mother_occupation: e.target.value })
                }
                size="small"
                required={true}
                label="Occupation"
                //    variant='standard'
              />
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};

const GuardianDetails = ({ model, setModel }) => {
  return (
    <div>
      <form>
        <Box>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, guardian_name: e.target.value })
                }
                size="small"
                label="Guardian name"
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, guardian_cnic_no: e.target.value })
                }
                size="small"
                label="Cnic no"
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, guardian_cell_no: e.target.value })
                }
                size="small"
                label="Cell no"
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, guardian_whatsapp_no: e.target.value })
                }
                size="small"
                label="Whatsapp no"
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, guardian_email: e.target.value })
                }
                size="small"
                label="Email id"
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, guardian_education: e.target.value })
                }
                size="small"
                label="Education"
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, guardian_occupation: e.target.value })
                }
                size="small"
                label="Occupation"
                //    variant='standard'
              />
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};

const OtherDetails = ({ model, setModel }) => {
  return (
    <div>
      <form>
        <Box>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, address: e.target.value })
                }
                size="small"
                required={true}
                label="Address"
                //    variant='standard'
              />
            </Grid>
            <Grid item md={6}>
              <CSTextField
                onChange={(e) =>
                  setModel({ ...model, postal_code: e.target.value })
                }
                size="small"
                required={true}
                label="Postal Code"
                //    variant='standard'
              />
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};
const Page = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [Severity, setSeverity] = useState("error");
  const [model, setModel] = useState({});
  const totalSteps = () => {
    return steps.length;
  };
  const SendData = () => {
    // console.log("Model data:", model);
    axios
      .post(`${baseURL}/admissionform`, model)
      .then((response) => {
        // console.log(response, "response");
        if (response.status === 201) {
          setAlertContent(response.data.message);
          setSeverity("success");
          setAlertOpen(true);
          setActiveStep(0);
          setCompleted(false);
        } else {
          setAlertContent(response.data.message);
          setSeverity("warning");
          setAlertOpen(true);
            setActiveStep(0);
          setCompleted(false);
        }
      })
      .catch((error) => {
        // console.log(error, "Error");
        setAlertContent(error.response?.data?.message || "An error occurred");
        setSeverity("error");
        setAlertOpen(true);
        setActiveStep(0);
        setCompleted(false);
      });
  };

  const handleNext = () => {
    if (activeStep === totalSteps() - 1) {
      setCompleted(true);
      SendData();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(false);
  };

  const handleStepClick = (step) => {
    setActiveStep(step);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    SendData();
  };
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const renderFormStep = (step) => {
    switch (step) {
      case 0:
        return <StudentDetails model={model} setModel={setModel} />;
      case 1:
        return <FatherDetails model={model} setModel={setModel} />;
      case 2:
        return <MotherDetails model={model} setModel={setModel} />;
      case 3:
        return <GuardianDetails model={model} setModel={setModel} />;
      case 4:
        return <OtherDetails model={model} setModel={setModel} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: 0, margin: 0 }}>
      <Box sx={{ p: 2, pt: 8 }}>
        <CSHeading Heading={"Admissions"} />
      </Box>
      <Box
        sx={{
          //   mt: ,
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
            [theme.breakpoints.down("sm")]: {
              m: 2,
            },
          }}
        >
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label} onClick={() => handleStepClick(index)}>
                <StepLabel StepIconProps={{ style: { color: "#7b0c0d" } }}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {completed ? null : (
              <div>
                <Typography
                  sx={{
                    mt: 2,
                    mb: 1,
                    py: 1,
                    fontSize: { xs: "12px", md: "inherit" },
                  }}
                >
                  {steps[activeStep]}
                </Typography>
                {renderFormStep(activeStep)}
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1, backgroundColor: "#7b0c0d", color: "white" }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button
                    onClick={handleNext}
                    sx={{ mr: 1, backgroundColor: "#7b0c0d", color: "white" }}
                  >
                    {activeStep === totalSteps() - 1 ? "Submit Form" : "Next"}
                  </Button>
                </Box>
              </div>
            )}
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
        </Box>
      </Box>
      <Box sx={{ p: 1 }}>
        <ReviewCarousel />
      </Box>
    </div>
  );
};

export default Page;
