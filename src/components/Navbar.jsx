import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/.auth/me')
      .then(res => res.json())
      .then(data => {
        const principal = data?.[0]?.clientPrincipal;
        if (principal) {
          setUser(principal);
        }
      });
  }, []);

  return (
    <nav className="bg-brand-red text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold tracking-wide">eBook Store</div>
      <div className="flex space-x-6 text-sm font-medium items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/my-books" className="hover:underline">My Books</Link>
        <Link to="/cart" className="hover:underline">Cart</Link>
        <Link to="/categories" className="hover:underline">Categories</Link>
        <Link to="/search" className="hover:underline">Search</Link>
        <Link to="/recommend" className="hover:underline">Recommend</Link>

        {user ? (
          <>
            <span className="text-sm">Hello, {user.userDetails}</span>
            <a
              href="/.auth/logout"
              className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200"
            >
              Logout
            </a>
          </>
        ) : (
          <a
            href="/.auth/login/google"
            className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
}
