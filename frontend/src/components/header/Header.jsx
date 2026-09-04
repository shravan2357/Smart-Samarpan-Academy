import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import './Header.css';
import { UserData } from '../../context/UserContext';
import { 
  HiMenuAlt3, 
  HiX, 
  HiHome, 
  HiInformationCircle, 
  HiAcademicCap, 
  HiSparkles, 
  HiViewGrid, 
  HiUser, 
  HiLogin, 
  HiLogout 
} from 'react-icons/hi';

const Header = ({ isAuth }) => {
  const { user, setUser, setIsAuth } = UserData();
  const isAdmin = user && user.role === 'admin';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle smooth scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    closeMobileMenu();
    localStorage.clear();
    setUser(null);
    setIsAuth(false);
    navigate('/login');
  };

  const pathname = location.pathname;

  return (
    <>
      <header className={`hdr-main ${scrolled ? "scrolled" : ""}`}>
        <div className="hdr-container">
          {/* Logo and Brand Name */}
          <Link to="/" className="hdr-logo-link" onClick={closeMobileMenu}>
            <img src={logo} alt="Samarpan Math Academy Logo" className="hdr-logo-img" />
            <span className="hdr-brand-name">Samarpan Math Academy</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hdr-nav">
            <Link to="/" className={`hdr-link ${pathname === "/" ? "active" : ""}`}>Home</Link>
            <Link to="/about" className={`hdr-link ${pathname === "/about" ? "active" : ""}`}>About</Link>
            
            {!isAdmin && (
              <>
                <Link to="/courses" className={`hdr-link ${pathname.startsWith("/course") ? "active" : ""}`}>Courses</Link>
                <Link to="/ai-tools" className={`hdr-link ${pathname === "/ai-tools" ? "active" : ""}`}>
                  AI Tools
                  <span className="hdr-ai-badge">✨ New</span>
                </Link>
              </>
            )}

            {isAuth ? (
              <>
                {isAdmin && (
                  <Link to="/admin/dashboard" className={`hdr-link ${pathname.startsWith("/admin") ? "active" : ""}`}>Admin Panel</Link>
                )}
                <Link to="/account" className={`hdr-link ${pathname === "/account" ? "active" : ""}`}>Account</Link>
              </>
            ) : (
              <Link to="/login" className="hdr-btn-login">Login</Link>
            )}
          </nav>
          
          {/* Mobile Menu Trigger Button */}
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
      </header>

      {/* Mobile & Tablet Drawer Overlay */}
      <div 
        className={`hdr-mobile-overlay ${isMobileMenuOpen ? "open" : ""}`}
        onClick={closeMobileMenu}
        aria-hidden={!isMobileMenuOpen}
      />

      {/* Mobile & Tablet Slide-out Drawer */}
      <aside 
        className={`hdr-mobile-drawer ${isMobileMenuOpen ? "open" : ""}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="hdr-mobile-drawer-header">
          <div className="hdr-mobile-drawer-brand">
            <img src={logo} alt="Logo" className="hdr-drawer-logo-img" />
            <div className="hdr-drawer-brand-text">
              <span className="hdr-drawer-brand-name">Samarpan Math</span>
              <span className="hdr-drawer-brand-sub">Academic Excellence</span>
            </div>
          </div>
          <button 
            className="hdr-mobile-drawer-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <HiX />
          </button>
        </div>

        {/* User Info Bar if logged in */}
        {isAuth && user && (
          <div className="hdr-drawer-user-card">
            <div className="hdr-drawer-user-avatar">
              {user.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <div className="hdr-drawer-user-info">
              <span className="hdr-drawer-user-name">{user.name}</span>
              <span className="hdr-drawer-user-email">{user.email}</span>
            </div>
          </div>
        )}

        <div className="hdr-mobile-menu-links">
          <Link 
            to="/" 
            className={`hdr-mobile-link ${pathname === "/" ? "active" : ""}`} 
            onClick={closeMobileMenu}
          >
            <span className="hdr-mobile-link-inner">
              <HiHome className="hdr-link-icon" />
              Home
            </span>
          </Link>

          <Link 
            to="/about" 
            className={`hdr-mobile-link ${pathname === "/about" ? "active" : ""}`} 
            onClick={closeMobileMenu}
          >
            <span className="hdr-mobile-link-inner">
              <HiInformationCircle className="hdr-link-icon" />
              About Us
            </span>
          </Link>

          {!isAdmin && (
            <>
              <Link 
                to="/courses" 
                className={`hdr-mobile-link ${pathname.startsWith("/course") ? "active" : ""}`} 
                onClick={closeMobileMenu}
              >
                <span className="hdr-mobile-link-inner">
                  <HiAcademicCap className="hdr-link-icon" />
                  Courses & Curriculum
                </span>
              </Link>
              <Link 
                to="/ai-tools" 
                className={`hdr-mobile-link ${pathname === "/ai-tools" ? "active" : ""}`} 
                onClick={closeMobileMenu}
              >
                <span className="hdr-mobile-link-inner">
                  <HiSparkles className="hdr-link-icon ai" />
                  AI Study Tools
                </span>
                <span className="hdr-ai-badge">✨ New</span>
              </Link>
            </>
          )}

          {isAuth ? (
            <>
              {isAdmin && (
                <Link 
                  to="/admin/dashboard" 
                  className={`hdr-mobile-link adm ${pathname.startsWith("/admin") ? "active" : ""}`} 
                  onClick={closeMobileMenu}
                >
                  <span className="hdr-mobile-link-inner">
                    <HiViewGrid className="hdr-link-icon" />
                    Admin Panel
                  </span>
                </Link>
              )}
              <Link 
                to="/account" 
                className={`hdr-mobile-link ${pathname === "/account" ? "active" : ""}`} 
                onClick={closeMobileMenu}
              >
                <span className="hdr-mobile-link-inner">
                  <HiUser className="hdr-link-icon" />
                  My Account
                </span>
              </Link>
            </>
          ) : null}
        </div>

        {/* Drawer Footer / Auth Actions */}
        <div className="hdr-mobile-auth-wrap">
          {isAuth ? (
            <button 
              className="hdr-mobile-btn-logout" 
              onClick={handleLogout}
            >
              <HiLogout className="hdr-logout-icon" />
              Log Out
            </button>
          ) : (
            <Link to="/login" className="hdr-mobile-btn-login" onClick={closeMobileMenu}>
              <HiLogin className="hdr-login-icon" />
              Login / Register
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

export default Header;
