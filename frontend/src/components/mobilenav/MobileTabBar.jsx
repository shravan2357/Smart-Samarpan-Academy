import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HiHome, HiOutlineHome,
  HiAcademicCap, HiOutlineAcademicCap,
  HiSparkles, HiOutlineSparkles,
  HiUser, HiOutlineUser,
  HiViewGrid, HiOutlineViewGrid,
  HiLogin, HiOutlineLogin
} from 'react-icons/hi';
import { UserData } from '../../context/UserContext';
import './MobileTabBar.css';

const MobileTabBar = () => {
  const { isAuth, user } = UserData();
  const location = useLocation();
  const pathname = location.pathname;
  const isAdmin = user && user.role === 'admin';

  // Do not show tab bar inside active study / lecture mode to maximize screen
  if (pathname.includes('/course/study') || pathname.includes('/lectures/')) {
    return null;
  }

  const isHomeActive = pathname === '/';
  const isCoursesActive = pathname === '/courses' || pathname.startsWith('/course/');
  const isAiActive = pathname === '/ai-tools';
  const isAdminActive = pathname.startsWith('/admin');
  const isAccountActive = pathname === '/account' || pathname.includes('/dashboard');
  const isLoginActive = pathname === '/login' || pathname === '/register' || pathname === '/verify';

  return (
    <nav className="sma-mobile-tab-bar" aria-label="Mobile Navigation Tabs">
      <div className="sma-tab-container">
        {/* Tab: Home */}
        <Link 
          to="/" 
          className={`sma-tab-item ${isHomeActive ? "active" : ""}`}
          aria-current={isHomeActive ? "page" : undefined}
        >
          <div className="sma-tab-icon-wrap">
            {isHomeActive ? <HiHome className="sma-tab-icon" /> : <HiOutlineHome className="sma-tab-icon" />}
          </div>
          <span className="sma-tab-label">Home</span>
        </Link>

        {/* Tab: Courses (or Admin if Admin) */}
        {!isAdmin ? (
          <Link 
            to="/courses" 
            className={`sma-tab-item ${isCoursesActive ? "active" : ""}`}
            aria-current={isCoursesActive ? "page" : undefined}
          >
            <div className="sma-tab-icon-wrap">
              {isCoursesActive ? <HiAcademicCap className="sma-tab-icon" /> : <HiOutlineAcademicCap className="sma-tab-icon" />}
            </div>
            <span className="sma-tab-label">Courses</span>
          </Link>
        ) : (
          <Link 
            to="/admin/dashboard" 
            className={`sma-tab-item ${isAdminActive ? "active" : ""}`}
            aria-current={isAdminActive ? "page" : undefined}
          >
            <div className="sma-tab-icon-wrap">
              {isAdminActive ? <HiViewGrid className="sma-tab-icon" /> : <HiOutlineViewGrid className="sma-tab-icon" />}
            </div>
            <span className="sma-tab-label">Admin</span>
          </Link>
        )}

        {/* Tab: AI Tools */}
        {!isAdmin && (
          <Link 
            to="/ai-tools" 
            className={`sma-tab-item ${isAiActive ? "active" : ""}`}
            aria-current={isAiActive ? "page" : undefined}
          >
            <div className="sma-tab-icon-wrap">
              {isAiActive ? <HiSparkles className="sma-tab-icon ai" /> : <HiOutlineSparkles className="sma-tab-icon ai" />}
              <span className="sma-tab-badge-dot" />
            </div>
            <span className="sma-tab-label">AI Tools</span>
          </Link>
        )}

        {/* Tab: Account / Auth */}
        {isAuth ? (
          <Link 
            to="/account" 
            className={`sma-tab-item ${isAccountActive ? "active" : ""}`}
            aria-current={isAccountActive ? "page" : undefined}
          >
            <div className="sma-tab-icon-wrap">
              {isAccountActive ? <HiUser className="sma-tab-icon" /> : <HiOutlineUser className="sma-tab-icon" />}
            </div>
            <span className="sma-tab-label">Account</span>
          </Link>
        ) : (
          <Link 
            to="/login" 
            className={`sma-tab-item ${isLoginActive ? "active" : ""}`}
            aria-current={isLoginActive ? "page" : undefined}
          >
            <div className="sma-tab-icon-wrap">
              {isLoginActive ? <HiLogin className="sma-tab-icon" /> : <HiOutlineLogin className="sma-tab-icon" />}
            </div>
            <span className="sma-tab-label">Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default MobileTabBar;
