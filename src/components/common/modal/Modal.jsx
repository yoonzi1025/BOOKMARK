import "./Modal.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FcReading } from "react-icons/fc";
import { FaHeart } from "react-icons/fa";
import { FaRegStopCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

const Modal = ({ open, onClose, value = 0, onChange = null, size = 24 }) => {
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  if (!open) return null;

  const getStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const getEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const STATUS_OPTIONS = [
    { key: "done", icon: <FcReading />, label: "읽은 책", sub: "다 읽었어요" },
    {
      key: "reading",
      icon: "📖",
      label: "읽고 있는 책",
      sub: "열심히 읽고 있어요",
    },
    {
      key: "want",
      icon: <FaHeart />,
      label: "읽고 싶은 책",
      sub: "찜 해두고 싶어요",
    },
    {
      key: "stopped",
      icon: <FaRegStopCircle />,
      label: "중단한 책",
      sub: "더 읽지 않아요",
    },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">어떤 책인가요?</div>
          <div
            className="btn-close"
            style={{ display: "flex", cursor: "pointer" }}
            onClick={() => onClose()}
          >
            <IoMdCloseCircleOutline size={34} />
          </div>
        </div>
        <div className="modal-section">
          <div className="section-label">독서 상태</div>
          <div className="status-section">
            {STATUS_OPTIONS.map((option) => (
              <div
                className={`btn-status ${
                  status === option.key ? "active" : ""
                }`}
                key={option.key}
                onClick={() => setStatus(option.key)}
              >
                <div className="btn-status-icon">{option.icon}</div>
                <div className="btn-status-label">{option.label}</div>
                <div className="btn-status-sub">{option.sub}</div>
              </div>
            ))}
          </div>
          <div className="divider" />
          <div className="datd-section">독서 기간</div>
          <div className="date">
            <div className="date-field">
              <label>시작일</label>
              <input type="date" value={startDate} onChange={getStartDate} />
            </div>
            <div className="date-field">
              <label>종료일</label>
              <input type="date" value={endDate} onChange={getEndDate} />
            </div>
          </div>
          <div className="rating-section">
            <div className="rating-label">평점</div>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={size}
                  // 나중에 클릭되면 이 함수를 실행해라”
                  //onClick={() => handleClick(star)}
                  style={{
                    color: star <= value ? "gold" : "gray",
                    cursor: onChange ? "pointer" : "default",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="comment-header">
            <div className="section-label" style={{ marginBottom: 0 }}>
              한줄평
            </div>
            <textarea
              className="textarea"
              placeholder="짧은 감상평을 남겨보세요."
              maxLength={500}
              rows={3}
            />
          </div>
          <div className="btn-section">
            <button className="btn-close">취소하기</button>
            <button className="btn-save">저장하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
