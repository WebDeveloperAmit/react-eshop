import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./auth.css";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();

    const userData = {
      email,
      password
    }

    console.log(userData);
  }

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h3 className="auth-title">Welcome Back</h3>
        <p className="auth-subtitle">Login to your account</p>

        <form onSubmit={handleSubmit}>

          <div className="input-group-custom">
            <FaEnvelope className="input-icon"/>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="input-group-custom">
            <FaLock className="input-icon"/>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <div className="auth-options">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button className="auth-btn">
            Login
          </button>

        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

      </div>

    </div>

  )
}

export default Login