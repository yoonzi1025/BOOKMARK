import "./SkeletonCard.css";

const SkeletonCard = () => {
  return (
    <div className="book-grid-card">
      <div className="book-grid-cover-wrap">
        <div className="skeleton-cover"></div>
      </div>

      <div className="book-grid-info">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-author"></div>
        <div className="skeleton-line skeleton-category"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
