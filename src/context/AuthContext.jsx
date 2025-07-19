// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await fetch("/.auth/me");
        const json = await res.json();
        const clientPrincipal = json.clientPrincipal;

        if (clientPrincipal) {
          setUser({
            userId: clientPrincipal.userId,
            email: clientPrincipal.userDetails,
            roles: clientPrincipal.userRoles,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setUser(null);
      }
    };

    fetchAuthUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}
