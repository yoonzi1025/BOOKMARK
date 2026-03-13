import "./RecordsModal.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { STATUS_OPTIONS } from "../../../constants/statusOption";
import { STATUS_ICONS } from "../../../constants/statusIcon";
import Rating from "../rating/Rating";

const RecordsModal = ({
  open,
  onClose,
  onSubmit,
  initData,
  mode = "create",
}) => {
  const [readingStatus, setReadingStatus] = useState("done");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [createdDate, setCreatedDate] = useState(new Date());

  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    console.log("Modal initData:", initData);
    if (initData) {
      setReadingStatus(initData.readingStatus || "done");
      setRating(initData.rating || 0);
      setComment(initData.comment || "");
      setStartDate(initData.startDate || "");
      setEndDate(initData.endDate || "");
      setCreatedDate(initData.createdDate || "");
    } else {
      setReadingStatus("done");
      setRating(0);
      setComment("");
      setStartDate("");
      setEndDate("");
    }
  }, [open, initData]);

  if (!open) return null;

  const getStartDate = (e) => {
    if (isViewMode) return;
    setStartDate(e.target.value);
  };

  const getEndDate = (e) => {
    if (isViewMode) return;
    setEndDate(e.target.value);
  };

  const onClickStar = (star) => {
    if (isViewMode) return;
    setRating(star);
  };

  const onChangComment = (e) => {
    if (isViewMode) return;
    setComment(e.target.value);
  };

  const onClickSubmitBtn = () => {
    if (isViewMode || !onSubmit) return;
    onSubmit({
      readingStatus,
      rating,
      comment,
      startDate,
      endDate,
      createdDate,
    });
  };

  const getModalTitle = () => {
    if (isViewMode) return "독서 기록";
    if (isEditMode) return "독서 기록 수정";
    return "독서 기록 작성";
  };

  const getSubmitLabel = () => {
    if (isEditMode) return "수정하기";
    return "저장하기";
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{getModalTitle()}</div>
          <button
            className="btn-close"
            style={{ display: "flex", cursor: "pointer" }}
            onClick={() => onClose()}
          >
            <IoMdCloseCircleOutline size={34} />
          </button>
        </div>
        <div className="modal-section">
          <div className="section-label">독서 상태</div>
          <div className="status-section">
            {STATUS_OPTIONS.map((option) => {
              const Icon = STATUS_ICONS[option.key];
              return (
                <div
                  className={`btn-status ${
                    readingStatus === option.key ? "active" : ""
                  } ${isViewMode ? "readonly" : ""}`}
                  key={option.key}
                  onClick={() => {
                    if (isViewMode) return;
                    setReadingStatus(option.key);
                  }}
                >
                  <div className="btn-status-icon">
                    <Icon />
                  </div>
                  <div className="btn-status-label">{option.label}</div>
                  <div className="btn-status-sub">{option.sub}</div>
                </div>
              );
            })}
          </div>

          {readingStatus === "want" && (
            <textarea
              className="textarea"
              placeholder="아직 독서를 시작하지 않았어요."
            />
          )}

          {readingStatus !== "want" && (
            <>
              <div className="date-section">독서 기간</div>
              <div className="date">
                <div className="date-field">
                  <label>시작일</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={getStartDate}
                    disabled={isViewMode}
                  />
                </div>

                <div className="date-divider">~</div>
                {readingStatus === "reading" ? (
                  <div className="reading-status-box">읽는 중</div>
                ) : (
                  <div className="date-field">
                    <label>종료일</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={getEndDate}
                      disabled={isViewMode}
                    />
                  </div>
                )}
              </div>
            </>
          )}
          {readingStatus === "done" && (
            <div className="rating-section">
              <div className="rating-label">평점</div>
              <Rating rating={rating} onChange={onClickStar} />
            </div>
          )}

          {(readingStatus === "done" || readingStatus === "stopped") && (
            <div className="comment-header">
              <div className="section-label" style={{ marginBottom: 0 }}>
                한줄평
              </div>
              <textarea
                value={comment}
                className="textarea"
                onChange={onChangComment}
                placeholder="짧은 감상평을 남겨보세요."
                maxLength={500}
                rows={3}
                readOnly={isViewMode}
              />
            </div>
          )}

          <div className="btn-section">
            <button className="btn-close" onClick={onClose}>
              {isViewMode ? "닫기" : "취소하기"}
            </button>
            {!isViewMode && (
              <button className="btn-save" onClick={onClickSubmitBtn}>
                {getSubmitLabel()}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordsModal;
