import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import RecordProvider from "./context/records/RecordProvider";
import BookProvider from "./context/books/BooksProvider.jsx";
import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/common.css";
import "./index.css";
import AuthProvider from "./context/auth/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <BookProvider>
        <RecordProvider>
          <App />
        </RecordProvider>
      </BookProvider>
    </AuthProvider>
  </BrowserRouter>
);
