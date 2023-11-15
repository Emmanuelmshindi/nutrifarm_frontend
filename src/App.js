import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import { Experts } from "./Pages/Experts";
import { Nutriplans } from "./Pages/Nutriplans";
import { NutriplansDetail } from "./Pages/NutriplansDetail";
import { LogInSignUp } from "./Pages/LogInSignUp";
import { Discussions } from "./Pages/Discussions";
import { Home } from "./Pages/Home";
import { Footer } from "./components/Footer/Footer";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/experts" element={<Experts />} />
          <Route path="/nutriplans" element={<Nutriplans />} />
          <Route path=":nutriplansId" element={Nutriplans} />
          <Route />
          <Route path="/plan_details" element={<NutriplansDetail />} />
          <Route path="/loginsignup" element={<LogInSignUp />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/login" element={<LogInSignUp />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
