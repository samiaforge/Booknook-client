"use client";

import PrivateRoute from "@/components/PrivateRoute";
import { useState } from "react";

const AddBookPage = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    category: "",
    image: "",
    description: "",
    totalCopies: "",
  });




const handleSubmit = async (e) => {
  e.preventDefault();

  const newBook = {
    ...bookData,
    addedBy: {
      name: "Test User",
      email: "test@example.com",
    },
  };

  try {
    const response = await fetch("http://localhost:5000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Book Added Successfully!");

      setBookData({
        title: "",
        author: "",
        category: "",
        image: "",
        description: "",
        totalCopies: "",
      });
    } else {
      alert(data.message || "Failed to add book");
    }
  } catch (error) {
    console.error("Error adding book:", error);
  }
};




  return (
    <PrivateRoute>
    <section className="min-h-screen bg-[#101714] px-4 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#f6e262]">
            BookNook Library
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">Add a New Book</h1>
          <p className="mt-3 text-gray-400">
            Share your favorite books with our reading community.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-white/10 bg-[#19231E] p-6 shadow-xl md:p-8">
          {/* Book Title */}
          <div>
            <label className="mb-2 block text-sm font-medium">Book Title</label>
            <input
              type="text"
              placeholder="Enter book title"
              value={bookData.title}
              onChange={(e) =>
                setBookData({
                  ...bookData,
                  title: e.target.value,
                })
              }
              className="w-full rounded-lg border border-white/10 bg-[#101714] px-4 py-3 text-white outline-none focus:border-[#f6e262]"
            />
          </div>

          {/* Author and Category */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Author</label>
              <input
                type="text"
                placeholder="Enter author name"
                value={bookData.author}
                onChange={(e) =>
                  setBookData({
                    ...bookData,
                    author: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-white/10 bg-[#101714] px-4 py-3 outline-none focus:border-[#f6e262]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Category</label>
              <select
                value={bookData.category}
                onChange={(e) =>
                  setBookData({
                    ...bookData,
                    category: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-white/10 bg-[#101714] px-4 py-3 text-gray-300 outline-none focus:border-[#f6e262]"
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Fiction">Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Kids">Kids</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Book Image URL
            </label>
            <input
              type="text"
              placeholder="Paste uploaded image URL"
              value={bookData.image}
              onChange={(e) =>
                setBookData({
                  ...bookData,
                  image: e.target.value,
                })
              }
              className="w-full rounded-lg border border-white/10 bg-[#101714] px-4 py-3 outline-none focus:border-[#f6e262]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Short Description
            </label>
            <textarea
              rows="4"
              placeholder="Write a short description about the book..."
              value={bookData.description}
              onChange={(e) =>
                setBookData({
                  ...bookData,
                  description: e.target.value,
                })
              }
              className="w-full resize-none rounded-lg border border-white/10 bg-[#101714] px-4 py-3 outline-none focus:border-[#f6e262]"
            />
          </div>

          {/* Total Copies */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Total Copies
            </label>
            <input
              type="number"
              min="1"
              placeholder="Enter total copies"
              value={bookData.totalCopies}
              onChange={(e) =>
                setBookData({
                  ...bookData,
                  totalCopies: e.target.value,
                })
              }
              className="w-full rounded-lg border border-white/10 bg-[#101714] px-4 py-3 outline-none focus:border-[#f6e262]"
            />
          </div>

          {/* Added By */}
          <div className="grid gap-6 rounded-xl border border-white/10 bg-[#101714] p-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Added By
              </label>
              <input
                type="text"
                value="Loading user..."
                readOnly
                className="w-full rounded-lg border border-white/10 bg-[#19231E] px-4 py-3 text-gray-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                User Email
              </label>
              <input
                type="email"
                value="Loading email..."
                readOnly
                className="w-full rounded-lg border border-white/10 bg-[#19231E] px-4 py-3 text-gray-400"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#f6e262] py-3 font-bold text-[#101714] transition hover:bg-[#f6e262]"
          >
            Add Book
          </button>
        </form>
      </div>
    </section>
    </PrivateRoute>
  );
};

export default AddBookPage;
