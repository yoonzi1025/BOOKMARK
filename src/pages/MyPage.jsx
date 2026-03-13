import { useContext, useMemo, useState } from "react";
import Navbar from "../components/common/navbar/Navbar";
import MyLibrarySection from "../components/common/library/MyLibrarySection";
import StatusTap from "../components/common/library/StatusTap";
import RecordsModal from "../components/common/modal/RecordsModal";
import { RecordStateContext } from "../context/records/RecordProvider";
import { BooksStateContext } from "../context/books/BooksProvider";
import { mergeBooksWithRecords } from "../utils/book-utils";

const MyPage = () => {
  const books = useContext(BooksStateContext);
  const records = useContext(RecordStateContext);

  const [activeTab, setActiveTab] = useState("all");
  const [open, setOpen] = useState(false);
  // 현재 기록넣기
  const [editingRecord, setEditingRecord] = useState(null);

  const booksRecordList = useMemo(() => {
    return mergeBooksWithRecords(books, records);
  }, [books, records]);

  const onTabChange = (tab) => {
    setActiveTab(tab);
  };

  /* 탭 필터 */
  const filterBooks =
    activeTab === "all"
      ? booksRecordList
      : booksRecordList.filter((book) => book.readingStatus === activeTab);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // const onClickBookCard = (book) => {
  //   setEditingRecord(book.record || null);
  //   handleOpen();
  // };

  const onClickBookCard = (book) => {
    if (book.record) {
      setEditingRecord(book.record);
    } else {
      setEditingRecord({
        bookId: book.id,
        readingStatus: book.readingStatus || "want",
        startDate: "",
        endDate: "",
        rating: 0,
        comment: "",
      });
    }

    handleOpen();
  };

  return (
    <div>
      <StatusTap activeTab={activeTab} onTabChange={onTabChange} />
      <MyLibrarySection
        filterBooks={filterBooks}
        onClickBookCard={onClickBookCard}
      />
      <RecordsModal
        open={open}
        onClose={handleClose}
        initData={editingRecord}
        mode="view"
      />
    </div>
  );
};

export default MyPage;
