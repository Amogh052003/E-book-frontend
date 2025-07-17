import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Categories from './pages/Categories';
import MyBooks from './pages/MyBooks';
import Search from './pages/Search';
import Recommend from './pages/Recommend';
import Login from './pages/Login';

function App() {
  useEffect(() => {
    const registerUser = async () => {
      try {
        const res = await fetch('/.auth/me');
        const { clientPrincipal } = await res.json();

        if (clientPrincipal) {
          const { userId, userDetails: email } = clientPrincipal;

          await fetch('https://e-book-function-app-era6f7f3dceycpcu.centralindia-01.azurewebsites.net/api/register_user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, email })  // <== missing closing }
          });
        }
      } catch (err) {
        console.error('User registration failed:', err);
      }
    };

    registerUser();
  }, []);

  return (
    <div className="bg-brand-black min-h-screen text-white">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
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
