import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import { getAuthChangedEventName, getCurrentUser } from './data/auth';
import GalleryPage from './pages/GalleryPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrderPage from './pages/OrderPage';
import SignupPage from './pages/SignupPage';
import UploadPage from './pages/UploadPage';

export default function App() {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, [location.pathname]);

  useEffect(() => {
    const syncAuth = () => setCurrentUser(getCurrentUser());
    const eventName = getAuthChangedEventName();

    window.addEventListener('storage', syncAuth);
    window.addEventListener(eventName, syncAuth);

    return () => {
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener(eventName, syncAuth);
    };
  }, []);

  if (!currentUser) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/homepage" replace />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/login" element={<Navigate to="/homepage" replace />} />
        <Route path="/signup" element={<Navigate to="/homepage" replace />} />
        <Route path="*" element={<Navigate to="/homepage" replace />} />
      </Routes>
    </Layout>
  );
}
