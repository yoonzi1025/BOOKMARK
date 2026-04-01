import { useNavigate } from "react-router-dom";
import Rating from "../common/rating/Rating";
import HomeSection from "./HomeSection";
import "./MyReadingSection.css";
import { useContext, useEffect, useRef, useState } from "react";
import { fetchReadBooksWithRecords } from "../../utils/bookUtils";
import { RecordStateContext } from "../../context/records/RecordProvider";

const MyReadingSection = ({ stats, onMoreClick }) => {
  const nav = useNavigate();
  const records = useContext(RecordStateContext);

  const [readBooks, setReadBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const loadReadBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await fetchReadBooksWithRecords(records);
        setReadBooks(result);
      } catch (error) {
        console.log(error);
        setError("읽은 책 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (records.length) {
      loadReadBooks();
    } else {
      setReadBooks([]);
    }
  }, [records]);

  if (loading) {
    return (
      <HomeSection
        label="MY BOOKS"
        title={`내가 읽은 책 · ${stats}권`}
        description="지금까지 읽은 모든 책"
        moreText="전체 보기"
        onMoreClick={onMoreClick}
      >
        <p className="my-books-empty">불러오는 중...</p>
      </HomeSection>
    );
  }

  if (error) {
    return (
      <HomeSection
        label="MY BOOKS"
        title={`내가 읽은 책 · ${stats}권`}
        description="지금까지 읽은 모든 책"
        moreText="전체 보기"
        onMoreClick={onMoreClick}
      >
        <p className="my-books-empty">{error}</p>
      </HomeSection>
    );
  }

  return (
    <HomeSection
      label="MY BOOKS"
      title={`내가 읽은 책 · ${stats}권`}
      description="지금까지 읽은 모든 책"
      moreText="전체 보기"
      onMoreClick={onMoreClick}
    >
      {readBooks.length === 0 ? (
        <p className="my-books-empty">아직 읽은 책이 없어요.</p>
      ) : (
        <div className="my-books-wrapper">
          <button
            type="button"
            className="my-books-scroll-btn left"
            onClick={() => handleScroll("left")}
            aria-label="왼쪽으로 이동"
          >
            ‹
          </button>

          <div className="my-books-section" ref={scrollRef}>
            {readBooks.map((book) => (
              <div
                key={book.id || book.isbn13}
                className="my-books-section-card"
                onClick={() => nav(`/book/${book.isbn13}`, { state: { book } })}
              >
                <div className="my-books-section-cover">
                  <img src={book.cover} alt={book.title} />
                  <div className="my-books-section-overlay">
                    <span>자세히 보기 →</span>
                  </div>
                </div>

                <div className="my-books-section-info">
                  <h2 className="my-books-section-title">{book.title}</h2>
                  <p className="my-books-section-author">{book.author}</p>

                  <div className="my-books-section-rating">
                    <Rating rating={book.rating || 0} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="my-books-scroll-btn right"
            onClick={() => handleScroll("right")}
            aria-label="오른쪽으로 이동"
          >
            ›
          </button>
        </div>
      )}
    </HomeSection>
  );
};

export default MyReadingSection;
