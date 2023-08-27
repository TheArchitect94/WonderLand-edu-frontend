"use client";
import CSHeading from "@Components/CSHeading";
import CSTable from "@Components/CSTable";
import baseURL from "@Config/baseURL";
import { Box, Chip, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
const ReviewCarousel = dynamic(
  () => import("../../../Components/ReviewCarousel"),
  { ssr: false }
);

export default function Page() {
  const tableColumns = [
    { id: "image_url", label: "Image" },
    { id: "class_name", label: "Classname" },
    { id: "book_description", label: "Description" },
    { id: "book_title", label: "Book Title" },
    { id: "book_price", label: "Price" },
  ];
  const [grades, setGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [booksByGrade, setBooksByGrade] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const fetchGrades = async () => {
    try {
      const response = await axios.get(`${baseURL}/booklist`);
      const grades = response.data.map((classData) => classData.classname);
      // console.log("Fetched Grades:", grades);
      setGrades(grades);
      setSelectedGrade(grades[0]);
    } catch (error) {
      // console.error("Error fetching grades:", error);
    }
  };

  const fetchBooksByGrade = async (grade) => {
    try {
      const response = await axios.get(`${baseURL}/booklist`);
      const booksData = response.data.find(
        (classData) => classData.classname === grade
      );
      // console.log("Books Data:", booksData);
      if (booksData) {
        setBooksByGrade(booksData.books);
      } else {
        setBooksByGrade([]);
      }
    } catch (error) {
      // console.error("Error fetching books by grade:", error);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []); // Fetch grades once when the component mounts

  useEffect(() => {
    // Fetch books when selectedGrade changes
    if (selectedGrade) {
      fetchBooksByGrade(selectedGrade);
    }
  }, [selectedGrade, refresh]);

  const handleGradeSelect = (grade) => {
    // console.log("Selected Grade:", grade);
    setSelectedGrade(grade);
  };

  return (
    <div>
      <Box sx={{ p: 2, pt: 8 }}>
        <CSHeading Heading={"Book Lists"} />
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Box sx={{ display: "flex", justifyContent: "normal", px: 4 }}>
              {grades.map((grade, index) => (
                <Chip
                
                  key={grade}
                  label={grade}
                  color={selectedGrade === grade ? "primary" : "default"}
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
                      {tableColumns.map((column) => (
                        <TableCell key={column.id}>{column.label}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {booksByGrade.map((book) => (
                      <TableRow key={book.book_title}>
                        {tableColumns.map((column) => (
                          <TableCell key={column.id}>
                            {column.id === "image_url" ? (
                              <img
                                src={book[column.id]}
                                alt={book.book_title}
                                width="80vw"
                                height="auto"
                              />
                            ) : (
                              book[column.id]
                            )}
                          </TableCell>
                        ))}
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
