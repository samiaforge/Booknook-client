"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const BookDetailsPage = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/books/${id}`
        );

        const data = await response.json();

        if (response.ok) {
          setBook(data);
        }
      } catch (error) {
        console.log("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  if (loading) {
    return (
      <p className="bg-[#101714] py-20 text-center text-white">
        Loading book details...
      </p>
    );
  }

  if (!book) {
    return (
      <div className="bg-[#101714] py-20 text-center text-white">
        <h2 className="text-2xl font-bold">Book Not Found</h2>
        <Link href="/books" className="mt-5 inline-block text-[#f6e262]">
          Back to All Books
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#101714] px-4 py-16 text-white md:px-10 lg:px-20">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-xl border border-white/10 bg-[#19231E] p-6 md:grid-cols-2 md:p-10">

        <div>
          <img
            src={book.image}
            alt={book.title}
            className="mx-auto h-[450px] w-full rounded-lg object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-3 font-semibold text-[#f6e262]">
            {book.category}
          </p>

          <h1 className="font-serif text-3xl font-bold md:text-4xl">
            {book.title}
          </h1>

          <p className="mt-4 text-gray-400">By {book.author}</p>

          <div className="my-6 h-px bg-white/10"></div>

          <h2 className="mb-3 text-lg font-semibold">About This Book</h2>

          <p className="leading-7 text-gray-400">
            {book.description}
          </p>

          <div className="mt-8 space-y-3 text-sm">
            <p>
              <span className="text-gray-400">Total Copies:</span>{" "}
              {book.totalCopies}
            </p>

            <p>
              <span className="text-gray-400">Available Copies:</span>{" "}
              {book.availableCopies}
            </p>

            <p>
              <span className="text-gray-400">Added By:</span>{" "}
              {book.addedBy?.name}
            </p>
          </div>

          <button
            disabled={book.availableCopies === 0}
            className="mt-8 rounded-lg bg-[#f6e262] px-6 py-3 font-bold text-[#101714] transition hover:bg-[#e8d44f] disabled:cursor-not-allowed disabled:bg-gray-500"
          >
            {book.availableCopies > 0 ? "Borrow Book" : "Not Available"}
          </button>

        </div>
      </div>
    </main>
  );
};

export default BookDetailsPage;