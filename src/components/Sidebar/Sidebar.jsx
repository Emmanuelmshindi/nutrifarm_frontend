import React from "react";
import "./Sidebar.css";
import { CgProfile } from "react-icons/cg";
import { IoIosStats } from "react-icons/io";
import { BiCalendar } from "react-icons/bi";
import { GoTrophy } from "react-icons/go";
import { BiLogOut } from "react-icons/bi";
import { BiFoodMenu } from "react-icons/bi";
export const Sidebar = () => {
  return (
    <div class="sidebar">
      <ul>
        <li>
          <a href="#">
            <BiFoodMenu />
            <span>Meal plans</span>
          </a>
        </li>
        <li>
          <a href="#">
            <CgProfile />
            <span>Profile</span>
          </a>
        </li>
        <li>
          <a href="#">
            <IoIosStats />
            <span>Stats</span>
          </a>
        </li>
        <li>
          <a href="#">
            <BiCalendar />
            <span>Reminders</span>
          </a>
        </li>
        <li>
          <a href="#">
            <GoTrophy />
            <span>Rewards</span>
          </a>
        </li>
        <li>
          <a href="#">
            <BiLogOut />
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
