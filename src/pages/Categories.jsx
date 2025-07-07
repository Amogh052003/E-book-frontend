import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { useCart } from "../context/CartContext";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [books, setBooks] = useState([]);
  const { addToCart } = useCart();

  // Fetch all categories
  useEffect(() => {
    fetch("http://localhost:8000/api/categories/")
      .then(res => res.json())
      .then(data => setCategories(["All", ...data]))
      .catch(err => console.error("Failed to fetch categories", err));
  }, []);

  // Fetch books by selected category
  useEffect(() => {
    const url =
      selectedCategory === "All"
        ? "http://localhost:8000/api/books"
        : `http://localhost:8000/api/books?category=${encodeURIComponent(selectedCategory)}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error("Failed to fetch books", err));
  }, [selectedCategory]);

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Browse by Category</h1>

      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            {...book}
            onAddToCart={() => addToCart(book)}
          />
        ))}
      </div>
    </div>
  );
}
