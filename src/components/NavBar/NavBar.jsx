import React, { useState } from "react";
import "./NavBar.css";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";

function NavBar() {
  const [menu, setMenu] = useState("home");
  return (
    <div className="navbar">
      <div className="nav-logo">
        {/* <Link style={{ textDecoration: "none" }} to="/"> */}
        <img src={logo} alt="" />
        {/* </Link> */}
      </div>
      <ul className="nav-menu">
        {/* <li
          onClick={() => {
            setMenu("home");
          }}
        >
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            Home
          </Link>
          {menu === "home" ? <hr /> : <></>}
        </li> */}
        <li
          onClick={() => {
            setMenu("nutriplans");
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/nutriplans"
          >
            Nutriplans
          </Link>
          {menu === "nutriplans" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("discussions");
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/discussions"
          >
            Discussions
          </Link>
          {menu === "discussions" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("experts");
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/experts"
          >
            Meet Our Experts
          </Link>
          {menu === "experts" ? <hr /> : <></>}
        </li>
      </ul>

      <div className="nav-login-notifications">
        {/* <Link style={{ textDecoration: "none" }} to="/login">
          <button>Login</button>
        </Link> */}
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/discussions"
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAASlJREFUSEvtldGNwjAMhm1ggApngLJJmQRukoNJYBPYBAaIUQcgMnLFcUlJSFqEdA+X16b/Z/+ObYQPH/ywPhQDjDGNiOw0IET8stYeS4LLAqqqqmeTyQoQNz+CAnBGkb29XLY5yEuARg0ih5SIggBgy8z71J0kICfuZ/MKkgQQ0QkB6pwF+l0zYeZF7G4UYObzb9/zEgiIbGI1iQOI1PemSPj30tEyL/v/RAFD7PFrEbMplYEMjL67bpmf9P4BgZNFFnWjYTo9janB1blF27ba3Y8T1OAurgNt6BPtBLXhnHNLHxIAzLj3HyTb7+o+YNTz7Nvp1yIAENEOAdZj/Pf+CTo6uw/ehJVtNCJaI0C3zR4nMdyKZlEs6vuEbQSgLt1mqvM3LHqnDjdhqHsZabSqHgAAAABJRU5ErkJggg=="
            alt=""
          />
        </Link>

        <div className="notif-count">0</div>
      </div>
    </div>
  );
}

export default NavBar;
