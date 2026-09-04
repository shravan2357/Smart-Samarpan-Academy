import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Admin.css";
import { HiMenuAlt2 } from "react-icons/hi";

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem("adm_sidebar_collapsed") === "true";
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("adm_sidebar_collapsed", String(next));
      return next;
    });
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className={`adm-layout ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      {/* Mobile Overlay */}
      <div 
        className={`adm-mobile-overlay ${isMobileOpen ? "open" : ""}`}
        onClick={closeMobileSidebar}
      />

      {/* Admin Sidebar */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        toggleCollapse={toggleCollapse}
        isMobileOpen={isMobileOpen}
        closeMobileSidebar={closeMobileSidebar}
      />

      {/* Main Content Area */}
      <div className="adm-content-wrapper">
        {/* Mobile Admin Top Bar */}
        <div className="adm-mobile-header">
          <button 
            className="adm-mobile-toggle-btn"
            onClick={toggleMobileSidebar}
            aria-label="Toggle Admin Menu"
          >
            <HiMenuAlt2 />
            <span>Admin Menu</span>
          </button>
        </div>

        <div className="adm-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;