import Banner from "@/components/home/Banner";
import HowItWorks from "@/components/home/HowItWorks";
import NewArrivals from "@/components/home/NewArrivals";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner/>
      <NewArrivals/>
      <HowItWorks/>
    </div>
  );
}
