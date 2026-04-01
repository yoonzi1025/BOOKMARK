import { useNavigate } from "react-router-dom";
import "./Notfound.css";

const Notfound = () => {
  const nav = useNavigate();

  return (
    <section className="notfound-page">
      <div className="notfound-card">
        <p className="notfound-code">404</p>
        <h1 className="notfound-title">페이지를 찾을 수 없어요</h1>
        <p className="notfound-description">
          요청하신 페이지가 없거나 이동되었어요.
          <br />
          홈으로 돌아가서 다시 찾아보세요.
        </p>

        <div className="notfound-actions">
          <button className="notfound-btn primary" onClick={() => nav("/")}>
            홈으로 가기
          </button>
          <button className="notfound-btn" onClick={() => nav(-1)}>
            이전 페이지
          </button>
        </div>
      </div>
    </section>
  );
};

export default Notfound;
