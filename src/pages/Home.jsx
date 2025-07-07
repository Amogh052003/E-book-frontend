// import { useState } from "react";
// import BookCard from "../components/BookCard";
// import { useCart } from "../context/CartContext";

// const mockBooks = [
//   {
//     title: "The Cloud Handbook",
//     author: "Jane Doe",
//     price: 299,
//     cover: "https://picsum.photos/200/300?1",
//     summary: "An in-depth look into cloud computing technologies and how they transform businesses.",
//     contents: ["What is the Cloud?", "Cloud Providers", "Best Practices", "Security in Cloud"],
//   },
//   {
//     title: "Azure Essentials",
//     author: "John Smith",
//     price: 399,
//     cover: "https://picsum.photos/200/300?2",
//     summary: "Get started with Microsoft Azure and learn how to build and deploy scalable apps.",
//     contents: ["Getting Started", "Core Services", "Deployment", "Monitoring"],
//   },
//   {
//     title: "Serverless Mastery",
//     author: "Amogh L.",
//     price: 249,
//     cover: "https://picsum.photos/200/300?3",
//     summary: "Master serverless architecture using AWS Lambda, Azure Functions, and Google Cloud.",
//     contents: ["What is Serverless?", "Use Cases", "Deployment Models", "Real-world Projects"],
//   },
//   {
//     title: "AI in Production",
//     author: "AI GPT",
//     price: 349,
//     cover: "https://picsum.photos/200/300?4",
//     summary: "Explore best practices for deploying AI models at scale.",
//     contents: ["Model Lifecycle", "MLOps", "Case Studies"],
//   },
// ];

// export default function Home() {
//   const [selectedBook, setSelectedBook] = useState(null);
//   const { addToCart } = useCart();

//   return (
//     <div className="p-10 bg-neutral-950 text-white min-h-screen">
//       <div className="max-w-4xl mx-auto text-center">
//         <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
//           Unlock a Universe of Knowledge
//         </h1>
//         <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
//           Discover thousands of curated eBooks across genres like Business,
//           Finance, Tech, and Self-Improvement — all in one place.
//         </p>
//         <div className="mt-8 flex justify-center gap-4 flex-wrap">
//           <a
//             href="/categories"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow"
//           >
//             Browse Categories
//           </a>
//           <a
//             href="/recommend"
//             className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded border"
//           >
//             Get Recommendations
//           </a>
//         </div>
//       </div>

//       <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {[
//           {
//             title: "Tailored For You",
//             description: "Get AI-based recommendations based on your interests and reading history.",
//           },
//           {
//             title: "Secure Access",
//             description: "Files are securely stored and accessed using short-lived SAS tokens.",
//           },
//           {
//             title: "Your Personal Library",
//             description: "Download and revisit your purchased eBooks anytime under “My Books”.",
//           },
//         ].map((feature, idx) => (
//           <div key={idx} className="bg-white shadow-md rounded-lg p-6 text-gray-900">
//             <h3 className="text-xl font-semibold">{feature.title}</h3>
//             <p className="mt-2 text-gray-700 text-sm">{feature.description}</p>
//           </div>
//         ))}
//       </div>

//       <h2 className="text-2xl font-bold mt-16 mb-4">🔥 Trending Books</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {mockBooks.map((book, index) => (
//           <BookCard
//             key={index}
//             {...book}
//             onClick={() => setSelectedBook(book)}
//             onAddToCart={() => addToCart(book)}
//           />
//         ))}
//       </div>

//       {selectedBook && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative text-gray-900">
//             <button
//               onClick={() => setSelectedBook(null)}
//               className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl font-bold"
//             >
//               ✖
//             </button>

//             <div className="flex items-start gap-4">
//               <img
//                 src={selectedBook.cover}
//                 alt={selectedBook.title}
//                 className="w-28 h-40 object-cover rounded"
//               />
//               <div className="flex-1">
//                 <h2 className="text-2xl font-semibold">{selectedBook.title}</h2>
//                 <p className="text-sm text-gray-600 mb-2">by {selectedBook.author}</p>
//                 <p className="text-gray-700 text-sm">{selectedBook.summary}</p>
//                 <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
//                   {selectedBook.contents.map((item, idx) => (
//                     <li key={idx}>{item}</li>
//                   ))}
//                 </ul>
//                 <button
//                   onClick={() => {
//                     addToCart(selectedBook);
//                     setSelectedBook(null);
//                   }}
//                   className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [recentBooks, setRecentBooks] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/books")
      .then((res) => res.json())
      .then(setBooks)
      .catch(console.error);

    fetch("http://localhost:8000/api/recently-read")
      .then((res) => res.json())
      .then(setRecentBooks)
      .catch(console.error);

    fetch("http://localhost:8000/api/recommend")
      .then((res) => res.json())
      .then(setRecommended)
      .catch(console.error);
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
          />
        ))}
      </div>
    </section>
  );

  return (
    <div className="p-10 bg-neutral-950 text-white min-h-screen">
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

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 text-gray-900">
          <h3 className="text-xl font-semibold">Tailored For You</h3>
          <p className="mt-2 text-gray-700 text-sm">
            Get AI-based recommendations based on your interests and reading history.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-gray-900">
          <h3 className="text-xl font-semibold">Secure Access</h3>
          <p className="mt-2 text-gray-700 text-sm">
            Files are securely stored and accessed using short-lived SAS tokens.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-gray-900">
          <h3 className="text-xl font-semibold">Your Personal Library</h3>
          <p className="mt-2 text-gray-700 text-sm">
            Download and revisit your purchased eBooks anytime under “My Books”.
          </p>
        </div>
      </div>

      <div className="mt-16">
        {renderSection("🔥 New Arrivals", books)}
        {renderSection("🕘 Recently Read", recentBooks)}
        {renderSection("🤖 Recommended For You", recommended)}
      </div>
    </div>
  );
}
