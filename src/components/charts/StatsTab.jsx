import "./StatsTab.css";

const StatsTab = ({ activeTab, onTabChange }) => {
  return (
    <div className="stats-wrapper">
      <div className="stats-inner">
        <div className="stats-header">
          <h1 className="stats-title">Reading Board</h1>
          <p className="stats-desc">나의 독서 기록을 한눈에 확인하세요.</p>

          <div className="stats-tab">
            <button
              className={`stats-tab-btn ${
                activeTab === "calendar" ? "active" : ""
              }`}
              onClick={() => onTabChange("calendar")}
            >
              📆 독서 캘린더
            </button>

            <button
              className={`stats-tab-btn ${
                activeTab === "stats" ? "active" : ""
              }`}
              onClick={() => onTabChange("stats")}
            >
              📊 독서 기록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsTab;
