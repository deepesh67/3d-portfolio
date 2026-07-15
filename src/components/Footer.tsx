import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} Khushi Jangid
        </div>
      </div>
    </footer>
  );
};

export default Footer;
