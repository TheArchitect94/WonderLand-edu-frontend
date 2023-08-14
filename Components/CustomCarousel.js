import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typography, styled } from "@mui/material";

const CarouselItem = styled("div")(({ windowHeight }) => ({
  position: "relative",
  backgroundColor: "#000",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: windowHeight * 0.75, // Set carousel height to 75% of the window height
}));

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const CarouselText = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  zIndex: 1,
});

const Title = styled(Typography)({
  color: "#fff",
  fontSize: "24px",
  margin: 0,
});

const Content = styled(Typography)({
  color: "#fff",
  fontSize: "16px",
  margin: 0,
});

const CustomCarousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    handleResize(); // Initialize the dimensions on mount

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [slides, isHovered]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div style={{ position: "relative", zIndex: 0 }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
       {Array.isArray(slides) && slides.length > 0 ? (
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        autoPlay={!isHovered}
        infiniteLoop={true}
        selectedItem={currentSlide}
        onChange={handleSlideChange}
      >
        {slides.map((slide, index) => (
          <CarouselItem key={index} windowHeight={windowHeight}>
            <Image src={slide.image_url} alt={slide.alt} />
            <CarouselText>
              <Title variant="h4">{slide.title}</Title>
              <Content variant="h6">{slide.description}</Content>
            </CarouselText>
          </CarouselItem>
        ))}
      </Carousel>
        ) : (
          <div>  <CarouselItem  windowHeight={windowHeight}>
          <Image src={"https://i.pinimg.com/564x/96/77/06/9677067d94568773e488b57e62d93516.jpg"} alt={"Default slide"} />
          <CarouselText>
            <Title variant="h4">{"Default Slide"}</Title>
            <Content variant="h6">{"Default slide"}</Content>
          </CarouselText>
        </CarouselItem></div>
        )}
      </div>
    );
  
};

export default CustomCarousel;
