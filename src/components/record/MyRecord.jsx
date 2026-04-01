import "./MyRecord.css";
import StatusBadge from "../status/StatusBadge.jsx";
import Rating from "../common/rating/Rating.jsx";
import { getDisplayDate } from "../../utils/dateUtils.js";

const MyRecord = ({
  currentRecord,
  onClickUpdate,
  onClickDelete,
  onClickCreate,
}) => {
  if (!currentRecord) {
    return (
      <section className="record-review record-review-empty">
        <div className="record-review-heading">
          <h3 className="record-review-title">독서 기록</h3>
          <p className="record-review-date">아직 작성한 기록이 없어요</p>
        </div>

        <div className="record-empty-box">
          <div className="record-empty-avatar">✍️</div>

          <div className="record-empty-content">
            <p className="record-empty-title">
              이 책에 대한 기록을 남겨보세요.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-md record-empty-btn"
            onClick={onClickCreate}
          >
            기록 작성하기
          </button>
        </div>
      </section>
    );
  }

  const showRating = currentRecord.readingStatus === "done";
  const showComment =
    currentRecord.readingStatus === "done" ||
    currentRecord.readingStatus === "stopped";

  const getPeriodText = () => {
    if (currentRecord.readingStatus === "reading") {
      return `${getDisplayDate(currentRecord.startDate)} ~ 읽는 중`;
    }

    if (
      currentRecord.readingStatus === "done" ||
      currentRecord.readingStatus === "stopped"
    ) {
      return `${getDisplayDate(currentRecord.startDate)} ~ ${getDisplayDate(
        currentRecord.createdDate
      )}`;
    }

    return "";
  };

  return (
    <section className="record-review">
      <div className="record-review-header">
        <div className="record-review-heading">
          <h3 className="record-review-title">독서 기록</h3>
          <p className="record-review-date">
            {getDisplayDate(currentRecord.createdDate)}
          </p>
        </div>

        <div className="record-review-actions">
          <button
            type="button"
            className="record-review-btn"
            onClick={onClickUpdate}
          >
            수정
          </button>
          <button
            type="button"
            className="record-review-btn is-delete"
            onClick={onClickDelete}
          >
            삭제
          </button>
        </div>
      </div>

      <div className="record-review-meta">
        <div className="record-review-row">
          <StatusBadge readingStatus={currentRecord.readingStatus} />
          {getPeriodText() && (
            <span className="record-review-period">{getPeriodText()}</span>
          )}
        </div>

        {showRating && (
          <div className="record-review-rating">
            <Rating rating={currentRecord.rating || 0} />
          </div>
        )}
      </div>

      {showComment && (
        <div className="record-review-body">
          {currentRecord.comment ? (
            <p className="record-review-comment">{currentRecord.comment}</p>
          ) : (
            <p className="record-review-placeholder">
              아직 작성한 감상이 없어요.
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default MyRecord;
