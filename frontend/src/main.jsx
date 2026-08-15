import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { CourseContextProvider } from "./context/CourseContext.jsx";
import 'katex/dist/katex.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google'; // NEW: Import GoogleOAuthProvider

// Configurable backend server URL via environment variable with localhost fallback
export const server = import.meta.env.VITE_SERVER || "http://localhost:5175";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* NEW: Wrap with GoogleOAuthProvider */}
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserContextProvider>
        <CourseContextProvider>
          <App />
        </CourseContextProvider>
      </UserContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
