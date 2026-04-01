import "./RecordsModal.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { STATUS_OPTIONS } from "../../../constants/option";
import { STATUS_ICONS } from "../../../constants/optionIcon";
import Rating from "../rating/Rating";

const RecordsModal = ({
  open,
  onClose,
  onSubmit,
  initData,
  mode = "create",
}) => {
  const [readingStatus, setReadingStatus] = useState("reading");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [createdDate, setCreatedDate] = useState(new Date());
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";

  useEffect(() => {
    if (!open) return;

    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;

    if (initData) {
      setReadingStatus(initData.readingStatus || "reading");
      setStartDate(initData.startDate || "");
      setEndDate(initData.endDate || "");
      setRating(initData.rating || 0);
      setComment(initData.comment || "");
      setCreatedDate(initData.createdDate || new Date());
    } else {
      setReadingStatus("reading");
      setStartDate("");
      setEndDate("");
      setRating(0);
      setComment("");
      setCreatedDate(new Date());
    }

    setErrors({});
    setTouched({});
    setIsSubmitAttempted(false);
  }, [open, initData]);

  const validate = () => {
    const newErrors = {};

    if (!readingStatus) {
      newErrors.readingStatus = "독서 상태를 선택해주세요.";
    }

    if (readingStatus !== "want" && !startDate) {
      newErrors.startDate = "독서 시작일을 선택해주세요.";
    }

    if (readingStatus === "done" && !endDate) {
      newErrors.endDate = "독서 종료일을 선택해주세요.";
    }

    if (startDate && endDate && startDate > endDate) {
      newErrors.endDate = "종료일은 시작일보다 빠를 수 없습니다.";
    }

    if (readingStatus === "done" && rating === 0) {
      newErrors.rating = "평점을 선택해주세요.";
    }

    if (
      (readingStatus === "done" || readingStatus === "stopped") &&
      !comment.trim()
    ) {
      newErrors.comment = "한줄평을 작성해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const shouldShowError = (fieldName) => {
    return (touched[fieldName] || isSubmitAttempted) && errors[fieldName];
  };

  const handleFieldChange = (field, value) => {
    if (isViewMode) return;

    if (field === "readingStatus") {
      setReadingStatus(value);

      if (value === "want") {
        setStartDate("");
        setEndDate("");
        setRating(0);
        setComment("");
      }

      if (value === "reading") {
        setEndDate("");
        setRating(0);
        setComment("");
      }

      if (value === "stopped") {
        setRating(0);
      }
    }

    if (field === "startDate") setStartDate(value);
    if (field === "endDate") setEndDate(value);
    if (field === "rating") setRating(value);
    if (field === "comment") setComment(value);

    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleBlurField = (fieldName) => {
    if (isViewMode) return;

    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  };

  const handleSubmitRecord = () => {
    if (isViewMode || !onSubmit) return;

    setIsSubmitAttempted(true);

    const isValid = validate();
    if (!isValid) return;

    onSubmit({
      ...initData,
      readingStatus,
      startDate,
      endDate,
      rating,
      comment,
      createdDate,
    });

    onClose();
  };

  const getModalTitle = () => {
    if (isViewMode) return "독서 기록";
    if (isEditMode) return "독서 기록 수정";
    return "독서 기록 작성";
  };

  const getSubmitLabel = () => {
    return isEditMode ? "수정하기" : "저장하기";
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{getModalTitle()}</div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            style={{ display: "flex", cursor: "pointer" }}
          >
            <IoMdCloseCircleOutline size={34} />
          </button>
        </div>

        <div className="modal-section">
          <div className="modal-section-label">독서 상태</div>
          <div className="status-section">
            {STATUS_OPTIONS.map((option) => {
              const Icon = STATUS_ICONS[option.key];

              return (
                <div
                  key={option.key}
                  className={`status-option ${
                    readingStatus === option.key ? "active" : ""
                  } ${isViewMode ? "readonly" : ""}`}
                  onClick={() => handleFieldChange("readingStatus", option.key)}
                >
                  <div className="status-option-icon">
                    <Icon />
                  </div>
                  <div className="status-option-label">{option.label}</div>
                  <div className="status-option-sub">{option.sub}</div>
                </div>
              );
            })}
          </div>

          {shouldShowError("readingStatus") && (
            <div className="field-error-message">{errors.readingStatus}</div>
          )}

          {readingStatus === "want" && (
            <textarea
              className="modal-textarea"
              placeholder="아직 독서를 시작하지 않았어요."
              readOnly
            />
          )}

          {readingStatus !== "want" && (
            <>
              <div className="modal-section-label">독서 기간</div>

              <div className="modal-date-row">
                <div className="modal-date-field">
                  <label>시작일</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) =>
                      handleFieldChange("startDate", e.target.value)
                    }
                    onBlur={() => handleBlurField("startDate")}
                    disabled={isViewMode}
                    className={
                      shouldShowError("startDate") ? "input-error" : ""
                    }
                  />
                  {shouldShowError("startDate") && (
                    <div className="field-error-message">
                      {errors.startDate}
                    </div>
                  )}
                </div>

                <div className="modal-date-divider">~</div>

                {readingStatus === "reading" ? (
                  <div className="modal-reading-status-box">읽는 중</div>
                ) : (
                  <div className="modal-date-field">
                    <label>종료일</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) =>
                        handleFieldChange("endDate", e.target.value)
                      }
                      onBlur={() => handleBlurField("endDate")}
                      disabled={isViewMode}
                      className={
                        shouldShowError("endDate") ? "input-error" : ""
                      }
                    />
                    {shouldShowError("endDate") && (
                      <div className="field-error-message">
                        {errors.endDate}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          {readingStatus === "done" && (
            <div className="rating-section">
              <div className="modal-rating-row">
                <div className="modal-rating-label">평점</div>
                <div onBlur={() => handleBlurField("rating")}>
                  <Rating
                    rating={rating}
                    onChange={(value) => handleFieldChange("rating", value)}
                    disabled={isViewMode}
                  />
                </div>
              </div>

              {shouldShowError("rating") && (
                <div className="field-error-message rating-error-message">
                  {errors.rating}
                </div>
              )}
            </div>
          )}

          {(readingStatus === "done" || readingStatus === "stopped") && (
            <div className="comment-header">
              <div className="modal-section-label" style={{ marginBottom: 0 }}>
                한줄평
              </div>
              <textarea
                value={comment}
                className={`modal-textarea ${
                  shouldShowError("comment") ? "input-error" : ""
                }`}
                onChange={(e) => handleFieldChange("comment", e.target.value)}
                onBlur={() => handleBlurField("comment")}
                placeholder="짧은 감상평을 남겨보세요."
                maxLength={500}
                rows={3}
                readOnly={isViewMode}
              />
              {shouldShowError("comment") && (
                <div className="field-error-message">{errors.comment}</div>
              )}
            </div>
          )}

          <div className="modal-action-group">
            <button
              type="button"
              className="modal-cancel-btn"
              onClick={onClose}
            >
              {isViewMode ? "닫기" : "취소하기"}
            </button>

            {!isViewMode && (
              <button
                type="button"
                className="modal-save-btn"
                onClick={handleSubmitRecord}
              >
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
