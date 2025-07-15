import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { useCart } from "../context/CartContext";

export default function Recommend() {
  const [recommended, setRecommended] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:8000/api/recommend")
      .then(res => res.json())
      .then(data => setRecommended(data))
      .catch(err => console.error("Failed to fetch recommendations", err));
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">📚 Recommended For You</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {recommended.map((book) => (
          <BookCard
            key={book.id}
            {...book}
            onClick={() => setSelectedBook(book)}
            onAddToCart={() => addToCart(book)}
          />
        ))}
      </div>

      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative text-gray-900">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-600 text-xl font-bold"
            >
              ✖
            </button>
            <div className="flex items-start gap-4">
              <img
                src={selectedBook.cover}
                alt={selectedBook.title}
                className="w-28 h-40 object-cover rounded"
              />
              <div>
                <h2 className="text-2xl font-semibold">{selectedBook.title}</h2>
                <p className="text-sm text-gray-600 mb-2">by {selectedBook.author}</p>
                <p className="text-gray-700 text-sm">{selectedBook.summary}</p>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                  {selectedBook.contents.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
