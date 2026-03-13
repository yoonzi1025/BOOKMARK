import ReadingCalendar from "../components/calendar/ReadingCalendar";
import MonthlyReadingChart from "../components/charts/MonthlyReadingChart";

const ReadingLogPage = () => {
  return (
    <div>
      <ReadingCalendar />
      <MonthlyReadingChart />
    </div>
  );
};

export default ReadingLogPage;
