"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Chip, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CSHeading from '@Components/CSHeading';
import baseURL from '@Config/baseURL';
import dynamic from "next/dynamic";
const ReviewCarousel = dynamic(
  () => import("../../../Components/ReviewCarousel"),
  { ssr: false }
);
export default function TimetablePage() {
  const [grades, setGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('Grade 1'); // Default to Grade 1
  const [days, setDays] = useState([]);
  const [timetable, setTimetable] = useState({});

  const fetchTimetable = async () => {
    try {
      const response = await axios.get(`${baseURL}/timetable`);
      const timetableData = response.data.timetable;
      // console.log('Fetched Timetable:', timetableData);
      setTimetable(timetableData);
      setGrades(Object.keys(timetableData));
      setDays(Object.keys(timetableData[selectedGrade])); // Set days based on the default selected grade
    } catch (error) {
      // console.error('Error fetching timetable:', error);
    }
  };

  const handleGradeSelect = (grade) => {
    // console.log('Selected Grade:', grade);
    setSelectedGrade(grade);
    setDays(Object.keys(timetable[grade]));
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

  // Determine the maximum number of periods for any day and grade
  const maxPeriods = days.reduce((max, day) => {
    const numPeriods = timetable[selectedGrade][day].length;
    return Math.max(max, numPeriods);
  }, 0);

  return (
    <div>
      <Box sx={{ p: 2, pt: 8 }}>
        <CSHeading Heading={'School Timetable'} />
      </Box>
      <Box>
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
          <Grid item md={12}>
            <Box sx={{ p: 2 }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Period</TableCell>
                      {days.map((day, index) => (
                        <TableCell key={index}>{day}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.from({ length: maxPeriods }, (_, period) => (
                      <TableRow key={period}>
                        <TableCell>{`Period ${period + 1}`}</TableCell>
                        {days.map((day, index) => {
                          const periodExists = period < timetable[selectedGrade][day].length;
                          return (
                            <TableCell key={index}>
                              {periodExists ? (
                                <>
                                  {timetable[selectedGrade][day][period].subject}
                                  <br />
                                  {`${timetable[selectedGrade][day][period].start_time || '-'} - ${
                                    timetable[selectedGrade][day][period].end_time || '-'
                                  }`}
                                </>
                              ) : (
                                '---'
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ p: 1 }}>
        <ReviewCarousel />
      </Box>
    </div>
  );
}
