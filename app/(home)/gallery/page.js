"use client"
import CSHeading from '@Components/CSHeading'
import baseURL from '@Config/baseURL';
import { Box, Grid, Typography } from '@mui/material'
import axios from 'axios';
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const ReviewCarousel = dynamic(
  () => import("../../../Components/ReviewCarousel"),
  { ssr: false }
);

export default function Page() {
  const [ImageData, SetImageData] = useState('')
  // console.log(ImageData, "Data")

  let getData = () => {
    axios
      .get(`${baseURL}/imagegallery`)
      .then((response) => {
        SetImageData(response.data.images)
      })
      .catch((err) => { });
  };

  useEffect(() => { getData() }, [])

  return (
    <div>
      <Box sx={{ p: 2, pt: 8 }}>
        <CSHeading Heading={"Gallery"} />
      </Box>
      {ImageData.length > 0 ? (
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <Grid container spacing={0} justifyContent="center">
            {ImageData.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <img
                  src={image.image_url}
                  alt={`Image ${index + 1}`}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box sx={{ textAlign: "center", p: 4 }}>
          <Typography>No Images yet</Typography>
        </Box>
      )}
      <Box sx={{ p: 1 }}>
        <ReviewCarousel />
      </Box>
    </div>
  )
}
