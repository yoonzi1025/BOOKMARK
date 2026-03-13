import { useState } from "react";
import BookList from "../components/common/book/BookList";
import Navbar from "../components/common/navbar/Navbar";
import { MOCK_BOOKS } from "../constants/mockBooks";

const BooksPage = () => {
  const [books] = useState(MOCK_BOOKS);
  return (
    <div>
      <BookList books={books} />
    </div>
  );
};

export default BooksPage;
