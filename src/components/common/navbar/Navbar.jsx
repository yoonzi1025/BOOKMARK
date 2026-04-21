import { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";

const Navbar = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const { user, authLoading } = useContext(AuthContext);

  const handleSearch = () => {
    if (!query.trim()) return;
    nav(`/search?q=${encodeURIComponent(query)}`);
  };
  useEffect(() => {
    if (location.pathname === "/search") {
      const q = new URLSearchParams(location.search).get("q");
      if (q) setQuery(q);
    }
  }, [location]);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      nav("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="navbar-logo" onClick={() => nav("/")}>
            Re:Book
          </div>

          <nav className="navbar-menu">
            <button
              className={`navbar-item ${isActive("/") ? "active" : ""}`}
              onClick={() => nav("/")}
            >
              홈
            </button>

            <button
              className={`navbar-item ${isActive("/library") ? "active" : ""}`}
              onClick={() => nav("/library")}
            >
              내 서재
            </button>

            <button
              className={`navbar-item ${isActive("/stats") ? "active" : ""}`}
              onClick={() => nav("/stats")}
            >
              독서기록
            </button>
          </nav>
        </div>

        <div className="navbar-center">
          <div className="navbar-search">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="검색어를 입력해 주세요"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />

            <button
              type="button"
              onClick={handleSearch}
              className="navbar-search-btn"
              aria-label="검색"
            >
              <CiSearch />
            </button>
          </div>
        </div>

        <div className="navbar-right">
          {authLoading ? null : user ? (
            <div className="navbar-user-box" type="button">
              <button className="navbar-user-btn">
                <span className="navbar-user-avatar">
                  {user.photoURL ? (
                    <img src={user.photoURL} />
                  ) : (
                    (user.displayName || "U").charAt(0)
                  )}
                </span>

                <span className="navbar-user-name">
                  {user.displayName || "회원"}
                </span>
              </button>
              <button className="navbar-login-btn" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          ) : (
            <button
              className="navbar-login-btn"
              type="button"
              onClick={() => nav("/login")}
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
