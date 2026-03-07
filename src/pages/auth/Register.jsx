import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaPhoneVolume, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerService } from "../../services/auth/AuthService";
import "./auth.css";

const Register = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await registerService(data);
      setTimeout(() => {
          if (response?.status === "success") {
              toast.success(response?.message);
              reset();
              navigate("/login");
          } else {
              toast.error(response?.message);
          }
          setLoading(false);
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.message);
      setLoading(false);
    }
  }

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h3 className="auth-title">Create an Account</h3>
        <p className="auth-subtitle">Join our store today</p>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="input-group-custom">
            <FaUser className="input-icon"/>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-danger mt-1">{errors.name.message}</p>}
          </div>

          <div className="input-group-custom">
            <FaEnvelope className="input-icon"/>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter email"
            />
            {errors.email && <p className="text-danger mt-1">{errors.email.message}</p>}
          </div>

          <div className="input-group-custom">
            <FaPhoneVolume className="input-icon"/>
            <input
              type="text"
              id="mobile"
              placeholder="Enter mobile no"
              {...register("mobile", { required: "Mobile no is required" })}
            />
            {errors.mobile && <p className="text-danger mt-1">{errors.mobile.message}</p>}
          </div>

          <div className="input-group-custom">
            <FaLock className="input-icon"/>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter password"
            />
            {errors.password && <p className="text-danger mt-1">{errors.password.message}</p>}
          </div>

          <button 
          type="submit" 
          className="auth-btn submit-btn"
          disabled={loading}
          >
            {loading && <span className="spinner"></span>}
            {loading ? "Registering..." : "Register"}
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