"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";

const BookDetailsPage = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [returnDate, setReturnDate] = useState("");


  const [borrowing, setBorrowing] = useState(false);
const [borrowMessage, setBorrowMessage] = useState("");




const handleBorrow = async () => {
  console.log("Book ID:", id);


  try {
    setBorrowing(true);
    setBorrowMessage("");

    const response = await fetch("http://localhost:5000/borrows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId: id,
        userName: "Test User",
        userEmail: "test@example.com",
        returnDate: returnDate,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setBorrowMessage(data.message);
      return;
    }

    setShowBorrowModal(false);
    setReturnDate("");

    // Refresh book information
    const updatedResponse = await fetch(
      `http://localhost:5000/books/${id}`
    );

    const updatedBook = await updatedResponse.json();
    setBook(updatedBook);

    setBorrowMessage("Book borrowed successfully!");

  } catch (error) {
    console.log("Borrow Error:", error);
    setBorrowMessage("Something went wrong!");
  } finally {
    setBorrowing(false);
  }
};



  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/books/${id}`);

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
    <PrivateRoute>
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
          <p className="mb-3 font-semibold text-[#f6e262]">{book.category}</p>

          <h1 className="font-serif text-3xl font-bold md:text-4xl">
            {book.title}
          </h1>

          <p className="mt-4 text-gray-400">By {book.author}</p>

          <div className="my-6 h-px bg-white/10"></div>

          <h2 className="mb-3 text-lg font-semibold">About This Book</h2>

          <p className="leading-7 text-gray-400">{book.description}</p>

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
            onClick={() => setShowBorrowModal(true)}
            disabled={book.availableCopies === 0}
            className="mt-8 rounded-lg bg-[#f6e262] px-6 py-3 font-bold text-[#101714] transition hover:bg-[#e8d44f] disabled:cursor-not-allowed disabled:bg-gray-500"
          >
            {book.availableCopies > 0 ? "Borrow Book" : "Not Available"}
          </button>
        </div>
      </div>
      {showBorrowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#19231E] p-6">
            <h2 className="mb-5 text-2xl font-bold">Borrow This Book</h2>

            <p className="mb-4 text-gray-400">{book.title}</p>

            <label className="mb-2 block text-sm">Return Date</label>

            <input
              type="date"
              value={returnDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#101714] p-3 text-white"
            />

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowBorrowModal(false)}
                className="w-1/2 rounded-lg border border-white/20 py-3"
              >
                Cancel
              </button>

              <button
  onClick={handleBorrow}
  disabled={!returnDate || borrowing}
  className="w-1/2 rounded-lg bg-[#f6e262] py-3 font-bold text-[#101714] disabled:opacity-50"
>
  {borrowing ? "Borrowing..." : "Confirm Borrow"}
</button>
            </div>
          </div>
        </div>
      )}
    </main>
    </PrivateRoute>
  );
};

export default BookDetailsPage;
