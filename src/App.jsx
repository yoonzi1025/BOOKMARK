import { Route, Routes } from "react-router-dom";
import "./App.css";
import BooksPage from "./pages/BooksPage";
import BooksDetail from "./pages/BooksDetail";
import MyPage from "./pages/MyPage";
import ReadingLogPage from "./pages/ReadingLogPage";
import Notfound from "./pages/Notfound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BooksPage />} />
      <Route path="/books/:bookId" element={<BooksDetail />} />
      <Route path="/records/mypage" element={<MyPage />} />
      <Route path="/records/reading-log" element={<ReadingLogPage />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
