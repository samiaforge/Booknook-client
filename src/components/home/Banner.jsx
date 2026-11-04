
"use client";

import dynamic from "next/dynamic";

const BannerSlider = dynamic(
  () => import("./BannerSlider"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[480px] bg-[#0D1917] md:min-h-[600px]" />
    ),
  }
);

const Banner = () => {
  return <BannerSlider />;
};

export default Banner;
