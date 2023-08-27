// CustomCard.js
import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";

const CustomCard = ({ Data ,href}) => {
  const Image = styled("img")({
    width: "100%",
    height: "auto",
    objectFit: "cover",
  });
  return (
    <Grid container spacing={2} justifyContent="center">
      {Array.isArray(Data) && Data.length > 0 ? (
        Data.map((item, index) => (
          <Grid item md={3} key={index}>
            <a href={href}>
            <Card 
              sx={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                margin: "5px",
              }}
            >
              <Box sx={{ border: "1px solid crimson", padding: 1, margin: 1 }}>
                <CardContent sx={{ backgroundColor: "lightgray" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image src={item.image_url} alt="image" />
                  </Box>
                  <Typography
                    variant="h2"
                    component="h2"
                    sx={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 0.5,
                      textAlign: "center",
                      marginTop: 1.5,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Box sx={{ paddingX: 2 }}>
                    <hr
                      style={{ border: "1px solid crimson", margin: "10px 0" }}
                    />
                  </Box>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{
                      fontSize: 14,
                      color: "#4e4e4e",
                      textAlign: "center",
                      margin: "20px 0",
                    }}
                  >
                    {item.description.slice(0, 90) + '....'}
                  </Typography>
                  {item.joboffer && (
                    <Typography
                      variant="body1"
                      component="p"
                      sx={{
                        fontSize: 14,
                        color: "#4e4e4e",
                        textAlign: "center",
                        margin: "20px 0",
                      }}
                    >Job Offer: {item.joboffer}
                    </Typography>
                  )}
              {item.created_at && ( 
                    <Typography
                      variant="subtitle1"
                      component="p"
                      sx={{
                        fontSize: 14,
                        color: "#4e4e4e",
                        textAlign: "center",
                        margin: "5px 0",
                      }}
                    >
                      Date: {item.created_at.slice(0, 10)}
                    </Typography>
                  )}
                </CardContent>
              </Box>
            </Card>
            </a>
          </Grid>
        ))
      ) : (
        <Grid item md={3}>
          <Card
            sx={{
              width: "100%",
              maxWidth: "300px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              margin: "5px",
            }}
          >
            <Box sx={{ border: "1px solid crimson", padding: 1, margin: 1 }}>
              <CardContent sx={{ backgroundColor: "lightgray" }}>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 2,
                    textAlign: "center",
                  }}
                >
                  No Data Available
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default CustomCard;
