
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NewArrivals = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/books?limit=6")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.log("Error fetching books:", error);
      });
  }, []);

  return (
    <section className="bg-[#101714] px-4 py-20 text-white md:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[2px] text-[#f6e262]">
            Explore Our Collection
          </p>

          <h2 className="font-serif text-2xl font-bold md:text-3xl">
            New Arrivals
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Discover the latest additions to our library and find your next
            favorite read.
          </p>
        </div>

        {/* Book Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div
              key={book._id}
              className="overflow-hidden rounded-xl border border-white/10 bg-[#19231E] transition duration-300 hover:-translate-y-2 hover:border-[#f6e262]/50"
            >
              <img
                src={book.image}
                alt={book.title}
                className="h-72 w-full object-cover"
              />

              <div className="p-5">
                <p className="mb-2 text-sm text-[#f6e262]">
                  {book.category}
                </p>

                <h3 className="text-xl font-bold">
                  {book.title}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  By {book.author}
                </p>

                <Link
                  href={`/books/${book._id}`}
                  className="mt-5 block w-full rounded-lg bg-[#f6e262] py-3 text-center font-semibold text-[#101714] transition hover:bg-[#e8d44f]"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* See All Books Button */}
        <div className="mt-12 text-center">
          <Link
            href="/books"
            className="inline-block rounded-lg border border-[#f6e262] px-8 py-3 font-semibold text-[#f6e262] transition hover:bg-[#f6e262] hover:text-[#101714]"
          >
            See All Books
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
