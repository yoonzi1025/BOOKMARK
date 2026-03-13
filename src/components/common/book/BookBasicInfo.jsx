import { useNavigate } from "react-router-dom";
import "./Book.css";

const BookBasicInfo = ({ book }) => {
  const nav = useNavigate();
  console.log(book);

  return (
    <section
      className="book-card"
      onClick={() => nav(`/books/${book.id}`, { state: { book } })}
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
    </section>
  );
};

export default BookBasicInfo;
