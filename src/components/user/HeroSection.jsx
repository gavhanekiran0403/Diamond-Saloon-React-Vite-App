import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css/bundle";      // ✅ Swiper core CSS
import "./hero.css";     // ✅ Your custom CSS

const HeroSection = () => {
  return (
    <section className="hero-section">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="hero-slider"
      >
        <SwiperSlide>
          <div className="hero-slide hero-slide--1">
            <h1>Welcome to Diamond Solution</h1>
            <p>Premium salon services for men and women.</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="hero-slide hero-slide--2">
            <h1>Style That Defines You</h1>
            <p>Modern grooming & beauty experience.</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="hero-slide hero-slide--3">
            <h1>Look Sharp. Feel Confident.</h1>
            <p>Expert stylists. Premium care.</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default HeroSection;
