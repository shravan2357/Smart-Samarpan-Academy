import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../../assets/logo.jpg';
import './Header.css';
import { UserData } from "../../context/UserContext";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Header = ({ isAuth }) => {
  const { user } = UserData();
  const isAdmin = user && user.role === "admin";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle smooth scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`hdr-main ${scrolled ? "scrolled" : ""}`}>
      <div className="hdr-container">
        {/* Logo and Brand Name */}
        <Link to="/" className="hdr-logo-link" onClick={closeMobileMenu}>
          <img src={logo} alt="Samarpan Math Academy Logo" className="hdr-logo-img" />
          <span className="hdr-brand-name">Samarpan Math Academy</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hdr-nav">
          <Link to="/" className="hdr-link">Home</Link>
          <Link to="/about" className="hdr-link">About</Link>
          
          {/* Hide Courses and AI Tools from Admin, show them to users/guests */}
          {!isAdmin && (
            <>
              <Link to="/courses" className="hdr-link">Courses</Link>
              <Link to="/ai-tools" className="hdr-link">
                AI Tools
                <span className="hdr-ai-badge">✨ New</span>
              </Link>
            </>
          )}

          {isAuth ? (
            <>
              {isAdmin && (
                <Link to="/admin/dashboard" className="hdr-link">Admin Panel</Link>
              )}
              <Link to="/account" className="hdr-link">Account</Link>
            </>
          ) : (
            <Link to="/login" className="hdr-btn-login">Login</Link>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="hdr-mobile-btn" 
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <HiX className="hdr-mobile-icon" />
          ) : (
            <HiMenuAlt3 className="hdr-mobile-icon" />
          )}
        </button>
      </div>

      {/* Mobile Drawer / Backdrop */}
      <div 
        className={`hdr-mobile-overlay ${isMobileMenuOpen ? "open" : ""}`}
        onClick={closeMobileMenu}
      />

      <div className={`hdr-mobile-drawer ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="hdr-mobile-drawer-header">
          <div className="hdr-mobile-drawer-brand">
            <img src={logo} alt="Logo" className="hdr-drawer-logo-img" />
            <span className="hdr-drawer-brand-name">Samarpan Math</span>
          </div>
          <button 
            className="hdr-mobile-drawer-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <HiX />
          </button>
        </div>

        <div className="hdr-mobile-menu-links">
          <Link to="/" className="hdr-mobile-link" onClick={closeMobileMenu}>
            Home
          </Link>
          <Link to="/about" className="hdr-mobile-link" onClick={closeMobileMenu}>
            About
          </Link>

          {!isAdmin && (
            <>
              <Link to="/courses" className="hdr-mobile-link" onClick={closeMobileMenu}>
                Courses
              </Link>
              <Link to="/ai-tools" className="hdr-mobile-link" onClick={closeMobileMenu}>
                AI Tools
                <span className="hdr-ai-badge">✨ New</span>
              </Link>
            </>
          )}

          {isAuth ? (
            <>
              {isAdmin && (
                <Link to="/admin/dashboard" className="hdr-mobile-link adm" onClick={closeMobileMenu}>
                  Admin Panel
                </Link>
              )}
              <Link to="/account" className="hdr-mobile-link" onClick={closeMobileMenu}>
                Account
              </Link>
            </>
          ) : (
            <div className="hdr-mobile-auth-wrap">
              <Link to="/login" className="hdr-mobile-btn-login" onClick={closeMobileMenu}>
                Login / Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
