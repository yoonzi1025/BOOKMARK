import { useLocation } from "react-router-dom";

import Navbar from "../components/common/navbar/Navbar";
import BookDetailInfo from "../components/common/book/BookDetailInfo";

const BooksDetail = () => {
  const { state } = useLocation();

  const book = state.book;

  if (!book) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: 16 }}>책 정보를 불러올 수 없어요.</div>
      </div>
    );
  }

  return (
    <div>
      <BookDetailInfo book={book} />
    </div>
  );
};

export default BooksDetail;
