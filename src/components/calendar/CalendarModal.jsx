import { IoMdCloseCircleOutline } from "react-icons/io";
import "./CalendarModal.css";
import { useContext, useEffect } from "react";
import { BooksStateContext } from "../../context/books/BooksProvider";
import { RecordStateContext } from "../../context/records/RecordProvider";
import { getStringedDate } from "../../utils/date-utils";
import { getDayBooks } from "../../utils/calendar-utils";
import Rating from "../common/rating/Rating";

const CalendarModal = ({ date, onClose, size = 14 }) => {
  const books = useContext(BooksStateContext);
  const records = useContext(RecordStateContext);

  const dateStr = getStringedDate(new Date(date));
  const dayBooks = getDayBooks({ books, records, date });

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  return (
    <div className="calendar-modal-overlay" onClick={onClose}>
      <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
        <div className="calendar-modal-header">
          <div>
            <div className="calendar-modal-date">{dateStr}</div>
            <div className="calendar-modal-count">{dayBooks.length}권</div>
          </div>
          <button type="button" className="btn-close" onClick={onClose}>
            <IoMdCloseCircleOutline size={34} />
          </button>
        </div>
        <div className="modal-book-list">
          {dayBooks.length === 0 ? (
            <div className="empty-message">이 날짜에 완독한 책이 없습니다.</div>
          ) : (
            dayBooks.map((book) => (
              <div key={book.id} className="modal-book-item">
                <div className="modal-cover">
                  <img src={book.cover} alt={book.title} />
                </div>

                <div className="modal-book-info">
                  <div className="modal-book-title">{book.title}</div>
                  <div className="modal-book-author">{book.author}</div>
                  <div className="modal-book-rating">
                    <Rating rating={book.record?.rating || 0} size={size} />
                  </div>
                  <div className="modal-book-comment">
                    {book.record.comment}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <button className="modal-footer" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default CalendarModal;
