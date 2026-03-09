import { useState } from "react";
import Navbar from "../components/common/navbar/Navbar";
import MyLibrarySection from "../components/common/record/MyLibrarySection";
import StatusTap from "../components/common/record/StatusTap";
import { MOCK_BOOKS } from "../constants/mockBooks";
import Modal from "../components/common/modal/Modal";

const MyPage = () => {
  const books = MOCK_BOOKS;
  const [activeTab, setActiveTab] = useState("all");
  const [open, setOpen] = useState(false);
  // 현재 기록넣기
  const [editingRecord, setEditingRecord] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const onTabChange = (tab) => {
    setActiveTab(tab);
  };

  const filterBooks =
    activeTab === "all"
      ? books
      : books.filter((book) => book.status === activeTab);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const onClickBookCard = (book) => {
    setEditingRecord({
      status: book.status || "",
      startDate: "",
      endDate: "",
      rating: 0,
      comment: "",
    });

    handleOpen();
  };

  const onSubmit = (recordData) => {
    console.log("MyPage modal submit:", {
      selectedBook,
      recordData,
    });

    handleClose();
  };
  return (
    <div>
      <Navbar />
      <StatusTap activeTab={activeTab} onTabChange={onTabChange} />
      <MyLibrarySection
        filterBooks={filterBooks}
        onClickBookCard={onClickBookCard}
      />
      <Modal
        open={open}
        onClose={handleClose}
        onSubmit={onSubmit}
        initData={editingRecord}
      />
    </div>
  );
};

export default MyPage;
