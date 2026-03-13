/* 책 + 기록 합치기 */
export const mergeBooksWithRecords = (books, records) => {
  return books.map((book) => {
    const record = records.find(
      (record) => String(record.bookId) === String(book.id)
    );

    return {
      ...book,
      record,
      // readingStatus: record?.readingStatus || "want",
    };
  });
};

export const booksWithRecordsOnly = (books, records) => {
  return mergeBooksWithRecords(books, records).filter((book) => book.record);
};
