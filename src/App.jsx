import { Route, Routes } from "react-router-dom";
import "./App.css";
import BooksPage from "./pages/BooksPage";
import BooksDetail from "./pages/BooksDetail";
import MyPage from "./pages/MyPage";
import Notfound from "./pages/Notfound";
import BooksProvider from "./context/books/BooksProvider";
import RecordProvider from "./context/records/RecordProvider";
import Layout from "./components/layout/Layout";
import StatsPage from "./pages/StatsPage";

function App() {
  return (
    <BooksProvider>
      <RecordProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/books/:bookId" element={<BooksDetail />} />
            <Route path="/records/mypage" element={<MyPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </Layout>
      </RecordProvider>
    </BooksProvider>
  );
}

export default App;
