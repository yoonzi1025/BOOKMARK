import "./StatusBadge.css";
import { STATUS_OPTIONS } from "../../constants/option";

const StatusBadge = ({ readingStatus }) => {
  const currentStatus = STATUS_OPTIONS.find(
    (option) => option.key === readingStatus
  );
  if (!currentStatus) return null;
  return (
    <span className={`status-badge  status-${readingStatus}`}>
      {currentStatus.label}
    </span>
  );
};

export default StatusBadge;
