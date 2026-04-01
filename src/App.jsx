import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import BookDetailPage from "./pages/BookDetailPage";
import MyLibraryPage from "./pages/MyLibraryPage";
import StatsPage from "./pages/StatsPage";
import SearchPage from "./pages/SearchPage";
import Notfound from "./pages/Notfound";
import BooksProvider from "./context/books/BooksProvider";
import RecordProvider from "./context/records/RecordProvider";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/scrolltop/ScrollToTop";
import RecommendPage from "./pages/RecommendPage";
import TrendingPage from "./pages/TrendingPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MobileTabBar from "./components/mobile/MobileTabBar";

function App() {
  return (
    <BooksProvider>
      <ScrollToTop />
      <RecordProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book/:isbn13" element={<BookDetailPage />} />
            <Route
              path="/library"
              element={
                <ProtectedRoute>
                  <MyLibraryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/library/:status"
              element={
                <ProtectedRoute>
                  <MyLibraryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stats"
              element={
                <ProtectedRoute>
                  <StatsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/book/recommend" element={<RecommendPage />} />
            <Route path="/book/trending" element={<TrendingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </Layout>
        <MobileTabBar />
      </RecordProvider>
    </BooksProvider>
  );
}

export default App;
