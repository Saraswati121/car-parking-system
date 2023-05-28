import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

export const Signup = () => {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "",
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, role: value });
  };
  
  const handelChange = (e) => {
    const { value, name } = e.target;
    let modifiedValue = value;
  
    if (name === 'userName') {
      // Check if the first letter is lowercase and capitalize it
      if (value && /^[a-z]/.test(value)) {
        modifiedValue = value.charAt(0).toUpperCase() + value.slice(1);
      }
    }
  
    setFormData({ ...formData, [name]: modifiedValue });
  };
  

  const isValidEmail = (email) => {
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailReg.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userName || !formData.email || !formData.password || !formData.role) {
			alert('Please fill in all details');
			return;
		}
    const { email, password } = formData;

    if (!isValidEmail(email)) {
      alert('Please enter a valid email');
      return;
    }
  
    if (!isValidPassword(password)) {
      alert('Please enter a valid password');
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
              <div className='password_container'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter Password'
                name='password'
                onChange={handelChange}
                value={formData.password}
              />
              <button
                type='button'
                className='show_password_button2'
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className='password_icon'
                />
              </button>
            </div>
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
