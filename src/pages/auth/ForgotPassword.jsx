import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./auth.css";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();

    console.log({ email });
  }

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h3 className="auth-title">Forgot Password</h3>
        <p className="auth-subtitle">
          Enter your email to reset your password
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group-custom">
            <FaEnvelope className="input-icon"/>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

          </div>

          <button className="auth-btn">
            Send Reset Link
          </button>

        </form>

        <p className="auth-footer">
          Remember your password? <Link to="/login">Login</Link>
        </p>

      </div>

    </div>

  )
}

export default ForgotPassword