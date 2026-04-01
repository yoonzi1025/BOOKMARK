import "./StatsPage.css";
import { useContext, useMemo } from "react";
import ReadingCalendar from "../components/calendar/ReadingCalendar";
import MonthlyReadingChart from "../components/charts/MonthlyReadingChart";
import ReadingStatusChart from "../components/charts/ReadingStatusChart.jsx";
import { RecordStateContext } from "../context/records/RecordProvider";
import {
  getBooksTotalStats,
  getMonthlyAverage,
  getMonthlyDoneData,
  getReadingStatusData,
} from "../utils/statsUtils.js";

const StatsPage = () => {
  const records = useContext(RecordStateContext);

  const monthlyChartData = useMemo(() => {
    return getMonthlyDoneData(records);
  }, [records]);

  const statusChartData = useMemo(() => {
    return getReadingStatusData(records);
  }, [records]);

  const stats = getBooksTotalStats(records);
  const monthlyAvg = getMonthlyAverage(records);

  return (
    <div className="stats-page-wrapper">
      <div className="stats-page-container">
        <section className="stats-page-section">
          <div className="stats-page-header">
            <p className="stats-page-label">READING DASHBOARD</p>
            <h1 className="stats-page-title">독서 기록</h1>
            <p className="stats-page-description">
              나의 독서 흐름과 완독 기록을 한눈에 확인하세요.
            </p>
          </div>

          <div className="stats-summary">
            <div className="stats-box">
              <div className="stats-label">올해 완독</div>
              <div className="stats-num">
                {stats.done}
                <span className="stats-unit">권</span>
              </div>
            </div>

            <div className="stats-box">
              <div className="stats-label">월 평균</div>
              <div className="stats-num">
                {monthlyAvg}
                <span className="stats-unit">권</span>
              </div>
            </div>
          </div>

          <div className="stats-chart-wrapper">
            <div className="stats-chart-left">
              <div className="stats-chart-card">
                <h3 className="stats-chart-title">월별 완독 권수</h3>
                <div className="stats-chart-box">
                  <MonthlyReadingChart chartData={monthlyChartData} />
                </div>
              </div>
            </div>

            <div className="stats-chart-right">
              <div className="stats-chart-card stats-pie-card">
                <h3 className="stats-chart-title">독서 기록</h3>

                <div className="stats-pie-layout">
                  <div className="stats-pie-chart-box">
                    <ReadingStatusChart chartData={statusChartData} />
                  </div>

                  <div className="stats-legend">
                    {statusChartData.labels.map((label, index) => (
                      <div key={label} className="stats-legend-item">
                        <span
                          className="stats-legend-dot"
                          style={{
                            backgroundColor:
                              statusChartData.datasets[0].backgroundColor[
                                index
                              ],
                          }}
                        />
                        <span className="stats-legend-text">
                          {label} {statusChartData.datasets[0].data[index]}권
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-calendar-section">
            <div className="stats-calendar-header">
              <p className="stats-calendar-label">CALENDAR</p>
              <h3 className="stats-calendar-title">독서 캘린더</h3>
              <p className="stats-calendar-description">
                날짜를 클릭해 완독한 책을 확인해보세요.
              </p>
            </div>

            <ReadingCalendar />
          </div>
        </section>
      </div>
    </div>
  );
};

export default StatsPage;
