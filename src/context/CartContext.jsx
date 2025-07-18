import { createContext, useContext, useState } from "react";

// Create the context
const CartContext = createContext();

// Hook to use cart
export const useCart = () => useContext(CartContext);

// CartProvider component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (book) => {
    setCartItems((prev) => {
      // Prevent duplicates by checking ID or title
      const exists = prev.find((item) => item.title === book.title);
      if (exists) return prev;
      return [...prev, book];
    });
  };

  const removeFromCart = (book) => {
    setCartItems((prev) =>
      prev.filter((item) => item.title !== book.title)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
