import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./auth.css";

const Register = () => {

  const [user,setUser] = useState({
    name:"",
    email:"",
    password:""
  })

  const handleChange = (e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(user)
  }

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h3 className="auth-title">Create Account</h3>
        <p className="auth-subtitle">Join our store today</p>

        <form onSubmit={handleSubmit}>

          {/* Name */}

          <div className="input-group-custom">
            <FaUser className="input-icon"/>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </div>

          {/* Email */}

          <div className="input-group-custom">
            <FaEnvelope className="input-icon"/>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
          </div>

          {/* Password */}

          <div className="input-group-custom">
            <FaLock className="input-icon"/>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
            />
          </div>

          <button className="auth-btn">
            Register
          </button>

        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
  )
}

export default Register