"use client";
import CustomCarousel from "@Components/CustomCarousel";
import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardContent,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import CsHeading from "@Components/CSHeading";
import CustomCard from "@Components/CustomCard";
import dynamic from 'next/dynamic';
import baseURL from "@Config/baseURL";
import { useEffect, useState } from "react";
import axios from "axios";
const ReviewCarousel = dynamic(() => import('../../Components/ReviewCarousel'), { ssr: false });



export default function Home() {
  const [SlideData, SetSlideData] = useState('')
  const [NewsData, SetNewsData] = useState('')
  // console.log(NewsData, "Data")
  let getData = () => {
    axios
      .get(`${baseURL}/slides`)
      .then((response) => {
        SetSlideData(response.data.slides)
      })
      .catch((err) => { });
    axios.get(`${baseURL}/news`)
      .then((response) => {
        const latestNews = response.data.news.slice(-4).reverse();
        SetNewsData(latestNews);
      })
      .catch((err) => { });
  };
  useEffect(() => { getData() }, [])
  const CampusCard = [
    {
      // image:
      //   "https://i.pinimg.com/564x/96/77/06/9677067d94568773e488b57e62d93516.jpg",
      title: "Card 1",
      description: "Content for Slide 1",
    },
    {
    //   image:
    //     "https://i.pinimg.com/564x/96/77/06/9677067d94568773e488b57e62d93516.jpg",
      title: "Card 2",
      description: "Content for Slide 1",
    },

  ];

  return (
    <div style={{ padding: 0, margin: 0 }}>
      {Array.isArray(SlideData) && <CustomCarousel slides={SlideData} />}
      <Box sx={{ p: 2 }}>
        <CsHeading Heading={'Announcements'} Tagline={'Latest News'} />
      </Box>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {Array.isArray(NewsData) && <CustomCard Data={NewsData} href='/news'/>}
      </Box>
      <Box sx={{ p: 2 }}>
        <CsHeading Heading={'Campuses'} Tagline={'Providing The Best Quality Of Education'} />
      </Box>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {Array.isArray(NewsData) && <CustomCard Data={CampusCard} />}
      </Box>
      <Box sx={{ p: 2 }}>
        <CsHeading Heading={'About Us'} Tagline={'Who we are'} />
      </Box>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={1}>
          <Grid item md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography >
              In 1982/83 an educational Society namely ” Society for Advancement of Learning in Pakistan” was registered under the membership of renowned Scholars and reputed educationists. We were and are deeply concerned and interested in the cause of education; extending all our efforts, energies and involving times towards capital investment on no proﬁt no loss basis.
            </Typography>
          </Grid>
          <Grid item md={6}>
            <img style={{ borderRadius: 25 }} width={'100%'} height={'90%'}  src="https://wonderland.edu.pk/school-children-dressed-uniform-have-fun-play-schoolyard.27388edbf5b6c225.jpg" alt="logo" />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ p: 2 }}>
        <CsHeading Heading={'Testimonials'} />
      </Box>
      <Box sx={{ p: 1 }}>
        <ReviewCarousel />
      </Box>
    </div>

  );
}
