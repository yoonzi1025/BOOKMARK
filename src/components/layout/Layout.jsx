import Navbar from "../common/navbar/Navbar";
import Footer from "../common/footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="page-container">
        <div className="page-content"> {children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
