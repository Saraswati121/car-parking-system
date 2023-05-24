import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const Login = () => {
  const [fdata, setFdata] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const nav = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFdata({ ...fdata, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const isValidEmail = (email) => {
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailReg.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fdata.email || !fdata.password) {
      alert('Please fill in all details');
      return;
    }
    const { email, password } = fdata;

    if (!isValidEmail(email)) {
      alert('Please enter a valid email');
      return;
    }
  
    if (!isValidPassword(password)) {
      alert('Please enter a valid password');
      return;
    }
    try {
      const url = 'http://localhost:8080/auth/login';
      const { data } = await axios.post(url, fdata);
      console.log(data);
      localStorage.setItem('token', data.token);
      if (data.validUser.role === 'Admin') {
        nav('/admin');
      } else {
        nav('/user');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('Invalid credentials');
      }
    }
  };

  return (
    <div className='login_container'>
      <div className='login_form_container'>
        <div className='leftt'>
          <form className='form_container' onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type='email'
              placeholder='Email'
              name='email'
              onChange={handleChange}
              value={fdata.email}
            />
            <br />
            <div className='password_container'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                name='password'
                onChange={handleChange}
                value={fdata.password}
              />
              <button
                type='button'
                className='show_password_button1'
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className='password_icon'
                />
              </button>
            </div>
            <button type='submit' className='grn_btn'>
              Sign In
            </button>
          </form>
        </div>
        <div className='rightt'>
          <h1>New Here?</h1>
          <Link to='/'>
            <button type='button' className='white_btn'>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
