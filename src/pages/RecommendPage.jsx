import { useNavigate } from "react-router-dom";
import "./BookGridPage.css";
import { useContext, useEffect, useState } from "react";
import { RecordStateContext } from "../context/records/RecordProvider";
import { fetchReadBooksWithRecords } from "../utils/bookUtils";
import { getLastCategory, getTopCategory } from "../utils/recommendUtils";
import {
  fetchRecommendBooksByCategory,
  fetchTrendingBooks,
} from "../api/bookApi";

const RecommendPage = () => {
  const nav = useNavigate();
  const records = useContext(RecordStateContext);

  const [recommendBooks, setRecommendBooks] = useState([]);
  const [topCategory, setTopCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const loadRecommendBooks = async () => {
      try {
        setLoading(true);

        const readBooks = fetchReadBooksWithRecords(records);

        // 완독 3권 미만이면 추천 대신 인기책 보여주기
        if (readBooks.length < 3) {
          const books = await fetchTrendingBooks();
          setRecommendBooks(books || []);
          setTopCategory("");
          setIsFallback(true);
          return;
        }

        const category = getTopCategory(readBooks);
        setTopCategory(category);

        if (!category) {
          const books = await fetchTrendingBooks();
          setRecommendBooks(books || []);
          setIsFallback(true);
          return;
        }

        const books = await fetchRecommendBooksByCategory(category);
        setRecommendBooks(books || []);
        setIsFallback(false);
      } catch (error) {
        console.error(error);
        setRecommendBooks([]);
        setTopCategory("");
        setIsFallback(true);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendBooks();
  }, [records]);

  if (loading) {
    return <div className="book-grid-page-state">추천 책을 불러오는 중...</div>;
  }

  if (!recommendBooks.length) {
    return (
      <section className="book-grid-page">
        <div className="book-grid-page-header">
          <p className="book-grid-page-label">RECOMMEND</p>
          <h1 className="book-grid-page-title">내 취향 기반 추천</h1>
          <p className="book-grid-page-desc">
            아직 추천 기준이 부족해요. 완독한 책이 쌓이면 취향에 맞춰
            추천해드릴게요.
          </p>
        </div>

        <div className="book-grid-empty">
          <div className="book-grid-empty-icon">📚</div>
          <h2 className="book-grid-empty-title">아직 추천할 책이 없어요</h2>
          <p className="book-grid-empty-desc">
            완독한 책이 생기면 자주 읽은 분야를 바탕으로 추천해드릴게요.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="book-grid-page">
      <div className="book-grid-page-header">
        <p className="book-grid-page-label">RECOMMEND</p>
        <h1 className="book-grid-page-title">내 취향 기반 추천</h1>

        {isFallback ? (
          <p className="book-grid-page-desc">
            아직 추천 기준이 부족해서 지금 인기 있는 책을 보여드려요.
          </p>
        ) : (
          <p className="book-grid-page-desc">
            최근 독서 기록을 바탕으로 <strong>{topCategory}</strong> 분야를
            추천했어요.
          </p>
        )}

        <div className="book-grid-page-badge-wrap">
          <span className="book-grid-page-badge">
            {isFallback ? "추천 기준" : "많이 읽은 분야"}
          </span>
          <span className="book-grid-page-category">
            {isFallback ? "인기 책" : topCategory}
          </span>
        </div>
      </div>

      <div className="book-grid">
        {recommendBooks.map((book) => {
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

export default RecommendPage;
