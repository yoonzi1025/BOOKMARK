import { useNavigate } from "react-router-dom";
import "./Book.css";

const BookBasicInfo = ({ book }) => {
  const nav = useNavigate();
  return (
    <section
      className="book-card"
      onClick={() => nav(`../../books/${book.bookId}`, { state: { book } })}
    >
      {/* 책 표지 */}
      <div className="book-cover">
        <img src={book.cover} alt="책 이미지" />
      </div>
      {/* 정보 */}
      <div className="book-content">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <p className="book-info">{book.summary}</p>
      </div>
      <div className="book-more">
        <button
          className="more-btn"
          onClick={(e) => {
            e.stopPropagation();
            nav(`/books/${book.bookId}`);
          }}
        >
          더 보기
        </button>
      </div>
    </section>
  );
};

export default BookBasicInfo;
