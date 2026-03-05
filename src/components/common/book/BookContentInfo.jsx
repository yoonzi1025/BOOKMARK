import { useState } from "react";
import "./Book.css";
import { FaPlus } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import Modal from "../modal/Modal";

const BookContentInfo = ({ book }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              <button className="btn">
                <FaPlus />
                보고싶어요
              </button>
              <button className="btn" onClick={handleOpen}>
                <FaCommentDots />
                코멘트
              </button>

              <button className="btn">
                <GoEye />
                보는 중
              </button>
            </div>
            <Modal open={open} onClose={handleClose} />
            <div className="book-summary">
              <div className="summary-title">{book.title}</div>
              <div className="summary-author">{book.author}</div>
              <div className="summary-summary"> {book.summary}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookContentInfo;
