import { useNavigate } from "react-router-dom";
import HomeSection from "./HomeSection";
import "./TrendingSection.css";
import { useEffect, useState } from "react";
import { searchBooks } from "../../api/bookApi";

const TrendingSection = () => {
  const nav = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRecommendBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await searchBooks("베스트셀러");
        setBooks(result.slice(0, 4));
      } catch (error) {
        console.log(error);
        setError("인기 있는 책 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    loadRecommendBooks();
  }, []);

  return (
    <HomeSection
      label="TRENDING"
      title="지금 인기있는 책"
      description="오늘의 선택"
      moreText="전체 보기"
      onMoreClick={() => nav("/book/trending")}
    >
      <div className="trending-section">
        {loading ? (
          <p className="trending-section-message">불러오는 중...</p>
        ) : error ? (
          <p className="trending-section-message">{error}</p>
        ) : books.length === 0 ? (
          <p className="trending-section-message">추천 책이 없어요.</p>
        ) : (
          <div className="trending-section-container">
            {books.map((book, index) => (
              <div
                key={book.isbn13}
                className="trending-section-item"
                onClick={() => nav(`/book/${book.isbn13}`, { state: { book } })}
              >
                <div className="trending-section-rank">{index + 1}</div>

                <div className="trending-section-cover">
                  <img src={book.cover} alt={book.title} />
                </div>

                <div className="trending-section-info">
                  <h3 className="trending-section-title">{book.title}</h3>
                  <p className="trending-section-author">{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </HomeSection>
  );
};

export default TrendingSection;
