import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Categories from './pages/Categories';
import MyBooks from './pages/MyBooks';
import Search from './pages/Search';
import Recommend from './pages/Recommend';
import Login from './pages/Login'; // ✅ Import Login page

function App() {
  return (
    <div className="bg-brand-black min-h-screen text-white">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> {/* ✅ New login route */}
          <Route path="/mybooks" element={<MyBooks />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recommend" element={<Recommend />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
