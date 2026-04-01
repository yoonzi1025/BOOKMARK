import { useNavigate } from "react-router-dom";
import "./BookCard.css";

const BookCard = ({ book }) => {
  const nav = useNavigate();

  if (!book) return null;

  const handleClick = () => {
    localStorage.setItem("selectedBook", JSON.stringify(book));
    nav(`/book/${book.isbn13}`, { state: { book } });
  };

  return (
    <div className="book-card" onClick={handleClick}>
      {/* 책 표지 */}
      <div className="book-card-cover">
        <img src={book.cover} alt={book.title} />
      </div>
      {/* 정보 */}
      <div className="book-card-content">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">{book.author}</p>
        <p className="book-card-description">{book.description}</p>
      </div>
    </div>
  );
};

export default BookCard;
