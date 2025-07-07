// src/pages/Search.jsx
import React, { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/search?q=${query}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Search eBooks</h1>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          className="px-4 py-2 rounded text-black w-full"
          placeholder="Enter title or author..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {results.map((book) => (
          <div key={book.id} className="bg-white rounded p-4 text-black">
            <img src={book.cover_url} alt={book.title} className="w-full h-64 object-cover rounded" />
            <h2 className="font-bold mt-4">{book.title}</h2>
            <p>{book.author}</p>
            <p className="text-red-600 font-semibold mt-2">₹{book.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
