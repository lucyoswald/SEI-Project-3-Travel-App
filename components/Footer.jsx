import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  console.log(location);
  return (
    <footer>
      <div
        className={
          location.pathname === "/" ||
          location.pathname === "/login" ||
          location.pathname === "/signup"
            ? "footer_home"
            : "footer"
        }
      >
        <p className="footer-links">
          <span className="built-by">Built by</span>
          <a href="https://github.com/lucyoswald" target="_blank">
            Lucy Oswald |
          </a>
          <a href="https://github.com/kpetersen04" target="_blank">
            Kirstin Petersen |
          </a>
          <a href="https://github.com/karaguarraci" target="_blank">
            Kara Guarraci
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
