import React, { useContext } from "react";
import "./CSS/Nutriplans.css";
import { NutriplansContext } from "../Context/NutriplansContext";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import axios from "axios";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { BiFoodMenu } from "react-icons/bi";

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
  const [planId, setPlanId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  // Fetch existing meal plans from server and append to list
  const fetchPlans = async () => {
    const data = await axios.get(`${baseUrl}/api/v1/plans`);
    const { plans } = data.data;
    setPlansList(plans);
  };

  // Function to handle changes in the input fields
  const handleChange = (e, field) => {
    if (field === "editName") {
      setEditName(e.target.value);
    } else if (field === "editDescription") {
      setEditDescription(e.target.value);
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editDescription && editName) {
        const data = await axios.put(`${baseUrl}/api/v1/plans/${planId}`, {
          plan_name: editName,
          plan_description: editDescription,
        });
        const updatedPlan = data.data.plan;
        const updatedList = plansList.map((plan) => {
          if (plan.id === planId) {
            return (plan = updatedPlan);
          }
          return plan;
        });
        const plansData = await axios.get(`${baseUrl}/api/v1/plans`);
        const { plans } = plansData.data;
        setPlansList(plans);
      } else {
        const data = await axios.post(`${baseUrl}/api/v1/plans`, formData);
        setPlansList([...plansList, data.data]);
      }
      setFormData({ plan_name: "", plan_description: "" });
      setEditDescription("");
      setEditName("");
      setPlanId(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Function to handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/v1/plans/${id}`);
      const updatePlansList = plansList.filter((plan) => plan.id !== id);
      setPlansList(updatePlansList);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Function to show edit modal
  const openEditModal = (plan) => {
    setPlanId(plan.id);
    setEditName(plan.plan_name);
    setEditDescription(plan.plan_description);
    setIsEditModalVisible(true);
  };

  // Function to close the edit modal
  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };

  // // Function to handle edit
  // const handleEdit = (plan) => {
  //   try {
  //     setPlanId(plan.id);
  //     setEditName(plan.plan_name);
  //     setEditDescription(plan.plan_description);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  // Handle cancel
  const handleCancel = () => {
    // e.preventDefault();
    setEditName(""); // Reset editName
    setEditDescription(""); // Reset editDescription
    // setIsEditModalVisible(false); // Close the modal
    closeEditModal(); // Close the modal
    setPlanId(null);
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
              onChange={(e) => handleChange(e, "plan_name")}
              placeholder="Name of plan..."
            />
            {/* Textarea for Plan Description */}
            <label htmlFor="plan_description">Plan Description</label>
            <textarea
              name="plan_description"
              id="plan_description"
              value={formData.plan_description}
              onChange={(e) => handleChange(e, "plan_description")}
              placeholder="Brief description..."
            />
            <button type="submit">Create Plan</button>
          </form>
        </div>
        <div className="entries">
          <ul>
            {/* Display the list of plans with their names and descriptions */}
            {plansList.map((plan) => {
              if (planId === plan.id) {
                // Render the edit modal
                return (
                  <li key={plan.id} className="card">
                    <form onSubmit={handleSubmit}>
                      {/* Input for Plan Name */}
                      <label htmlFor="plan_name">Plan Name</label>
                      <input
                        type="text"
                        name="editName"
                        id="editName"
                        value={editName}
                        onChange={(e) => handleChange(e, "editName")}
                        placeholder="Edit plan name"
                      />
                      {/* Textarea for Plan Description */}
                      <label htmlFor="plan_description">Plan Description</label>
                      <textarea
                        name="editDescription"
                        id="editDescription"
                        value={editDescription}
                        onChange={(e) => handleChange(e, "editDescription")}
                        placeholder="Edit plan description"
                      />
                      <button type="submit">Save changes</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </form>
                  </li>
                );
              } else {
                // Render the plan list view
                return (
                  <li key={plan.id} className="card">
                    {format(new Date(plan.created_at), "MM/dd, p")}:{" "}
                    <strong>Plan Name: </strong>
                    {plan.plan_name}
                    <br />
                    <strong>Plan Description: </strong>
                    {plan.description}
                    <button
                      onClick={() => {
                        displayMealsInPopover(plan);
                      }}
                      className="tooltip-trigger"
                      data-tooltip="Display meals"
                    >
                      <BiFoodMenu color="#262626" size="1.5em" />
                    </button>
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="tooltip-trigger"
                      data-tooltip="Delete"
                    >
                      <RiDeleteBin6Line color="#262626" size="1.5em" />
                    </button>
                    <button
                      // onClick={() => handleEdit(plan)}
                      onClick={() => openEditModal(plan)}
                      className="tooltip-trigger"
                      data-tooltip="Edit"
                    >
                      <BiEdit color="#262626" size="1.5em" />
                    </button>
                  </li>
                );
              }
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
