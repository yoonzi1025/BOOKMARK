import { useNavigate } from "react-router-dom";
import StatusBadge from "../status/StatusBadge";
import "./MyLibraryBookCard.css";

const MyLibraryBookCard = ({ book, onClickBookCard }) => {
  const nav = useNavigate();

  return (
    <article
      className="my-library-book-card card card-interactive"
      onClick={() => onClickBookCard(book)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClickBookCard(book);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="my-library-book-card-cover">
        <img src={book.cover} alt={book.title} />
      </div>

      <div className="my-library-book-card-body">
        <div className="my-library-book-card-main">
          <h3 className="my-library-book-card-title">{book.title}</h3>
          <p className="my-library-book-card-author ">{book.author}</p>
          <p className="my-library-book-card-description ">
            {book.description}
          </p>
        </div>

        <div className="my-library-book-card-side">
          <StatusBadge readingStatus={book.readingStatus} />

          <button
            type="button"
            className="btn btn-secondary btn-sm my-library-book-card-more"
            onClick={(e) => {
              e.stopPropagation();
              nav(`/book/${book.isbn13}`, { state: { book } });
            }}
          >
            더 보기
          </button>
        </div>
      </div>
    </article>
  );
};

export default MyLibraryBookCard;
