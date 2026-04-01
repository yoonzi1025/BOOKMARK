// categoryName에서 추천용 카테고리 뽑기
export const getRecommendCategory = (categoryName) => {
  if (!categoryName) return "";

  const parts = categoryName.split(">").map((item) => item.trim());

  if (parts.length < 2) {
    return parts[0] || "";
  }

  // 보통 뒤에서 두 번째 카테고리를 추천 기준으로 사용
  return parts[parts.length - 2];
};

// 책 목록에서 가장 많이 읽은 카테고리 찾기
export const getTopCategory = (books) => {
  if (!books || books.length === 0) return "";

  // 카테고리별 개수 저장 객체
  const countMap = {};

  books.forEach((book) => {
    const category = getRecommendCategory(book.categoryName);

    if (!category) return;

    countMap[category] = (countMap[category] || 0) + 1;
  });

  let topCategory = "";
  let maxCount = 0;

  for (const category in countMap) {
    if (countMap[category] > maxCount) {
      maxCount = countMap[category];
      topCategory = category;
    }
  }

  return topCategory;
};

export const getLastCategory = (categoryName) => {
  return categoryName?.split(">").pop().trim();
};
