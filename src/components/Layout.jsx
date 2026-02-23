import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../data/auth';
import Chatbot from './Chatbot';

const navItems = [
  ['/homepage', 'Home'],
  ['/gallery', 'Gallery'],
  ['/upload', 'Upload'],
  ['/order', 'Order'],
  ['/cart', 'Cart'],
  ['/about', 'About']
];

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, [location.pathname]);

  useEffect(() => {
    const handleStorageChange = () => setCurrentUser(getCurrentUser());
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, [currentUser]);

  const getGreeting = () => {
    const hour = now.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  const formattedTime = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <NavLink to="/" className="logo">
            <span className="dot" />PaintHub
          </NavLink>
          <nav className="nav">
            {navItems.map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active-link' : '')}>
                {label}
              </NavLink>
            ))}
            {currentUser ? (
              <>
                <button type="button" className="nav-action" onClick={handleLogout}>
                  Logout
                </button>
                <div className="welcome-chip" aria-live="polite">
                  <div className="welcome-greeting">{getGreeting()}, {currentUser.name}</div>
                  <div className="welcome-time">{formattedTime}</div>
                </div>
              </>
            ) : (
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Login/Signup
              </NavLink>
            )}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container">© 2026 PaintHub — A colorful marketplace for artists</div>
      </footer>

      <Chatbot />
    </>
  );
}
