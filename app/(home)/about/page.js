"use client";
import CSHeading from "@Components/CSHeading";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import dynamic from 'next/dynamic';
const ReviewCarousel = dynamic(() => import('../../../Components/ReviewCarousel'), { ssr: false });


export default function Page() {
  return (
    <div style={{ padding: 0, margin: 0 }}>
      <Box sx={{ p: 2, pt: 8 }}>
        <CSHeading Heading={"About us"} />
      </Box>

      <Box sx={{ p: 2 }}>
        <Grid container spacing={1}>
          <Grid
            item
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{fontSize:'15px'}}>
              In 1982/83 an educational Society namely ” Society for Advancement
              of Learning in Pakistan” was registered under the membership of
              renowned Scholars and reputed educationists. We were and are
              deeply concerned and interested in the cause of education;
              extending all our efforts, energies and involving times towards
              capital investment on no profit no loss basis. So we have been
              focusing to conceive a vision and new ways of learning: making
              easier and approachable of course matching with developed needs.
              We watch the ways & means to bring weaker students to the level of
              other average students; still to go ahead encouraging the
              intelligent students to be more creative, maintaining their mental
              level uprising. All above exercise is possible if teachers are
              able to pass on substantial skill; individual attention to the
              learners. This all is again practicable if teaching staff is well
              equipped with the science of modern teaching. We urge on all these
            </Typography>
          </Grid>
          <Grid item md={6}>
            <img
              style={{ borderRadius: 25 }}
              width={"100%"}
              height={"90%"}
              src="https://wonderland.edu.pk/wgs-about-us.27052524593c6d2b.jpg"
              alt="Students"
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ p: 1 }}>
       <ReviewCarousel/>
      </Box>
    </div>
  );
}
