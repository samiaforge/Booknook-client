
"use client";

import { useEffect, useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/get-token-client";
import Link from "next/link";
import toast from "react-hot-toast";

const API_URL = "https://booknook-server-tawny.vercel.app";

const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const MyBorrowsPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBorrow, setSelectedBorrow] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Load current user's borrowed books
  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      setLoading(false);
      return;
    }

    const fetchBorrows = async () => {
      try {
        setLoading(true);

        const token = await getTokenFromClient();

        if (!token) {
          throw new Error("Please login again.");
        }

        const response = await fetch(`${API_URL}/borrows`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load borrowed books.");
        }

        setBorrows(data);
      } catch (error) {
        toast.error(error.message || "Failed to load borrowed books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBorrows();
  }, [session, isPending]);

  // Return book
  const handleReturn = async () => {
    if (!selectedBorrow) return;

    try {
      setSubmitting(true);

      const token = await getTokenFromClient();

      if (!token) {
        throw new Error("Please login again.");
      }

      const response = await fetch(
        `${API_URL}/borrows/${selectedBorrow._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to return book.");
      }

      setBorrows((prev) =>
        prev.filter((borrow) => borrow._id !== selectedBorrow._id)
      );

      setSelectedBorrow(null);

      toast.success("Book returned successfully!");

    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PrivateRoute>
      <main className="min-h-screen bg-[#101714] px-4 py-12 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#f6e262]">
              Your Reading Activity
            </p>

            <h1 className="text-3xl font-bold md:text-4xl">
              My Borrows
            </h1>

            <p className="mt-3 text-gray-400">
              Track your borrowed books and return them on time.
            </p>
          </div>

          {loading ? (
            <div className="py-20 text-center text-gray-400">
              <i className="fa-solid fa-spinner fa-spin mr-2"></i>
              Loading borrowed books...
            </div>
          ) : borrows.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#19231E] px-6 py-16 text-center">
              <i className="fa-solid fa-book-open mb-4 text-4xl text-[#f6e262]"></i>

              <h2 className="text-xl font-semibold">
                You haven't borrowed any books yet.
              </h2>

              <p className="mt-2 text-gray-400">
                Explore our collection and find your next read.
              </p>

              <Link
                href="/books"
                className="mt-6 inline-block rounded-lg bg-[#f6e262] px-6 py-3 font-semibold text-[#101714] transition hover:bg-yellow-300"
              >
                Browse Books
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#19231E]">
              <table className="w-full min-w-[750px] text-left">
                <thead className="border-b border-white/10 bg-[#202D26] text-sm text-gray-300">
                  <tr>
                    <th className="px-6 py-5">Book</th>
                    <th className="px-6 py-5">Borrow Date</th>
                    <th className="px-6 py-5">Return Date</th>
                    <th className="px-6 py-5 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {borrows.map((borrow) => (
                    <tr
                      key={borrow._id}
                      className="border-b border-white/10 last:border-0"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <img
                            src={borrow.bookImage}
                            alt={borrow.bookTitle}
                            className="h-16 w-12 rounded-md object-cover"
                          />

                          <span className="font-semibold">
                            {borrow.bookTitle}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-300">
                        {formatDate(borrow.borrowDate)}
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-300">
                        {formatDate(borrow.returnDate)}
                      </td>

                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => setSelectedBorrow(borrow)}
                          className="rounded-lg bg-[#f6e262] px-4 py-2 text-sm font-bold text-[#101714] transition hover:bg-yellow-300"
                        >
                          Return Book
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Return Confirmation Modal */}
        {selectedBorrow && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#19231E] p-7 text-center">
              <i className="fa-solid fa-book-open mb-4 text-4xl text-[#f6e262]"></i>

              <h2 className="text-xl font-bold">
                Return this book?
              </h2>

              <p className="mt-3 text-gray-400">
                Are you sure you want to return{" "}
                <span className="font-semibold text-white">
                  {selectedBorrow.bookTitle}
                </span>
                ?
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setSelectedBorrow(null)}
                  disabled={submitting}
                  className="flex-1 rounded-lg border border-white/20 py-3 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleReturn}
                  disabled={submitting}
                  className="flex-1 rounded-lg bg-[#f6e262] py-3 font-bold text-[#101714] disabled:opacity-50"
                >
                  {submitting ? "Returning..." : "Confirm Return"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </PrivateRoute>
  );
};

export default MyBorrowsPage;
