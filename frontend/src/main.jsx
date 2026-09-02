import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { CourseContextProvider } from "./context/CourseContext.jsx";
import 'katex/dist/katex.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google'; // NEW: Import GoogleOAuthProvider

// Configurable backend server URL: Auto-detects Localhost vs Production environment
export const server =
  import.meta.env.VITE_SERVER && !import.meta.env.VITE_SERVER.includes("localhost")
    ? import.meta.env.VITE_SERVER
    : (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"))
    ? "http://localhost:5175"
    : "https://smart-samarpan-academy-backend.onrender.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap with GoogleOAuthProvider */}
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "1062715092783-h79kkhe4rdce6cg2qcoduqir56gktin2.apps.googleusercontent.com"}>
      <UserContextProvider>
        <CourseContextProvider>
          <App />
        </CourseContextProvider>
      </UserContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
