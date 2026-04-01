import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookList from "../components/book/BookList";
import { searchBooks } from "../api/bookApi";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const query = searchParams.get("q") || "";

  useEffect(() => {
    const fetchBooks = async () => {
      if (!query.trim()) {
        setBooks([]);
        return;
      }

      setLoading(true);
      try {
        const result = await searchBooks(query);
        setBooks(result || []);
      } catch (error) {
        console.error("검색 실패:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return (
    <div className="search-page" style={{ marginTop: "20px" }}>
      <h2>“{query}” 검색 결과</h2>

      {loading ? (
        <p>불러오는 중...</p>
      ) : books.length > 0 ? (
        <BookList books={books} />
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default SearchPage;
