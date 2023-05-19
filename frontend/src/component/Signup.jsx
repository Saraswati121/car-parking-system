import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import axios from "axios";

export const Signup = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "",
  });

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, role: value });
  };
  
  const handelChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userName || !formData.email || !formData.password || !formData.role) {
			alert('Please fill in all details');
			return;
		  }
    try {
      let url = "http://localhost:8080/auth/signup";
      const { data } = await axios.post(url, formData);
      console.log(data);
      nav("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signup">
      <div className="Signform_conteiner">
        <div className="left">
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button className="white_btn">SignIn</button>
          </Link>
        </div>
        <div className="right">
          <form onSubmit={handelSubmit} className="form_conteiner">
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Enter Name"
              name="userName"
              value={formData.userName}
              onChange={handelChange}
            />
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={handelChange}
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handelChange}
            />
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="role"
                value={formData.role}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                <FormControlLabel value="User" control={<Radio />} label="User" />
              </RadioGroup>
            </FormControl>
            <button type="submit" className="grn_btn">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
