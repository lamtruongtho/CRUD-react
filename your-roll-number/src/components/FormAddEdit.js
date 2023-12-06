import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/formAddEdit.css";
import { FormControlLabel, Switch } from "@mui/material";

const URL =
  "https://6535e0e8c620ba9358ecbbc0.mockapi.io/YourRollNumber";

const initialState = {
  name: "",
  rating: "",
  price: "",
  isTopOfTheWeek: true,
  image: "",
  color: "",
  origin: "",
  category: "",

};

const error_init = {
  name_err: "",
  rating_err: "",
  price_err: "",
  image_err: "",
  color_err: "",
  origin_err: "",
  category_err: "",
};

const FormAddEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState(initialState);
  const {
    name,
    rating,
    price,
    isTopOfTheWeek,
    image,
    color,
    origin,
    category,
  } = state;
  const [errors, setErrors] = useState(error_init);

  const getOneFlower = async (id) => {
    const res = await axios.get(`${URL}/${id}`);
    console.log(res);
    if (res.status === 200) {
      setState(res.data);
    }
  };

  useEffect(() => {
    if (id) getOneFlower(id);
  }, [id]);

  const updateFlower = async (flowerID, data) => {
    const res = await axios.put(`${URL}/${flowerID}`, data);
    if (res.status === 200) {
      toast.success(`Updated flower with ID: ${flowerID} successfully ~`);
      navigate("/dashboard");
    }
  };

  const addNewFlower = async (data) => {
    const res = await axios.post(`${URL}`, data);
    if (res.status === 200 || res.status === 201) {
      toast.success("New flower has been added successfully ~");
      navigate("/dashboard");
    }
  };

  // validate
  const validateForm = () => {
    let isValid = true;
    let errors = { ...error_init };

    if (name.trim() === "" || name.length < 2) {
      errors.name_err = "Name is Required";
      if (name.length < 2) {
        errors.name_err = "Name must be more than 2 words";
      }
      isValid = false;
    }

    if (image.trim() === "") {
      errors.image_err = "Image is required";
      isValid = false;
    }

    if (price.toString().trim() === "") {
      errors.price_err = "Price is required!";
      isValid = false;
    }

    if (color.trim() === "") {
      errors.color_err = "color is required";
      isValid = false;
    }
    if (rating.toString().trim() === "") {
      errors.rating_err = "rating is required";
      isValid = false;
    }
    if (origin.trim() === "") {
      errors.origin_err = "origin is required";
      isValid = false;
    }
    if (category.trim() === "") {
      errors.category_err = "category is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      if (id) updateFlower(id, state);
      else addNewFlower(state);
    } else {
      toast.error("Some info is invalid ~ Pls check again");
    }
  };

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    setState((state) => ({ ...state, [name]: value }));
  };

  return (
    <div className="container">
      <div className="form">
        <h2>{id ? "Update Form" : "Add New Staff"}</h2>
        <form onSubmit={handleSubmit}>
          <FormControlLabel
            control={
              <Switch
                id="isTopOfTheWeek"
                name="isTopOfTheWeek"
                checked={state.isTopOfTheWeek}
                onChange={handleInputChange}
              />
            }
            label="isTopOfTheWeek"
          />
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={handleInputChange}
            />
            {errors.name_err && (
              <span className="error">{errors.name_err}</span>
            )}
          </div>
          <div>
            <label htmlFor="image">Image: </label>
            <input
              type="text"
              name="image"
              value={state.image}
              onChange={handleInputChange}
            />
            {errors.avatar_err && (
              <span className="error">{errors.image_err}</span>
            )}
          </div>
          <div>
            <label htmlFor="rating">Rating: </label>
            <input
              type="text"
              name="rating"
              value={state.rating}
              onChange={handleInputChange}
            />
            {errors.rating_err && (
              <span className="error">{errors.rating_err}</span>
            )}
          </div>
          <div>
            <label htmlFor="price">Price: </label>
            <input
              type="number"
              name="price"
              value={state.price}
              onChange={handleInputChange}
            />
            {errors.price_err && (
              <span className="error">{errors.price_err}</span>
            )}
          </div>
          
          <div>
            <label htmlFor="color">Color: </label>
            <input
              type="text"
              name="color"
              value={state.color}
              onChange={handleInputChange}
            />
            {errors.color_err && (
              <span className="error">{errors.color_err}</span>
            )}
          </div>
          <div>
            <label htmlFor="origin">Origin: </label>
            <input
              type="text"
              name="origin"
              value={state.origin}
              onChange={handleInputChange}
            />
            {errors.origin_err && (
              <span className="error">{errors.origin_err}</span>
            )}
          </div>
          <div>
            <label htmlFor="category">Category: </label>
            <input
              type="text"
              name="category"
              value={state.category}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="form-button">
            {id ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormAddEdit;
