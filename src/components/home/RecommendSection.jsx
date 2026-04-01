import { useNavigate } from "react-router-dom";
import HomeSection from "./HomeSection";
import "./RecommendSection.css";
import { useContext, useEffect, useState } from "react";
import { searchBooks } from "../../api/bookApi";
import { fetchReadBooksWithRecords } from "../../utils/bookUtils";
import { RecordStateContext } from "../../context/records/RecordProvider";
import { getLastCategory, getTopCategory } from "../../utils/recommendUtils";

const RecommendSection = () => {
  const nav = useNavigate();
  const records = useContext(RecordStateContext);

  const [books, setBooks] = useState([]);
  const [topCategory, setTopCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRecommendBooks = async () => {
      try {
        setLoading(true);
        setError("");

        // 1. 읽은 책 상세정보 가져오기
        const readBooks = await fetchReadBooksWithRecords(records);

        // 2. 가장 많이 읽은 카테고리 찾기
        const category = getTopCategory(readBooks);

        // 읽은 책이 적거나 카테고리를 못 찾으면 기본 키워드
        const keyword = category || "소설";

        setTopCategory(keyword);
        // 3. 해당 카테고리로 추천 검색
        const result = await searchBooks(keyword);

        // 중복 책 제거
        const uniqueBooks = result.filter(
          (book, index, self) =>
            index === self.findIndex((b) => b.isbn13 === book.isbn13)
        );

        // 읽은 책 제거
        const readIds = readBooks.map((b) => b.isbn13);
        const notReadBooks = uniqueBooks.filter(
          (book) => !readIds.includes(book.isbn13)
        );

        // 좋아한 책
        const likedBooks = readBooks.filter((b) => b.rating >= 4);
        const likedCategories = likedBooks.map((b) => b.categoryName);

        // 점수계산

        const scoredBooks = notReadBooks.map((book) => {
          let score = 0;

          if (likedCategories.some((cat) => book.categoryName?.includes(cat)))
            score += 3;

          if (book.customerReviewRank >= 8) score += 2;

          return { ...book, score };
        });

        // 정렬 + 랜덤 섞기
        const sorted = scoredBooks.sort((a, b) => b.score - a.score);
        const shuffled = sorted.sort(() => Math.random() - 0.3);

        setBooks(shuffled.slice(0, 4));
      } catch (error) {
        console.log(error);
        setError("추천 책 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    loadRecommendBooks();
  }, [records]);

  return (
    <HomeSection
      label="Recommendation"
      title="취향 기반 추천"
      description={
        topCategory
          ? `최근 독서 취향을 바탕으로 ${topCategory} 분야의 책을 골라봤어요.`
          : "최근 독서 취향을 바탕으로 책을 골라봤어요."
      }
      moreText="전체 보기"
      onMoreClick={() => nav("/book/recommend")}
    >
      <div className="recommend-section">
        {loading ? (
          <p className="recommend-section-message">불러오는 중...</p>
        ) : error ? (
          <p className="recommend-section-message">{error}</p>
        ) : books.length === 0 ? (
          <p className="recommend-section-message">추천 책이 없어요.</p>
        ) : (
          <div className="recommend-section-container">
            {books.map((book) => (
              <div
                className="recommend-section-card"
                key={book.isbn13}
                onClick={() => nav(`/book/${book.isbn13}`, { state: { book } })}
              >
                <div className="recommend-section-cover">
                  <img src={book.cover} alt={book.title} />
                </div>

                <div className="recommend-section-info">
                  <h2 className="recommend-section-title">{book.title}</h2>
                  <p className="recommend-section-author">{book.author}</p>
                  <p className="recommend-section-description">
                    {book.description}
                  </p>
                  <p className="recommend-section-category">
                    {getLastCategory(book.categoryName)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </HomeSection>
  );
};

export default RecommendSection;
