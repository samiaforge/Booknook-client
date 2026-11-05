import { Suspense } from "react";
import BookDetailsPage from "./BookDetailsPage";


const DetailsPage = () => {
  return (
    <Suspense
      fallback={
        <p className="bg-[#101714] py-20 text-center text-white">
          Loading book details...
        </p>
      }
    >
      <BookDetailsPage/>
    </Suspense>
  );
};

export default DetailsPage;