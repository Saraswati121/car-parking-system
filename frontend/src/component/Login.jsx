import React ,{ useState }from 'react'
import axios from "axios";
import './style.css'
import { Link,useNavigate } from "react-router-dom";

export const Login = () => {
  const [fdata, setFdata] = useState({ email: "", password: "" })
  
  const nav=useNavigate()
  const handleChange = (e)=>{
    const {value,name} = e.target
    setFdata({...fdata,[name]:value})
  }

	const handleSubmit = async (e) => {
		 e.preventDefault();
		 if (!fdata.email || !fdata.password) {
			alert('Please fill in all details');
			return;
		  }
		  if(fdata.password.length < 8){
			alert("Please enter atleast 8 characters")
		  }
			try{
			const url = "http://localhost:8080/auth/login";
			const { data } = await axios.post(url, fdata);
			console.log(data)
			localStorage.setItem("token", data.token);
            if (data.validUser.role === "Admin") {
              nav("/admin");
            } else {
              nav("/user");
            }
			}catch(err){
				if(err.response && err.response.status === 401){
					alert("Invalid credentials")
				}
			}
  }

  return (
    <div className='login_container'>
      <div className='login_form_container'>
				<div className='leftt'>
					<form className='form_container' onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={fdata.email}
						/>
						<br/><div>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={fdata.password}
						/>
						
						</div>
						<button type="submit" className='grn_btn'>
							Sing In
						</button>
					</form>
				</div>
				<div className='rightt'>
					<h1>New Here ?</h1>
					<Link to="/">
						<button type="button" className='white_btn'>
							Sing Up
						</button>
					</Link>
				</div>
			</div>
    </div>
  )
}

