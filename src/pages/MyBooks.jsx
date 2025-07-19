import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // assuming this holds the logged-in user info

export default function MyBooks() {
  const [books, setBooks] = useState([]);
  const { user } = useAuth(); // user.userId assumed available

  useEffect(() => {
    if (!user?.userId) return;

    const fetchBooks = async () => {
      try {
        const res = await fetch(`/api/getmybooks?userId=${user.userId}`);
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, [user]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-6">My Books</h1>

      {books.length === 0 ? (
        <p className="text-gray-400">You haven’t purchased any books yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-gray-900 rounded shadow p-4 flex flex-col items-center"
            >
              <img
                src={book.cover || "/default-cover.jpg"}
                alt={book.title}
                className="w-32 h-48 object-cover mb-4"
              />
              <h2 className="text-lg font-semibold text-white">{book.title}</h2>
              <p className="text-gray-400">{book.author}</p>
              <a
                href={book.downloadUrl}
                download
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
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
