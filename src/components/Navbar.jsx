import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/.auth/me")
      .then((res) => res.json())
      .then((data) => {
        const principal = data?.clientPrincipal || data?.[0]?.clientPrincipal;
        if (principal && principal.userRoles?.includes("authenticated")) {
          setUser(principal);
        }
      });
  }, []);

  const handleLogout = () => {
    window.location.href = "/.auth/logout";
  };

  return (
    <nav className="bg-brand-red text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold tracking-wide">eBook Store</div>
      <div className="flex space-x-6 text-sm font-medium">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/my-books" className="hover:underline">My Books</Link>
        <Link to="/cart" className="hover:underline">Cart</Link>
        <Link to="/categories" className="hover:underline">Categories</Link>
        <Link to="/search" className="hover:underline">Search</Link>
        <Link to="/recommend" className="hover:underline">Recommend</Link>
      </div>
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm">{user.userDetails}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-brand-red px-3 py-1 rounded hover:bg-gray-100 text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <a
            href="/.auth/login/google"
            className="bg-white text-brand-red px-4 py-2 rounded hover:bg-gray-100 text-sm"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
}
