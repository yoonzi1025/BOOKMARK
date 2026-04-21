import { useNavigate } from "react-router-dom";
import "./BookGridPage.css";
import { useEffect, useState } from "react";
import { fetchTrendingBooks } from "../api/bookApi";
import { getLastCategory } from "../utils/recommendUtils";
import SkeletonCard from "../components/common/skeleton/SkeletonCard";

const TrendingPage = () => {
  const nav = useNavigate();

  const [trendingBooks, setTrendingBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrendingBooks = async () => {
      try {
        setLoading(true);
        const books = await fetchTrendingBooks();
        setTrendingBooks(books);
      } catch (error) {
        console.log(error);
        setTrendingBooks([]);
      } finally {
        setLoading(false);
      }
    };

    loadTrendingBooks();
  }, []);

  if (loading) {
    return (
      <section className="book-grid-page">
        <div className="book-grid-page-header">
          <p className="book-grid-page-label">TRENDING</p>
          <h1 className="book-grid-page-title">지금 인기 있는 책</h1>
          <p className="book-grid-page-desc">인기 책을 불러오는 중...</p>
        </div>

        <div className="book-grid">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="book-grid-page">
      <div className="book-grid-page-header">
        <p className="book-grid-page-label">TRENDING</p>
        <h1 className="book-grid-page-title">지금 인기 있는 책</h1>
      </div>

      <div className="book-grid">
        {trendingBooks.map((book) => {
          return (
            <div
              className="book-grid-card"
              key={book.isbn13}
              onClick={() => nav(`/book/${book.isbn13}`, { state: { book } })}
            >
              <div className="book-grid-cover-wrap">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="book-grid-cover"
                />
              </div>

              <div className="book-grid-info">
                <h3 className="book-grid-title">{book.title}</h3>
                <p className="book-grid-author">{book.author}</p>
                {book.categoryName && (
                  <p className="book-grid-category">
                    {getLastCategory(book.categoryName)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrendingPage;
