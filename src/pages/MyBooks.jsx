import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const MyBooks = () => {
  const { accounts } = useMsal();
  const userId = accounts[0]?.homeAccountId;

  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`/api/getmybooks?userId=${userId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch your books");
        }
        const data = await res.json();
        setMyBooks(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBooks();
    }
  }, [userId]);

  if (loading) return <div className="text-center p-4">Loading your books...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
  if (myBooks.length === 0) return <div className="text-center p-4">No books found in your library.</div>;

  return (
    <div className="grid gap-4 p-4 md:grid-cols-3 sm:grid-cols-2">
      {myBooks.map((book) => (
        <Card key={book.id} className="rounded-2xl shadow-md">
          <img
            src={book.coverImage}
            alt={book.title}
            className="rounded-t-2xl h-60 w-full object-cover"
          />
          <CardContent className="p-4 flex flex-col gap-2">
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.author}</p>
            <a href={book.downloadUrl} target="_blank" rel="noopener noreferrer">
              <Button className="w-full mt-2 flex gap-2">
                <BookOpen size={16} />
                Read Book
              </Button>
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyBooks;
