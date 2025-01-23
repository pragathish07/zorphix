"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './carousel.css'

const images = [
  "event1.jpg",
  "event2.jpg",
  "event3.jpg",
  "event4.jpg",
  "event5.jpg",
  "event10.jpg",
  "event12.jpg",
  "event13.jpg",
  "event14.jpg",
  "event15.jpg",
];

const CarouselComponent: React.FC = () => {
  return (
    <div className="carousel_container">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="carousel"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img className="carousel_image" src={`/img/eventphotos/${img}`} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselComponent;
