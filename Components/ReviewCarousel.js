"use client"
import { Avatar, Box, Rating, Typography } from '@mui/material';
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const ReviewCarousel = () => {
  const reviews = [
    {
      id: 1,
      avatar: 'https://i.pinimg.com/236x/1b/02/ef/1b02efda0ab3378dfd6319dc612f1995.jpg',
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, veritatis.',
      rating: 5,
      name:'xyz'
    },
    {
      id: 2,
      avatar: 'https://i.pinimg.com/236x/1b/02/ef/1b02efda0ab3378dfd6319dc612f1995.jpg',
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, veritatis.',
      rating: 4.5,
      name:'xyz'
    },
    {
      id: 3,
      avatar: 'https://i.pinimg.com/236x/1b/02/ef/1b02efda0ab3378dfd6319dc612f1995.jpg',
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, veritatis.',
      rating: 4.5,
      name:'xyz'
    },
    {
      id: 4,
      avatar: 'https://i.pinimg.com/236x/1b/02/ef/1b02efda0ab3378dfd6319dc612f1995.jpg',
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, veritatis.',
      rating: 4.5,
      name:'xyz'
    },
    {
      id: 5,
      avatar: 'https://i.pinimg.com/236x/1b/02/ef/1b02efda0ab3378dfd6319dc612f1995.jpg',
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, veritatis.',
      rating: 4.5,
      name:'xyz'
    },
  ];
  const renderReviews = () => {
    return reviews.map((review) => (
      <Box key={review.id} sx={{ p: 1 }}>
        <Box sx={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', p: 1, borderRadius: 5 }}>
          <Box
            sx={{
              borderRadius: 5,
              p: 1,
              border: 1,
              borderColor: 'crimson',
              transition: '0.3s ease',
              '&:hover': {
                backgroundColor: 'lightgray',
                transform: 'scale(1.05)',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m: 0, p: 0 }}>
              <Avatar
                alt={review.name}
                src={review.avatar}
                sx={{
                  mt: 1,
                  color: 'white',
                  border: '1.5px solid crimson',
                  borderRadius: '50%',
                }}
              />
            </Box>
            <Typography sx={{ fontSize: 14, textAlign: 'center' }}>{review.name}</Typography>
            <Typography sx={{ fontSize: 12, textAlign: 'center' }}>{review.content}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m: 0, p: 0 }}>
              <Rating name="simple-controlled" value={review.rating} readOnly precision={0.5} />
            </Box>
          </Box>
        </Box>
      </Box>
    ));
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <AliceCarousel
        mouseTracking
        items={renderReviews()}
        responsive={{
          0: { items: 1 },
          600: { items: 2 },
          1024: { items: 3 }, // Adjust the number of items displayed on larger screens
        }}
        controlsStrategy="responsive"
        autoPlay
        autoPlayInterval={3000}
        infinite
        disableButtonsControls={true}
      />
    </Box>
  );
};

export default ReviewCarousel;