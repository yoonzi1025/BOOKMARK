import { useParams } from "react-router-dom";
import BookDetail from "../components/book/BookDetail";
import { useContext, useEffect, useState } from "react";
import { getBookDetail } from "../api/bookApi";
import {
  RecordDispatchContext,
  RecordStateContext,
} from "../context/records/RecordProvider";

const BookDetailPage = () => {
  const { isbn13 } = useParams();

  const records = useContext(RecordStateContext);
  const { onCreate, onUpdate, onDelete } = useContext(RecordDispatchContext);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  useEffect(() => {
    if (!isbn13) {
      setLoading(false);
      return;
    }

    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await getBookDetail(isbn13);

        if (!data || data.error) {
          console.error("책 상세 데이터 오류:", data);
          setBook(null);
          return;
        }

        setBook(data);
      } catch (error) {
        console.error("상세 조회 실패:", error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [isbn13]);

  const currentRecord = records.find(
    (record) => String(record.isbn13) === String(isbn13)
  );

  const handleOpenRecordModal = () => {
    setIsRecordModalOpen(true);
  };

  const handleCloseRecordModal = () => {
    setIsRecordModalOpen(false);
    setEditingRecord(null);
  };

  const handleCreateRecord = () => {
    setEditingRecord(null);
    handleOpenRecordModal();
  };

  const handleEditRecord = () => {
    if (!currentRecord) return;
    setEditingRecord(currentRecord);
    handleOpenRecordModal();
  };

  const handleSubmitRecord = (recordData) => {
    if (!book) return;

    if (editingRecord) {
      onUpdate({
        id: editingRecord.id,
        isbn13,
        title: book.title,
        author: book.author,
        cover: book.cover,
        categoryName: book.categoryName,
        description: book.description,
        readingStatus: recordData.readingStatus,
        rating: recordData.rating,
        comment: recordData.comment,
        startDate: recordData.startDate,
        endDate: recordData.endDate,
        createdDate: editingRecord.createdDate,
      });
    } else {
      onCreate({
        isbn13,
        title: book.title,
        author: book.author,
        cover: book.cover,
        categoryName: book.categoryName,
        description: book.description,
        readingStatus: recordData.readingStatus,
        rating: recordData.rating,
        comment: recordData.comment,
        startDate: recordData.startDate,
        endDate: recordData.endDate,
      });
    }

    handleCloseRecordModal();
  };

  const handleDeleteRecord = () => {
    if (!currentRecord) return;

    const isConfirm = window.confirm(
      "독서 기록을 정말 삭제할까요? 다시 복구되지 않아요."
    );
    if (!isConfirm) return;

    onDelete(currentRecord.id);
    handleCloseRecordModal();
  };

  const handleMarkWant = () => {
    if (!book) return;

    if (currentRecord?.readingStatus === "want") {
      onDelete(currentRecord.id);
      return;
    }

    if (currentRecord) {
      onUpdate({
        ...currentRecord,
        isbn13,
        title: book.title,
        author: book.author,
        cover: book.cover,
        categoryName: book.categoryName,
        description: book.description,
        readingStatus: "want",
      });
      return;
    }

    onCreate({
      isbn13,
      title: book.title,
      author: book.author,
      cover: book.cover,
      categoryName: book.categoryName,
      description: book.description,
      readingStatus: "want",
      rating: 0,
      comment: "",
      startDate: "",
      endDate: "",
    });
  };

  if (loading) {
    return <div style={{ padding: 16 }}>책 정보를 불러오는 중...</div>;
  }

  if (!book) {
    return <div style={{ padding: 16 }}>책 정보를 불러올 수 없어요.</div>;
  }

  return (
    <BookDetail
      book={book}
      currentRecord={currentRecord}
      isRecordModalOpen={isRecordModalOpen}
      editingRecord={editingRecord}
      onOpenCreate={handleCreateRecord}
      onOpenEdit={handleEditRecord}
      onCloseModal={handleCloseRecordModal}
      onSubmitRecord={handleSubmitRecord}
      onDeleteRecord={handleDeleteRecord}
      onMarkWant={handleMarkWant}
    />
  );
};

export default BookDetailPage;
