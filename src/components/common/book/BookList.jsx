import "./Book.css";
import { useState } from "react";
import BookBasicInfo from "./BookBasicInfo";

const BookList = ({ books }) => {
  const [sortType, setSortType] = useState("oldest");

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedDate = () => {
    return books.toSorted((a, b) => {
      if (sortType === "oldest")
        return Number(a.createdDate) - Number(b.createdDate);
      if (sortType === "latest")
        return Number(b.createdDate) - Number(a.createdDate);
      if (sortType === "rating") return Number(b.rating) - Number(a.rating);
      if (sortType === "title") return a.title.localeCompare(b.title);
    });
  };

  const sortedData = getSortedDate();

  return (
    <section className="book-list">
      <div className="menu-bar">
        <select
          className="sort-select"
          value={sortType}
          onChange={onChangeSortType}
        >
          <option value="oldest">오래된순</option>
          <option value="latest">최신순</option>
          <option value="rating">평점순</option>
          <option value="title">제목순</option>
        </select>
      </div>
      <div className="list-wrapper">
        {sortedData.map((book) => (
          <BookBasicInfo key={book.bookId} book={book} />
        ))}
      </div>
    </section>
  );
};

export default BookList;
