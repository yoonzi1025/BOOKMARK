import { IoMdCloseCircleOutline } from "react-icons/io";
import "./CalendarModal.css";
import { useEffect } from "react";
import { getStringedDate } from "../../utils/dateUtils";
import Rating from "../common/rating/Rating";

const CalendarModal = ({ date, dayBooks, onClose, ratingSize = 14 }) => {
  const formattedDate = getStringedDate(new Date(date));

  useEffect(() => {
    document.body.classList.add("modal-open");

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <div className="calendar-modal-overlay" onClick={onClose}>
      <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
        <div className="calendar-modal-header">
          <div className="calendar-modal-meta">
            <div className="calendar-modal-date">{formattedDate}</div>
            <div className="calendar-modal-count">{dayBooks.length}권</div>
          </div>

          <button
            type="button"
            className="calendar-modal-close-btn"
            onClick={onClose}
          >
            <IoMdCloseCircleOutline size={34} />
          </button>
        </div>

        <div className="calendar-modal-book-list">
          {dayBooks.length === 0 ? (
            <div className="calendar-modal-empty">
              이 날짜에 완독한 책이 없습니다.
            </div>
          ) : (
            dayBooks.map((record) => (
              <div key={record.id} className="calendar-modal-book-item">
                <div className="calendar-modal-cover">
                  <img src={record.cover} alt={record.title} />
                </div>

                <div className="calendar-modal-book-info">
                  <div className="calendar-modal-book-title">
                    {record.title}
                  </div>
                  <div className="calendar-modal-book-author">
                    {record.author}
                  </div>
                  <div className="calendar-modal-book-rating">
                    <Rating rating={record.rating || 0} size={ratingSize} />
                  </div>
                  <div className="calendar-modal-book-comment">
                    {record.comment || ""}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <button
          type="button"
          className="calendar-modal-footer-btn"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default CalendarModal;
