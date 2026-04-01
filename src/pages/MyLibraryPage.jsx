import "./MyLibraryPage.css";
import { useContext, useMemo, useState } from "react";
import MyLibraryList from "../components/library/MyLibraryList";
import StatusTab from "../components/library/StatusTab";
import RecordsModal from "../components/common/modal/RecordsModal";
import { RecordStateContext } from "../context/records/RecordProvider";
import { getBooksTotalStats } from "../utils/statsUtils";
import { useNavigate, useParams } from "react-router-dom";

const MyLibraryPage = () => {
  const nav = useNavigate();
  const { status } = useParams();

  const records = useContext(RecordStateContext);
  const activeTab = status || "all";

  // 현재 기록넣기
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [sortType, setSortType] = useState("latest");

  /* 탭 필터 (record 기준) */
  /* 정렬 (filteredBooks 기준) */
  const sortedBooks = useMemo(() => {
    const filtered =
      activeTab === "all"
        ? records
        : records.filter((book) => book.readingStatus === activeTab);

    return [...filtered].sort((a, b) => {
      if (sortType === "latest") {
        return new Date(b.createdDate) - new Date(a.createdDate);
      }

      if (sortType === "oldest") {
        return new Date(a.createdDate) - new Date(b.createdDate);
      }

      if (sortType === "title") {
        const titleA = a.title || "";
        const titleB = b.title || "";
        return titleA.localeCompare(titleB);
      }

      if (sortType === "rating") {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });
  }, [records, activeTab, sortType]);

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  /* 상태 통계 */
  const stats = getBooksTotalStats(records);

  const isModalOpen = selectedRecord !== null;

  const handleTabChange = (nextStatus) => {
    if (nextStatus === "all") {
      nav("/library");
      return;
    }

    nav(`/library/${nextStatus}`);
  };

  const handleClose = () => setSelectedRecord(null);

  const onClickBookCard = (book) => {
    setSelectedRecord(book);
    setModalMode("view");
  };

  return (
    <div className="library-page">
      <div className="library-page">
        <div className="library-page-header">
          <p className="library-page-label">MY LIBRARY</p>
          <h1 className="library-page-title">내 서재</h1>
          <p className="library-page-description">
            내가 읽은 책과 읽고 싶은 책을 한눈에 모아봤어요.
          </p>
        </div>

        <div className="library-page-toolbar">
          <StatusTab
            activeTab={activeTab}
            onTabChange={handleTabChange}
            stats={stats}
          />

          <div className="library-sort-box">
            <select
              name="library-sort-select"
              id="library-sort-select"
              value={sortType}
              onChange={handleSortChange}
            >
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
              <option value="title">제목순</option>
              <option value="rating">평점순</option>
            </select>
          </div>
        </div>

        <div className="library-page-body">
          <MyLibraryList
            filteredBooks={sortedBooks}
            onClickBookCard={onClickBookCard}
          />
        </div>
        <RecordsModal
          open={isModalOpen}
          onClose={handleClose}
          initData={selectedRecord}
          mode={modalMode}
        />
      </div>
    </div>
  );
};

export default MyLibraryPage;
