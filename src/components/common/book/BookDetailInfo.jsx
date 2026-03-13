import { useContext, useState } from "react";
import "./Book.css";
import "../record/MyRecord.css";
import { FaPlus } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import RecordsModal from "../modal/RecordsModal";
import {
  RecordDispatchContext,
  RecordStateContext,
} from "../../../context/records/RecordProvider";
import { useNavigate } from "react-router-dom";
import MyRecord from "../record/MyRecord";

const BookDetailInfo = ({ book }) => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  // 현재 기록넣기
  const [editingRecord, setEditingRecord] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const records = useContext(RecordStateContext);
  const currentRecord = records.find(
    (record) => String(record.bookId) === String(book.id)
  );

  const { onCreate, onUpdate, onDelete } = useContext(RecordDispatchContext);
  const onSubmit = (recordData) => {
    if (editingRecord) {
      // 수정
      onUpdate({
        id: editingRecord.id,
        bookId: book.id,
        readingStatus: recordData.readingStatus,
        rating: recordData.rating,
        comment: recordData.comment,
        startDate: recordData.startDate,
        endDate: recordData.endDate,
        createdDate: recordData.createdDate,
      });
    } else {
      // 새기록
      onCreate({
        bookId: book.id,
        readingStatus: recordData.readingStatus,
        rating: recordData.rating,
        comment: recordData.comment,
        startDate: recordData.startDate,
        endDate: recordData.endDate,
        createdDate: recordData.createdDate,
      });
    }

    handleClose();
  };

  // 기록없음
  const onClickCreate = () => {
    setEditingRecord(null);
    handleOpen();
  };

  // 기록있음
  const onClickUpdate = () => {
    setEditingRecord(currentRecord);
    handleOpen();
  };

  // const onClickComment = () => {
  //   if(currentRecord){
  //     setEditingRecord(currentRecord);
  //   }else{
  //     setEditingRecord(null);
  //   }
  //   handleOpen();
  // }

  const onClickWant = () => {
    if (currentRecord) {
      onUpdate({
        ...currentRecord,
        readingStatus: "want",
      });
    } else {
      onCreate({
        bookId: book.id,
        readingStatus: "want",
        rating: 0,
        comment: "",
        startDate: "",
        endDate: "",
        createdDate: "",
      });
    }
  };

  const onClickDelete = () => {
    if (window.confirm("독서 기록을 정말 삭제할까요? 다시 복구되지 않아요")) {
      console.log("클릭");
      onDelete(currentRecord.id);
      nav(`/books/${book.id}`, { state: { book } });
    }
  };

  /* 기록 있음 */

  if (!book) return null;

  return (
    <section className="book-contentInfo-wrapper">
      <div className="book-content-info">
        <div className="book-content-section">
          <div className="cover-img">
            <img src={book.cover} alt="" />
          </div>
          <div className="content-info">
            <div className="btn-container">
              <button className="btn-info" onClick={onClickWant}>
                <FaPlus />
                보고싶어요
              </button>
              <button
                className="btn-info"
                onClick={currentRecord ? onClickUpdate : onClickCreate}
              >
                <FaCommentDots />
                기록 남기기
              </button>
            </div>
            <RecordsModal
              open={open}
              onClose={handleClose}
              onSubmit={onSubmit}
              initData={editingRecord}
              mode={editingRecord ? "edit" : "create"}
            />
            <div className="book-summary">
              <div className="summary-title">{book.title}</div>
              <div className="summary-author">{book.author}</div>
              <div className="summary-summary"> {book.summary}</div>
            </div>
          </div>
        </div>
        <div className="record-wrapper">
          <div className="record-section">
            {currentRecord ? (
              <MyRecord
                currentRecord={currentRecord}
                onClickUpdate={onClickUpdate}
                onClickDelete={onClickDelete}
              />
            ) : (
              <div className="record-empty">
                <div>아직 기록이 없습니다.</div>
                <button onClick={onClickCreate}>기록 작성하기</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetailInfo;
