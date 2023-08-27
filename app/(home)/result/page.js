"use client"
import CSHeading from '@Components/CSHeading'
import { Box, Chip, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic";
import axios from 'axios';
import baseURL from '@Config/baseURL';
import StudentResultTable from '@Components/StudentResultTable';
const ReviewCarousel = dynamic(
  () => import("../../../Components/ReviewCarousel"),
  { ssr: false }
);

export default function Page() {
  const [tableRows, setTableRows] = useState([]);
  const [tableColumns, setTableColumns] = useState([
    { id: "classname", label: "Classname" },
    { id: "studentname", label: "Student Name" },
    { id: "subjects", label: "Subjects" },
  ]);
  const [grades, setGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('Grade 1'); // Default to Grade 1

  const getData = async () => {
    try {
      const response = await axios.get(`${baseURL}/studentresult`);
      const responseData = response.data;
      if (responseData.student_results) {
        const transformedTableRows = [];
        for (const className in responseData.student_results) {
          for (const studentName in responseData.student_results[className]) {
            const studentData = responseData.student_results[className][studentName];
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
        setGrades(Object.keys(responseData.student_results));
      } else {
        // console.error("No student_results found in the response.");
      }
    } catch (err) {
      // console.error("API Request Error:", err);
    }
  };

  const handleGradeSelect = (grade) => {
    // console.log('Selected Grade:', grade);
    setSelectedGrade(grade);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
         <Box sx={{ p: 2, pt: 8 }}>
        <CSHeading Heading={'Result'} />
      </Box>
      <Box sx={{ paddingY: 3 }}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Box sx={{ display: 'flex', justifyContent: 'normal', px: 4 }}>
              {grades.map((grade) => (
                <Chip
                  key={grade}
                  label={grade}
                  color={selectedGrade === grade ? 'primary' : 'default'}
                  onClick={() => handleGradeSelect(grade)}
                  sx={{ px: 1, mr: 1, color: "#fff", // Text color
                  bgcolor: selectedGrade === grade ? "#7b0c0d" : "#808080", // Background color
                  "&:hover": {
                    bgcolor: "#7b0c0d", // Background color on hover
                  },}}
                />
              ))}
            </Box>
          </Grid>
          <Grid item md={12}sx={{ paddingY: 3 }}>
            <StudentResultTable
              columns={tableColumns}
              rows={tableRows.filter(row => row.classname === selectedGrade)}
              rowsPerPage={10}
            />
          </Grid>
        </Grid>
      </Box>
         <Box sx={{ p: 1 }}>
        <ReviewCarousel />
      </Box>
    </div>
  )
}
