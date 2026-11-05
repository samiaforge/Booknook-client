
"use client";

import { useEffect, useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/get-token-client";
import Link from "next/link";

const API_URL = "https://booknook-server-tawny.vercel.app";

const emptyForm = {
  title: "",
  author: "",
  category: "Fiction",
  image: "",
  description: "",
  totalCopies: 1,
};

const MyBooksPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const userEmail = session?.user?.email?.toLowerCase();

  // Load only the logged-in user's books
  useEffect(() => {
    if (isPending) return;

    if (!userEmail) {
      setLoading(false);
      return;
    }

    const fetchMyBooks = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/books`);

        if (!response.ok) {
          throw new Error("Failed to load books.");
        }

        const data = await response.json();

        const myBooks = data.filter(
          (book) =>
            book.addedBy?.email?.toLowerCase() === userEmail
        );

        setBooks(myBooks);
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBooks();
  }, [userEmail, isPending]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Open edit modal
  const handleEdit = (book) => {
    setSelectedBook(book);

    setFormData({
      title: book.title || "",
      author: book.author || "",
      category: book.category || "Fiction",
      image: book.image || "",
      description: book.description || "",
      totalCopies: book.totalCopies || 1,
    });

    setMessage("");
  };

  // Update book
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedBook) return;

    try {
      setSubmitting(true);
      setMessage("");

      const token = await getTokenFromClient();

      if (!token) {
        throw new Error("Please login again.");
      }

      const response = await fetch(
        `${API_URL}/books/${selectedBook._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            totalCopies: Number(formData.totalCopies),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update book.");
      }

      const borrowedCopies =
        selectedBook.totalCopies - selectedBook.availableCopies;

      const updatedBook = {
        ...selectedBook,
        ...formData,
        totalCopies: Number(formData.totalCopies),
        availableCopies:
          Number(formData.totalCopies) - borrowedCopies,
      };

      setBooks((prev) =>
        prev.map((book) =>
          book._id === selectedBook._id ? updatedBook : book
        )
      );

      setSelectedBook(null);
      setMessage("Book updated successfully!");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Open delete confirmation
  const handleDeleteClick = (id) => {
    setDeleteBookId(id);
    setShowDeleteModal(true);
  };

  // Delete book
  const handleDelete = async () => {
    if (!deleteBookId) return;

    try {
      setSubmitting(true);
      setMessage("");

      const token = await getTokenFromClient();

      if (!token) {
        throw new Error("Please login again.");
      }

      const response = await fetch(
        `${API_URL}/books/${deleteBookId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete book.");
      }

      setBooks((prev) =>
        prev.filter((book) => book._id !== deleteBookId)
      );

      setShowDeleteModal(false);
      setDeleteBookId(null);
      setMessage("Book deleted successfully!");
    } catch (error) {
      setMessage(error.message);
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
              Your Collection
            </p>

            <h1 className="text-3xl font-bold md:text-4xl">
              My Books
            </h1>

            <p className="mt-3 text-gray-400">
              Manage the books you have added to BookNook.
            </p>
          </div>

          {message && (
            <p className="mb-6 rounded-lg border border-[#f6e262]/20 bg-[#19231E] p-4 text-sm text-[#f6e262]">
              {message}
            </p>
          )}

          {loading ? (
            <div className="py-20 text-center text-gray-400">
              <i className="fa-solid fa-spinner fa-spin mr-2"></i>
              Loading your books...
            </div>
          ) : books.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#19231E] px-6 py-16 text-center">
              <i className="fa-solid fa-book-open mb-4 text-4xl text-[#f6e262]"></i>

              <h2 className="text-xl font-semibold">
                You haven't added any books yet.
              </h2>

              <p className="mt-2 text-gray-400">
                Start building your library by adding a book.
              </p>

              <Link
  href="/add-book"
  className="mt-6 inline-block rounded-lg bg-[#f6e262] px-6 py-3 font-semibold text-[#101714] transition hover:bg-yellow-300"
>
  Add a Book
</Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#19231E]"
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-56 w-full object-cover"
                  />

                  <div className="p-5">
                    <span className="rounded-full bg-[#f6e262]/10 px-3 py-1 text-xs text-[#f6e262]">
                      {book.category}
                    </span>

                    <h2 className="mt-4 text-xl font-bold">
                      {book.title}
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                      By {book.author}
                    </p>

                    <p className="mt-3 text-sm text-gray-400">
                      Total Copies: {book.totalCopies}
                    </p>

                    <p className="text-sm text-gray-400">
                      Available: {book.availableCopies}
                    </p>

                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={() => handleEdit(book)}
                        className="flex-1 rounded-lg border border-[#f6e262] py-2 text-sm font-semibold text-[#f6e262] transition hover:bg-[#f6e262] hover:text-[#101714]"
                      >
                        <i className="fa-solid fa-pen-to-square mr-2"></i>
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteClick(book._id)}
                        className="flex-1 rounded-lg border border-red-500/50 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                      >
                        <i className="fa-solid fa-trash mr-2"></i>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

       
        {selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4">
            <div className="my-8 w-full max-w-xl rounded-2xl border border-white/10 bg-[#19231E] p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Edit Book</h2>

                <button
                  onClick={() => setSelectedBook(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Book Title"
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#101714] p-3 text-white outline-none focus:border-[#f6e262]"
                />

                <input
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Author"
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#101714] p-3 text-white outline-none focus:border-[#f6e262]"
                />

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-[#101714] p-3 text-white outline-none"
                >
                  {["Fiction", "Science", "History", "Kids", "Others"].map(
                    (category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    )
                  )}
                </select>

                <input
                  name="image"
                  type="url"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Book Image URL"
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#101714] p-3 text-white outline-none focus:border-[#f6e262]"
                />

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Book Description"
                  required
                  rows={4}
                  className="w-full rounded-lg border border-white/10 bg-[#101714] p-3 text-white outline-none focus:border-[#f6e262]"
                />

                <input
                  name="totalCopies"
                  type="number"
                  min="1"
                  step="1"
                  value={formData.totalCopies}
                  onChange={handleChange}
                  required
                  placeholder="Total Copies"
                  className="w-full rounded-lg border border-white/10 bg-[#101714] p-3 text-white outline-none focus:border-[#f6e262]"
                />

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedBook(null)}
                    className="flex-1 rounded-lg border border-white/20 py-3 text-gray-300"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 rounded-lg bg-[#f6e262] py-3 font-bold text-[#101714] disabled:opacity-50"
                  >
                    {submitting ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#19231E] p-7 text-center">
              <i className="fa-solid fa-triangle-exclamation mb-4 text-4xl text-red-400"></i>

              <h2 className="text-xl font-bold">
                Delete this book?
              </h2>

              <p className="mt-3 text-sm text-gray-400">
                Are you sure you want to delete this book? This action cannot be undone.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteBookId(null);
                  }}
                  className="flex-1 rounded-lg border border-white/20 py-3"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  disabled={submitting}
                  className="flex-1 rounded-lg bg-red-500 py-3 font-bold text-white disabled:opacity-50"
                >
                  {submitting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </PrivateRoute>
  );
};

export default MyBooksPage;
