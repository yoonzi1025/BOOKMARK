import "./BookList.css";
import BookCard from "./BookCard";

const BookList = ({ books }) => {
  return (
    <section className="book-list-wrapper">
      <div className="book-list">
        {books.map((book) => (
          <BookCard key={book.isbn13} book={book} />
        ))}
      </div>
    </section>
  );
};

export default BookList;
