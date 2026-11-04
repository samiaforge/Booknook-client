
"use client";

import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Banner slide data
const slides = [
  {
    id: 1,
    image: "/images/banner 1.jpeg",
    subtitle: "WELCOME TO BOOKNOOK",
    title: "Discover Your Next Favorite Book",
    description:
      "Explore a world of stories, knowledge and imagination. Your next great read is waiting for you.",
  },
  {
    id: 2,
    image: "/images/banner 2.jpeg",
    subtitle: "A WORLD OF STORIES",
    title: "Find Your Perfect Reading Escape",
    description:
      "From timeless classics to exciting new stories, find books that inspire your imagination.",
  },
  {
    id: 3,
    image: "/images/banner 3.jpeg",
    subtitle: "READ. BORROW. REPEAT.",
    title: "Every Book Opens a New Journey",
    description:
      "Discover amazing books, borrow your favorites and make reading a part of your everyday life.",
  },
];

const BannerSlider = () => {
  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="banner-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative flex min-h-[480px] items-center bg-cover bg-center px-6 py-16 md:min-h-[600px] md:px-16 lg:px-24"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(13,25,23,0.96), rgba(13,25,23,0.65), rgba(13,25,23,0.2)), url("${slide.image}")`,
              }}
            >
              <div className="relative z-10 max-w-2xl">
                <p className="mb-5 text-xs font-semibold tracking-[3px] text-[#f6e262] md:text-sm md:tracking-[4px]">
                  {slide.subtitle}
                </p>

                <h1 className="font-serif text-4xl font-bold leading-tight text-[#F3EFE4] md:text-6xl">
                  {slide.title}
                </h1>

                <p className="mt-6 max-w-xl text-sm leading-7 text-[#B8C5B5] md:text-base">
                  {slide.description}
                </p>

                <Link
                  href="/books"
                  className="mt-8 inline-flex items-center gap-3 rounded-md bg-[#f6e262] px-7 py-3 font-semibold text-[#0D1917] transition hover:bg-[#f6e262]"
                >
                  Browse Books
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BannerSlider;
