import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import RecordProvider from "./context/records/RecordProvider";
import BookProvider from "./context/books/BooksProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <BookProvider>
      <RecordProvider>
        <App />
      </RecordProvider>
    </BookProvider>
  </BrowserRouter>
);
