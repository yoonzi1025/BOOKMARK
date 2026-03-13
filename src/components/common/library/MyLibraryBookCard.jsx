import { useNavigate } from "react-router-dom";
import StatusBadge from "../status/StatusBadge";
import "./MyLibraryBookCard.css";

const MyLibraryBookCard = ({ filterBooks, onClickBookCard }) => {
  const nav = useNavigate();
  return (
    <div className="library-book-wrapper">
      <div className="library-book">
        {filterBooks.map((book) => (
          <div
            className="library-book-card"
            key={book.id}
            onClick={() => onClickBookCard(book)}
          >
            <div className="library-book-cover">
              <img src={book.cover} alt="책 이미지" />
            </div>

            <div className="library-book-content">
              <h3 className="library-book-title">{book.title}</h3>
              <p className="library-book-author">{book.author}</p>
              <p className="book-info">{book.summary}</p>
            </div>

            <div className="library-book-side">
              <StatusBadge readingStatus={book.readingStatus} />
              <button
                className="more-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  nav(`/books/${book.id}`, { state: { book } });
                }}
              >
                더 보기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLibraryBookCard;
