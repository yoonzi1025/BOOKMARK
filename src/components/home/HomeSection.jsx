import "./HomeSection.css";

const HomeSection = ({
  label,
  title,
  description,
  onMoreClick,
  moreText,
  children,
}) => {
  return (
    <section className="home-section">
      <div className="home-section-header">
        <div className="home-section-title-wrap">
          <p className="home-section-label">{label}</p>
          <h1 className="home-section-title">{title}</h1>

          <p className="home-section-description">{description}</p>
        </div>
        <button
          type="button"
          className="btn btn-text home-section-more"
          onClick={onMoreClick}
        >
          {moreText} →
        </button>
      </div>

      <div className="home-section-content">{children}</div>
    </section>
  );
};

export default HomeSection;
