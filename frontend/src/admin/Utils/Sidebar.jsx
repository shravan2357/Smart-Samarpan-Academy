import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt, FaPlus } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight, HiX } from "react-icons/hi";
import { UserData } from "../../context/UserContext";

const Sidebar = ({ isCollapsed, toggleCollapse, isMobileOpen, closeMobileSidebar }) => {
  const { user } = UserData();
  const location = useLocation();

  const navLinks = [
    { to: "/admin/dashboard", icon: AiFillHome, text: "Dashboard", role: "all" },
    { to: "/admin/course", icon: FaBook, text: "Manage Courses", role: "all" },
    { to: "/admin/course/add", icon: FaPlus, text: "Add Course", role: "all" },
    { to: "/admin/users", icon: FaUserAlt, text: "Manage Users", role: "all" },
  ];

  return (
    <aside className={`adm-sidebar ${isCollapsed ? "collapsed" : ""} ${isMobileOpen ? "mobile-open" : ""}`}>
      {/* Brand and Toggle Header */}
      <div className="adm-sidebar-header">
        <div className="adm-sidebar-brand-wrap">
          {!isCollapsed ? (
            <span className="adm-sidebar-brand">Samarpan Admin</span>
          ) : (
            <span className="adm-sidebar-brand-collapsed" title="Samarpan Admin">SMA</span>
          )}
        </div>

        {/* Desktop Minimize/Expand Button */}
        <button 
          className="adm-sidebar-toggle-btn"
          onClick={toggleCollapse}
          title={isCollapsed ? "Expand Sidebar" : "Minimize Sidebar"}
          aria-label={isCollapsed ? "Expand Sidebar" : "Minimize Sidebar"}
        >
          {isCollapsed ? <HiChevronRight /> : <HiChevronLeft />}
        </button>

        {/* Mobile Close Button */}
        <button 
          className="adm-sidebar-mobile-close"
          onClick={closeMobileSidebar}
          aria-label="Close Sidebar"
        >
          <HiX />
        </button>
      </div>

      {/* Nav Links */}
      <ul className="adm-nav-list">
        {navLinks.map((link, index) => {
          if (link.role === "superadmin" && user && user.mainrole !== "superadmin") {
            return null;
          }
          const isActive = location.pathname === link.to;
          return (
            <li key={index} className="adm-nav-item">
              <Link 
                to={link.to} 
                className={`adm-nav-link ${isActive ? 'active' : ''}`}
                title={isCollapsed ? link.text : undefined}
                onClick={closeMobileSidebar}
              >
                <link.icon className="adm-nav-icon" />
                <span className="adm-nav-text">{link.text}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer / Logout */}
      <div className="adm-sidebar-footer">
        <Link 
          to="/account" 
          className="adm-nav-link logout"
          title={isCollapsed ? "Logout" : undefined}
          onClick={closeMobileSidebar}
        >
          <AiOutlineLogout className="adm-nav-icon" />
          <span className="adm-nav-text">Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;