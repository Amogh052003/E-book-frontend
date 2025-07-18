import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { useCart } from "../context/CartContext";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [recentBooks, setRecentBooks] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const { addToCart } = useCart();

  const API_BASE = "https://e-book-function-app-era6f7f3dceycpcu.centralindia-01.azurewebsites.net/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, recentRes, recommendRes] = await Promise.all([
          fetch(`${API_BASE}/list_books`),
          fetch(`${API_BASE}/getrecentlyread`),
          fetch(`${API_BASE}/getrecommendations`)
        ]);

        const booksData = await booksRes.json();
        const recentData = await recentRes.json();
        const recommendData = await recommendRes.json();

        setBooks(booksData);
        setRecentBooks(recentData);
        setRecommended(recommendData);
      } catch (error) {
        console.error("Failed to fetch book data:", error);
      }
    };

    fetchData();
  }, []);

  const renderSection = (title, data) => (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.map((book, index) => (
          <BookCard
            key={index}
            {...book}
            onClick={() => console.log("View details for:", book.title)}
            onAddToCart={() => addToCart(book)}
          />
        ))}
      </div>
    </section>
  );

  return (
    <div className="p-10 bg-neutral-950 text-white min-h-screen">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Unlock a Universe of Knowledge
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
          Discover thousands of curated eBooks across genres like Business,
          Finance, Tech, and Self-Improvement — all in one place.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <a
            href="/categories"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow"
          >
            Browse Categories
          </a>
        </div>
      </div>

      {/* Features */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Tailored For You",
            description:
              "Get AI-based recommendations based on your interests and reading history.",
          },
          {
            title: "Secure Access",
            description:
              "Files are securely stored and accessed using short-lived SAS tokens.",
          },
          {
            title: "Your Personal Library",
            description:
              "Download and revisit your purchased eBooks anytime under “My Books”.",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-lg p-6 text-gray-900"
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-gray-700 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Book Sections */}
      <div className="mt-16">
        {renderSection("🔥 New Arrivals", books)}
        {renderSection("🕘 Recently Read", recentBooks)}
        {renderSection("🤖 Recommended For You", recommended)}
      </div>
    </div>
  );
}
