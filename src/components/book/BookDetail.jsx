import "./BookDetail.css";
import "../record/MyRecord.css";
import { FaPlus, FaCommentDots } from "react-icons/fa";
import RecordsModal from "../common/modal/RecordsModal";
import MyRecord from "../record/MyRecord";

const BookDetail = ({
  book,
  currentRecord,
  isRecordModalOpen,
  editingRecord,
  onOpenCreate,
  onOpenEdit,
  onCloseModal,
  onSubmitRecord,
  onDeleteRecord,
  onMarkWant,
}) => {
  if (!book) {
    return <div>책 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <section className="book-detail">
      <div className="book-detail-container">
        <div className="book-detail-main">
          <div className="book-detail-cover">
            <img src={book.cover} alt={book.title} />
          </div>

          <div className="book-detail-content">
            <div className="book-detail-actions">
              <button
                className={`book-detail-action-btn ${
                  currentRecord?.readingStatus === "want" ? "active" : ""
                }`}
                onClick={onMarkWant}
              >
                <FaPlus />
                보고싶어요
              </button>

              <button
                className="book-detail-action-btn"
                onClick={currentRecord ? onOpenEdit : onOpenCreate}
              >
                <FaCommentDots />
                기록 남기기
              </button>
            </div>

            <RecordsModal
              open={isRecordModalOpen}
              onClose={onCloseModal}
              onSubmit={onSubmitRecord}
              initData={editingRecord}
              mode={editingRecord ? "edit" : "create"}
            />

            <div className="book-detail-summary">
              <div className="book-detail-title">{book.title}</div>
              <div className="book-detail-author">{book.author}</div>
              <div className="book-detail-description">{book.description}</div>
            </div>
          </div>
        </div>

        <div className="record-wrapper">
          <div className="record-section">
            <MyRecord
              currentRecord={currentRecord}
              onClickCreate={onOpenCreate}
              onClickUpdate={onOpenEdit}
              onClickDelete={onDeleteRecord}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetail;
