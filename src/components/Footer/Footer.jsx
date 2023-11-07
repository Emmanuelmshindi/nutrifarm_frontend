import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-text">NutriFarm © {new Date().getFullYear()}</div>
    </div>
  );
};

export default Footer;
