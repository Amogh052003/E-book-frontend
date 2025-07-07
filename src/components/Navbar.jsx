import { Link } from 'react-router-dom';

export default function Navbar() {
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
    </nav>
  );
}
