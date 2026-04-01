const functions = require("firebase-functions");
const fetch = require("node-fetch");

// 검색
exports.searchBooks = functions.https.onRequest(async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({
      error: "검색어(q)가 필요합니다.",
    });
  }

  try {
    const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbyoooon_ji1713001&Query=${encodeURIComponent(
      query
    )}&QueryType=Keyword&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`;
    const response = await fetch(url);
    const text = await response.text();
    const data = JSON.parse(text);

    res.set("Access-Control-Allow-Origin", "*");
    return res.status(200).json(data);
  } catch (error) {
    console.error("알라딘 API 호출 실패:", error);
    return res.status(500).json({
      error: "알라딘 API 호출 중 오류가 발생했습니다.",
      detail: error.message,
    });
  }
});

// 상세페이지
exports.getBookDetail = functions.https.onRequest(async (req, res) => {
  const isbn13 = req.query.isbn13;

  if (!isbn13) {
    return res.status(400).json({
      error: "isbn13이 필요합니다.",
    });
  }

  try {
    const url = `https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=ttbyoooon_ji1713001&itemIdType=ISBN13&ItemId=${isbn13}&output=js&Version=20131101`;

    const response = await fetch(url);
    const text = await response.text();
    const data = JSON.parse(text);

    res.set("Access-Control-Allow-Origin", "*");
    return res.status(200).json(data.item[0]);
  } catch (error) {
    console.error("알라딘 상세 API 호출 실패:", error);
    return res.status(500).json({
      error: "알라딘 상세 API 호출 중 오류가 발생했습니다.",
    });
  }
});

// 인기 책
exports.getTrendingBooks = functions.https.onRequest(async (req, res) => {
  try {
    const url = `https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbyoooon_ji1713001&QueryType=Bestseller&MaxResults=30&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`;

    const response = await fetch(url);
    const text = await response.text();
    const data = JSON.parse(text);

    res.set("Access-Control-Allow-Origin", "*");
    return res.status(200).json(data.item);
  } catch (error) {
    console.error("알라딘 인기 책 API 호출 실패:", error);
    return res.status(500).json({
      error: "알라딘 인기 책 API 호출 중 오류가 발생했습니다.",
    });
  }
});

// 카테고리 기반 추천 책
exports.getRecommendBooksByCategory = functions.https.onRequest(
  async (req, res) => {
    const category = req.query.category;

    if (!category) {
      return res.status(400).json({
        error: "category 없습니다.",
      });
    }

    try {
      const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbyoooon_ji1713001&Query=${encodeURIComponent(
        category
      )}&QueryType=Keyword&MaxResults=30&SearchTarget=Book&output=js&Version=20131101&Cover=Big`;

      const response = await fetch(url);
      const text = await response.text();
      const data = JSON.parse(text);

      res.set("Access-Control-Allow-Origin", "*");
      return res.status(200).json(data.item || []);
    } catch (error) {
      console.error("알라딘 추천 책 API 호출 실패:", error);
      return res.status(500).json({
        error: "알라딘 추천 책 API 호출 중 오류가 발생했습니다.",
      });
    }
  }
);
