import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">Readory</div>
          <div className="footer-description">
            나만의 독서 기록을 쌓아가는 공간입니다.
          </div>
        </div>

        <div className="footer-info">
          <div className="footer-links">
            <a href="#">GitHub</a>
            <a href="#">Portfolio</a>
          </div>

          <div className="footer-copyright">© 2026 Readory. Made by Yoonji</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
