import "./StatsPage.css";
import { useContext } from "react";
import ReadingCalendar from "../components/calendar/ReadingCalendar";
import MonthlyReadingChart from "../components/charts/MonthlyReadingChart";
import { RecordStateContext } from "../context/records/RecordProvider";
import { getMonthlyDoneData } from "../utils/stats-utils";

const StatsPage = () => {
  const records = useContext(RecordStateContext);
  const chartData = getMonthlyDoneData(records);

  return (
    <div className="status-page">
      <div className="status-section">
        <ReadingCalendar />
        <MonthlyReadingChart data={chartData} />
      </div>
    </div>
  );
};

export default StatsPage;
