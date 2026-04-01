// 완독 책 isbn13 목록 뽑기
export const getReadBookIds = (records) => {
  return records
    .filter((record) => record.readingStatus === "done" && record.isbn13)
    .map((record) => String(record.isbn13));
};

/* 책 + 기록 합치기 */
export const mergeBooksWithRecords = (books, records) => {
  return books.map((book) => {
    const record = records.find(
      (record) => String(record.isbn13) === String(book.isbn13)
    );

    return {
      ...book,
      record,
      ...(record || {}),
      readingStatus: record?.readingStatus || "want",
      rating: record?.rating ?? 0,
      comment: record?.comment || "",
      startDate: record?.startDate || "",
      endDate: record?.endDate || "",
      createdDate: record?.createdDate || "",
      recordId: record?.id || null,
    };
  });
};

export const fetchReadBooksWithRecords = (records) => {
  return records.filter((record) => record.readingStatus === "done");
};
