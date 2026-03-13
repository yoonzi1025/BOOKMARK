import "./Navbar.css";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const nav = useNavigate();
  return (
    <header className="navbar">
      <div className="top-bar">
        <div className="nav-logo" onClick={() => nav(`/`)}>
          READORY
        </div>

        {/* 메인 메뉴 */}
        <nav className="nav-title">
          <button className="nav-item active" onClick={() => nav(`/`)}>
            홈
          </button>
          <button className="nav-item" onClick={() => nav(`/records/mypage`)}>
            내 서재
          </button>
          <button className="nav-item" onClick={() => nav(`/stats`)}>
            독서기록
          </button>
        </nav>

        <div className="search">
          <input type="text" placeholder="검색어를 입력해 주세요" />
          <CiSearch className="search-icon" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
