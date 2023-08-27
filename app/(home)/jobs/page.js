"use client"
import CSHeading from '@Components/CSHeading'
import CustomCard from '@Components/CustomCard';
import baseURL from '@Config/baseURL';
import { Box, Typography } from '@mui/material'
import axios from 'axios';
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const ReviewCarousel = dynamic(
    () => import("../../../Components/ReviewCarousel"),
    { ssr: false }
    );
export default function Page() {
  const [JobsData, SetJobsData] = useState('')
  // console.log(JobsData)
  let getData = () => {
    axios.get(`${baseURL}/jobs`)
      .then((response) => {
        SetJobsData(response.data.jobs)
      })
      .catch((err) => { });
  };
  useEffect(() => { getData() }, [])
  return (
    <div>
         <Box sx={{ p: 2, pt: 8 }}>
        <CSHeading Heading={"Jobs"} />
      </Box>
      {JobsData && JobsData.length > 0 ? (
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {Array.isArray(JobsData) && <CustomCard Data={JobsData} />}
        </Box>
      ):(
   <Box>
   <Typography textAlign={'center'}>No Jobs available yet</Typography>
 </Box>
      )}
   
      <Box sx={{ p: 1 }}>
        <ReviewCarousel />
      </Box>
    </div>
  )
}
