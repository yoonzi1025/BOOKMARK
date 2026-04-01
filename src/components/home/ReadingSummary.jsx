import { useNavigate } from "react-router-dom";
import { STATUS_OPTIONS } from "../../constants/option";
import { STATUS_ICONS } from "../../constants/optionIcon";
import "./ReadingSummary.css";

const ReadingSummary = ({ stats }) => {
  const nav = useNavigate();
  const getStatsCount = (key) => {
    if (!stats) return 0;
    // if (key === "all") return stats.total;

    return stats[key] ?? 0;
  };

  return (
    <section className="reading-summary-section">
      <div className="reading-summary">
        {STATUS_OPTIONS.map((option) => {
          const Icon = STATUS_ICONS[option.key];
          return (
            <div
              key={option.key}
              className="reading-summary-card"
              onClick={() => nav(`/library/${option.key}`)}
            >
              <p className="reading-summary-icon">
                <Icon />
              </p>

              <strong className="reading-summary-count">
                {getStatsCount(option.key)}권
              </strong>
              <p className="reading-summary-description">{option.sub}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ReadingSummary;
