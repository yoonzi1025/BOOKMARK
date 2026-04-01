// 검색
export const searchBooks = async (query) => {
  const res = await fetch(
    `http://127.0.0.1:5001/bookmark-85b7b/us-central1/searchBooks?q=${query}`
  );

  const data = await res.json();
  return data.item;
};

// 상세
export const getBookDetail = async (isbn13) => {
  const res = await fetch(
    `http://127.0.0.1:5001/bookmark-85b7b/us-central1/getBookDetail?isbn13=${isbn13}`
  );

  const data = await res.json();
  return data;
};

// 카테고리 기반 추천 책
export const fetchRecommendBooksByCategory = async (category) => {
  const res = await fetch(
    `http://127.0.0.1:5001/bookmark-85b7b/us-central1/getRecommendBooksByCategory?category=${encodeURIComponent(
      category
    )}`
  );
  const data = await res.json();
  return data || [];
};

// 인기 책
export const fetchTrendingBooks = async () => {
  const res = await fetch(
    `http://127.0.0.1:5001/bookmark-85b7b/us-central1/getTrendingBooks`
  );

  const data = await res.json();
  return data || [];
};
