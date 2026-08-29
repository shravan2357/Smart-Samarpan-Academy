import React from "react";
import Sidebar from "./Sidebar";
import "./Admin.css";

const Layout = ({ children }) => {
  return (
    <div className="adm-layout">
      {/* Admin Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="adm-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;