// src/context/MyBooksContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; // adjust path if needed

const MyBooksContext = createContext();

export const useMyBooks = () => useContext(MyBooksContext);

export function MyBooksProvider({ children }) {
  const [myBooks, setMyBooks] = useState([]);
  const { user } = useAuth();

  const fetchMyBooks = async () => {
    if (!user?.userId) return;
    try {
      const res = await fetch(`/api/getmybooks?userId=${user.userId}`);
      const data = await res.json();
      setMyBooks(data);
    } catch (error) {
      console.error("Failed to fetch MyBooks:", error);
    }
  };

  useEffect(() => {
    fetchMyBooks();
  }, [user]);

  return (
    <MyBooksContext.Provider value={{ myBooks, fetchMyBooks }}>
      {children}
    </MyBooksContext.Provider>
  );
}
