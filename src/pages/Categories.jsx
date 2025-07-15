import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { useCart } from "../context/CartContext";

export default function Categories() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useCart();

  // Replace this with your deployed Azure Function URL
  const API_URL = "https://e-book-function-app-era6f7f3dceycpcu.centralindia-01.azurewebsites.net/api/list_books";

  // Fetch all books and derive categories
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        const uniqueCategories = [...new Set(data.map(book => book.category || "Uncategorized"))];
        setCategories(["All", ...uniqueCategories]);
      })
      .catch(err => console.error("Failed to fetch books", err));
  }, []);

  // Filter books by selected category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter(book => book.category === selectedCategory));
    }
  }, [selectedCategory, books]);

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
        {filteredBooks.map((book, index) => (
          <BookCard
            key={index}
            {...book}
            onAddToCart={() => addToCart(book)}
          />
        ))}
      </div>
    </div>
  );
}
