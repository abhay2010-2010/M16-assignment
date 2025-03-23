import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/Auth.actions";
import "../styles/Navbar.css"; // Import separate CSS file

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Track scroll position for navbar animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <span className="logo-icon">🏢</span>
            <span className="logo-text">
              <span className="logo-text-emp">EMP</span>Manager
            </span>
          </Link>
        </div>

        {/* Hamburger menu button - only visible on mobile */}
        <div className="mobile-menu-button" onClick={toggleMenu}>
          <div className={`menu-bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`menu-bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`menu-bar ${menuOpen ? 'open' : ''}`}></div>
        </div>

        {/* Desktop navigation - hidden on mobile */}
        <div className="desktop-nav">
          {token ? (
            <>
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                <span className="link-icon">🏠</span>
                <span className="link-text">Dashboard</span>
              </Link>
              <Link to="/employees" className={`nav-link ${location.pathname === '/employees' ? 'active' : ''}`}>
                <span className="link-icon">👥</span>
                <span className="link-text">Employees</span>
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                <span className="btn-icon">🚪</span> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}>
              <span className="link-icon">🔐</span>
              <span className="link-text">Login</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu overlay - only visible when menu is open */}
      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        {token ? (
          <>
            <Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>
              <span className="mobile-link-icon">🏠</span>
              Dashboard
            </Link>
            <Link to="/employees" className="mobile-link" onClick={() => setMenuOpen(false)}>
              <span className="mobile-link-icon">👥</span>
              Employees
            </Link>
            <button onClick={handleLogout} className="mobile-logout-btn">
              <span className="mobile-link-icon">🚪</span>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="mobile-link" onClick={() => setMenuOpen(false)}>
            <span className="mobile-link-icon">🔐</span>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;