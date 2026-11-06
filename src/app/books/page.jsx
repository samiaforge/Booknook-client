"use client";

import { useEffect, useState } from "react";
import Link from "next/link";




const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://booknook-server-tawny.vercel.app/books"
        );

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.log("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#101714] px-4 py-16 text-white md:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {loading ? (
          <p className="py-20 text-center text-white">Loading books...</p>
        ) : (
          <>
            <div className="mb-12 text-center">
              <h1 className="font-serif text-3xl font-bold md:text-3xl">
                All Books
              </h1>

              <p className="mt-4 text-gray-400">
                Explore our collection and find your next favorite book.
              </p>
            </div>

            <div className="mb-10 flex flex-col gap-4 md:flex-row">
              <input
                type="text"
                placeholder="Search by book title or author..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-[#19231E] px-5 py-3 text-white outline-none focus:border-[#f6e262]"
              />

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-white/10 bg-[#19231E] px-5 py-3 text-white outline-none focus:border-[#f6e262]"
              >
                <option value="All">All Categories</option>
                <option value="Fiction">Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Kids">Kids</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {filteredBooks.length === 0 ? (
              <p className="py-16 text-center text-gray-400">
                No books found.
              </p>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredBooks.map((book) => (
                  <div
                    key={book._id}
                    className="overflow-hidden rounded-xl border border-white/10 bg-[#19231E]"
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

                      <h2 className="text-xl font-bold">{book.title}</h2>

                      <p className="mt-2 text-sm text-gray-400">
                        By {book.author}
                      </p>

                      <Link
                        href={`/books/${book._id}`}
                        className="mt-5 block rounded-lg bg-[#f6e262] py-3 text-center font-semibold text-[#101714] transition hover:bg-[#e8d44f]"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default BooksPage;