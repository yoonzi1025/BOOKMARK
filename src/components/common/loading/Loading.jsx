import "./Loading.css";

const Loading = ({ text = "불러오는 중..." }) => {
  return (
    <div className="loading-state">
      <div className="loading-spinner"></div>
      <p className="loading-text">{text}</p>
    </div>
  );
};

export default Loading;
