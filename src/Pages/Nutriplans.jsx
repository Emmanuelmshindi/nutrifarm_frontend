import React, { useContext } from "react";
import "./CSS/Nutriplans.css";
import { NutriplansContext } from "../Context/NutriplansContext";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import axios from "axios";
import { format } from "date-fns";

const baseUrl = "http://localhost:5000";

export const Nutriplans = (props) => {
  const [formData, setFormData] = useState({
    plan_name: "",
    description: "",
  });
  const [plansList, setPlansList] = useState([]);

  // Fetch existing meal plans from server and append to list
  const fetchPlans = async () => {
    const data = await axios.get(`${baseUrl}/api/v1/plans`);
    const { plans } = data.data;
    setPlansList(plans);
  };

  // Function to handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`${baseUrl}/api/v1/plans`, formData);
      setPlansList([...plansList, data.data]);
      setFormData({ plan_name: "", plan_description: "" });
    } catch (err) {
      console.error(err.message);
    }
  };

  // UseEffect hook to fetch plans once the component mounts
  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="nutriplans-page">
      <div>
        <Sidebar />
      </div>
      <div className="sub-form">
        <div className="form-area">
          <form onSubmit={handleSubmit}>
            {/* Input for Plan Name */}
            <label htmlFor="plan_name">Plan Name</label>
            <input
              type="text"
              name="plan_name"
              id="plan_name"
              value={formData.plan_name}
              onChange={handleChange}
            />
            {/* Textarea for Plan Description */}
            <label htmlFor="description">Plan Description</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="entries">
          <ul>
            {/* Display the list of plans with their names and descriptions */}
            {plansList.map((plan) => {
              return (
                <li key={plan.id} className="card">
                  <strong>Plan Name: </strong>
                  {plan.plan_name}
                  <br />
                  <strong>Plan Description: </strong>
                  {plan.description}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
