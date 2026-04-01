import "./MyLibraryList.css";
import MyLibraryBookCard from "./MyLibraryBookCard";

const MyLibraryList = ({ filteredBooks, onClickBookCard }) => {
  if (filteredBooks.length === 0) {
    return (
      <div className="my-library-book-empty empty-box">책이 없습니다.</div>
    );
  }
  return (
    <div className="my-library-book-list">
      {filteredBooks.map((book) => (
        <MyLibraryBookCard
          key={book.id}
          onClickBookCard={onClickBookCard}
          book={book}
        />
      ))}
    </div>
  );
};

export default MyLibraryList;
