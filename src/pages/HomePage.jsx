import "./HomePage.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getBooksTotalStats } from "../utils/statsUtils";
import { RecordStateContext } from "../context/records/RecordProvider";
import { getDisplayDate } from "../utils/dateUtils";
import ReadingSummary from "../components/home/ReadingSummary";
import RecommendSection from "../components/home/RecommendSection";
import TrendingSection from "../components/home/TrendingSection";
import MyReadingSection from "../components/home/MyReadingSection";
import WishlistSection from "../components/home/WishlistSection";
import { AuthContext } from "../context/auth/AuthProvider";

const HomePage = () => {
  const nav = useNavigate();
  const { user, authLoading } = useContext(AuthContext);

  const records = useContext(RecordStateContext);
  const today = new Date();
  const stats = getBooksTotalStats(records);

  return (
    <div className="home-wrap">
      <div className="home-header">
        <p className="home-header-label">
          오늘의 책갈피 · {getDisplayDate(today)}
        </p>

        <h1 className="home-header-title">
          {authLoading ? null : user ? (
            <>
              <span>{user.displayName}</span> 님을 위한 <br />
              책을 골라봤어요.
            </>
          ) : (
            <>
              <span>회원</span> 님을 위한 <br />
              책을 골라봤어요.
            </>
          )}
        </h1>

        <p className="home-header-description">
          최근 읽은 기록을 바탕으로
          <br />
          지금 읽으면 좋을 책들이에요.
        </p>
      </div>

      <ReadingSummary stats={stats} />

      <MyReadingSection
        stats={stats.done}
        onMoreClick={() => nav("/library/done")}
      />

      <div className="home-two-column">
        <div className="home-two-column-left">
          <RecommendSection onMoreClick={() => nav("/library/recommend")} />
        </div>

        <div className="home-two-column-right">
          <TrendingSection onMoreClick={() => nav("/search?q=베스트셀러")} />
        </div>
      </div>

      <WishlistSection onMoreClick={() => nav("/library/want")} />
    </div>
  );
};

export default HomePage;
