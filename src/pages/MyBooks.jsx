import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Assumes userId is available from context

export default function MyBooks() {
  const [books, setBooks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.userId) return;

    const fetchBooks = async () => {
      try {
        const response = await fetch(`/api/getmybooks?userId=${user.userId}`);
        if (!response.ok) throw new Error("Failed to fetch books");
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        console.error("Error loading books:", err);
      }
    };

    fetchBooks();
  }, [user]);

  return (
    <div className="p-8 min-h-screen bg-black">
      <h1 className="text-3xl font-bold text-white mb-6">My Books</h1>

      {books.length === 0 ? (
        <p className="text-gray-400">You haven’t purchased any books yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-gray-900 rounded-2xl shadow-lg p-4 flex flex-col items-center"
            >
              <img
                src={book.cover || "/default-cover.jpg"}
                alt={book.title}
                className="w-32 h-48 object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-semibold text-white text-center">
                {book.title}
              </h2>
              <p className="text-gray-400 text-sm text-center">{book.author}</p>
              <a
                href={book.downloadUrl}
                download
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
