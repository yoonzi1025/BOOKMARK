import { mergeBooksWithRecords } from "./book-utils";
import { getStringedDate } from "./date-utils";

export const getDayBooks = ({ books, records, date }) => {
  const dateStr = getStringedDate(new Date(date));

  const booksWithRecord = mergeBooksWithRecords(books, records);

  return booksWithRecord.filter(
    (book) =>
      book.record?.readingStatus === "done" &&
      getStringedDate(new Date(book.record?.endDate)) === dateStr
  );
};

// const dayBooks = booksWithRecord.filter(
//     (book) =>
//       book.record?.readingStatus === "done" &&
//       getStringedDate(new Date(book.record?.endDate)) === dateStr
//   );

//   return dayBooks;
