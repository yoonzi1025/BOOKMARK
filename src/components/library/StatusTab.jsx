import "./StatusTab.css";
import { STATUS_OPTIONS } from "../../constants/option";

const StatusTab = ({ activeTab, onTabChange, stats }) => {
  const tabs = [{ key: "all", label: "전체" }, ...STATUS_OPTIONS];

  const getTabCount = (key) => {
    if (!stats) return 0;
    if (key === "all") return stats.total;
    return stats[key] ?? 0;
  };
  return (
    <div className="library-tab-wrap">
      <div className="library-tab-list">
        {tabs.map((tab) => (
          <button
            type="button"
            className={`library-tab-btn ${
              activeTab === tab.key ? "active" : ""
            }`}
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
            <span className="library-tab-count">{getTabCount(tab.key)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusTab;
