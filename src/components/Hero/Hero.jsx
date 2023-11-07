import React from "react";
import "./Hero.css";
import rightarrow from "../Assets/rightarrow.png";
import foodplate from "../Assets/foodplate.png";

export const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>Own Your Health With Organic Diets</h2>
        <div>
          <p>Welcome to your home </p>
          <p>of organic food.Work</p>
          <p>with us to secure your</p>
          <p>health and wellness</p>
          <p>through our organic </p>
          <p>meal plans.</p>
        </div>

        <div className="get-started-btn">
          <div>Get Started</div>
          <img src={rightarrow} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={foodplate} alt="" />
      </div>
    </div>
  );
};

export default Hero;
