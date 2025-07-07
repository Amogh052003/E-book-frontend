import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (book) => {
    // Avoid duplicates
    setCartItems((prev) => {
      if (prev.find((item) => item.title === book.title)) return prev;
      return [...prev, book];
    });
  };

  const removeFromCart = (title) => {
    setCartItems((prev) => prev.filter((item) => item.title !== title));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
