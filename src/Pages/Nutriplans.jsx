import React, { useContext } from "react";
import "./CSS/Nutriplans.css";
import { NutriplansContext } from "../Context/NutriplansContext";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import axios from "axios";
import { format } from "date-fns";

const baseUrl = "http://localhost:5000";

export const Nutriplans = (props) => {
  const [formData, setFormData] = useState({
    plan_name: "",
    plan_description: "",
  });
  const [plansList, setPlansList] = useState([]);
  const [mealsList, setMealsList] = useState([]);
  const [showPopover, setShowPopover] = useState(false); // To control the visibility of the popover
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [mealsForSelectedPlan, setMealsForSelectedPlan] = useState([]);
  const popoverRef = useRef();
  const [meals, setMeals] = useState([]);

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

  // Function to display meals in a popover
  const displayMealsInPopover = async (plan) => {
    try {
      // Fetch meals for the selected plan
      const mealData = await axios.get(
        `${baseUrl}/api/v1/plans/${plan.id}/meals`
      );
      const { meals } = mealData.data;
      setSelectedPlan(plan);
      setMealsForSelectedPlan(meals);
      setShowPopover(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Function to close the popover
  const closePopover = () => {
    setShowPopover(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        closePopover();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // UseEffect hook to fetch plans and associated meals once the component mounts
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
              placeholder="Name of plan..."
            />
            {/* Textarea for Plan Description */}
            <label htmlFor="plan_description">Plan Description</label>
            <textarea
              name="plan_description"
              id="plan_description"
              value={formData.plan_description}
              onChange={handleChange}
              placeholder="Brief description..."
            />
            <button type="submit">Create Plan</button>
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
                  <button
                    onClick={() => {
                      displayMealsInPopover(plan);
                    }}
                  >
                    See Meals
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {showPopover && (
        <div className="popover" ref={popoverRef}>
          <div className="popover-content">
            <button onClick={closePopover} className="close-button">
              Close
            </button>
            <h3>Meals for {selectedPlan.plan_name} plan</h3>
            <ul>
              {mealsForSelectedPlan.map((meal) => (
                <li key={meal.id} className="meal-card">
                  <strong>Day: </strong> {meal.day}
                  <br />
                  <strong>Meal1: </strong> {meal.meal1}
                  <br />
                  <strong>Meal2: </strong> {meal.meal2}
                  <br />
                  <strong>Description: </strong> {meal.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
