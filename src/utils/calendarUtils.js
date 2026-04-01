import { getStringedDate } from "./dateUtils";

export const getDayBooks = ({ records, date }) => {
  const targetDate = getStringedDate(date);

  return records.filter((record) => {
    return (
      record.readingStatus === "done" &&
      record.endDate &&
      getStringedDate(new Date(record.endDate)) === targetDate
    );
  });
};
