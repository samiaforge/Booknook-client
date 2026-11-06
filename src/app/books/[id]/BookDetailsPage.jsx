
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import PrivateRoute from "@/components/PrivateRoute";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/get-token-client";

const API_URL = "https://booknook-server-tawny.vercel.app";

const BookDetailsPage = () => {
  const { id } = useParams();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [returnDate, setReturnDate] = useState("");

  const [borrowing, setBorrowing] = useState(false);

  // Fetch Book Details
  useEffect(() => {
    if (isPending) return;

    let isMounted = true;

    const fetchBook = async () => {
      try {
        const token = await getTokenFromClient();

        if (!token) {
          throw new Error("Please login again.");
        }

        const response = await fetch(`${API_URL}/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load book.");
        }

        if (isMounted) {
          setBook(data);
        }
      } catch (error) {
        console.error("Error fetching book:", error);

        if (isMounted) {
          setBook(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (id && user) {
      fetchBook();
    }

    return () => {
      isMounted = false;
    };
  }, [id, user, isPending]);

  // Borrow Book
  const handleBorrow = async () => {
    if (!returnDate) {
      toast.error("Please select a return date.");
      return;
    }

    if (!user) {
      toast.error("Please login again.");
      return;
    }

    try {
      setBorrowing(true);

      const token = await getTokenFromClient();

      if (!token) {
        toast.error("Your session has expired. Please login again.");
        return;
      }

      const response = await fetch(`${API_URL}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId: id,
          userName: user.name,
          userEmail: user.email,
          returnDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to borrow book.");
        return;
      }

      setShowBorrowModal(false);
      setReturnDate("");

      // Refresh book information
      const updatedResponse = await fetch(`${API_URL}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (updatedResponse.ok) {
        const updatedBook = await updatedResponse.json();
        setBook(updatedBook);
      }

      toast.success("Book borrowed successfully!");

    } catch (error) {
      console.error("Borrow Error:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setBorrowing(false);
    }
  };

  // Loading State
  if (loading || isPending) {
    return (
      <p className="bg-[#101714] py-20 text-center text-white">
        Loading book details...
      </p>
    );
  }

  // Book Not Found
  if (!book) {
    return (
      <div className="min-h-screen bg-[#101714] py-20 text-center text-white">
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
            <p className="mb-3 font-semibold text-[#f6e262]">
              {book.category}
            </p>

            <h1 className="font-serif text-3xl font-bold md:text-4xl">
              {book.title}
            </h1>

            <p className="mt-4 text-gray-400">
              By {book.author}
            </p>

            <div className="my-6 h-px bg-white/10"></div>

            <h2 className="mb-3 text-lg font-semibold">
              About This Book
            </h2>

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
                {book.addedBy?.name || "BookNook Member"}
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

        {/* Borrow Modal */}
        {showBorrowModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
            <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#19231E] p-6">

              <h2 className="mb-5 text-2xl font-bold">
                Borrow This Book
              </h2>

              <p className="mb-4 text-gray-400">
                {book.title}
              </p>

              <label className="mb-2 block text-sm">
                Return Date
              </label>

              <input
                type="date"
                value={returnDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-[#101714] p-3 text-white"
              />

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setShowBorrowModal(false);
                    setReturnDate("");
                  }}
                  disabled={borrowing}
                  className="w-1/2 rounded-lg border border-white/20 py-3 disabled:opacity-50"
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
