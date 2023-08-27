"use client"
import CSHeading from '@Components/CSHeading'
import CustomCard from '@Components/CustomCard';
import baseURL from '@Config/baseURL';
import { Box } from '@mui/material'
import axios from 'axios';
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const ReviewCarousel = dynamic(
    () => import("../../../Components/ReviewCarousel"),
    { ssr: false }
    );
export default function Page() {
  const [NewsData, SetNewsData] = useState('')
  let getData = () => {
    axios.get(`${baseURL}/news`)
      .then((response) => {
        SetNewsData(response.data.news)
      })
      .catch((err) => { });
  };
  useEffect(() => { getData() }, [])
  return (
    <div>
         <Box sx={{ p: 2, pt: 8 }}>
        <CSHeading Heading={"News"} />
      </Box>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {Array.isArray(NewsData) && <CustomCard Data={NewsData} />}
      </Box>
      <Box sx={{ p: 1 }}>
        <ReviewCarousel />
      </Box>
    </div>
  )
}
