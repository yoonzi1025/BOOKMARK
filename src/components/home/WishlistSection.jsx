import { useNavigate } from "react-router-dom";
import HomeSection from "./HomeSection";
import "./WishlistSection.css";
import { useContext, useMemo, useRef } from "react";
import {
  RecordDispatchContext,
  RecordStateContext,
} from "../../context/records/RecordProvider";

const WishlistSection = ({ onMoreClick }) => {
  const nav = useNavigate();
  const records = useContext(RecordStateContext);
  const { onUpdate } = useContext(RecordDispatchContext);

  const scrollRef = useRef(null);

  const wishlistBooks = useMemo(() => {
    return records.filter((record) => record.readingStatus === "want");
  }, [records]);

  const handleStartReading = (book) => {
    onUpdate({
      ...book,
      readingStatus: "reading",
      startDate: book.startDate || new Date().toISOString().slice(0, 10),
    });
  };

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <HomeSection
      label="WISHLIST"
      title={`읽고 싶은 책 · ${wishlistBooks.length}권`}
      description="다음에 읽고 싶은 책을 모아봤어요."
      moreText="전체 보기"
      onMoreClick={onMoreClick}
    >
      <div className="wishlist-section">
        {wishlistBooks.length === 0 ? (
          <p className="wishlist-section-message">읽고 싶은 책이 없어요.</p>
        ) : (
          <div className="wishlist-wrapper">
            <button
              type="button"
              className="wishlist-scroll-btn left"
              onClick={() => handleScroll("left")}
            >
              ‹
            </button>

            <div className="wishlist-section-container" ref={scrollRef}>
              {wishlistBooks.map((book) => (
                <div
                  key={book.id}
                  className="wishlist-section-card"
                  onClick={() => {
                    if (!book.isbn13) {
                      alert("이 책은 상세페이지로 이동할 id가 없어요.");
                      return;
                    }

                    nav(`/book/${book.isbn13}`, { state: { book } });
                  }}
                >
                  <div className="wishlist-section-cover">
                    <img src={book.cover} alt={book.title} />
                  </div>

                  <div className="wishlist-section-info">
                    <h3 className="wishlist-section-title">{book.title}</h3>
                    <p className="wishlist-section-author">{book.author}</p>

                    <button
                      type="button"
                      className="btn btn-sm btn-primary wishlist-section-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartReading(book);
                        nav(`/book/${book.isbn13}`, { state: { book } });
                      }}
                    >
                      읽기 시작
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="wishlist-scroll-btn right"
              onClick={() => handleScroll("right")}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </HomeSection>
  );
};

export default WishlistSection;
