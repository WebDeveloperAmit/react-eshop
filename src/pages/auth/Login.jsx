import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSuccess } from "../../redux/slices/auth/authSlice";
import { loginService } from "../../services/auth/AuthService";
import "./auth.css";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {

    const userData = {
      email: data.email,
      password: data.password
    }
    
    try {
      setLoading(true);
      const response = await loginService(userData);
      setTimeout(() => {
        if (response?.status === "success") {
            toast.success(response?.message);
            reset();  
            dispatch(loginSuccess({
              token: response?.token,
              user: response?.user
            }));
            navigate("/dashboard");
        } else {
          toast.error(response?.message);
        }
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message);
      setLoading(false);
    }
  }

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h3 className="auth-title">Welcome Back</h3>
        <p className="auth-subtitle">Login to your account</p>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="input-group-custom">
            <FaEnvelope className="input-icon"/>
            <input
              type="email"
              placeholder="Enter email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-danger mt-1">{errors.email.message}</p>}
          </div>

          <div className="input-group-custom">
            <FaLock className="input-icon"/>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password", { required: "Password is required" })}
            />

            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

            {errors.password && <p className="text-danger mt-1">{errors.password.message}</p>}
          </div>

          <div className="auth-options">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button 
          type="submit" 
          className="auth-btn submit-btn"
          >
            {loading && <span className="spinner"></span>}
            {loading ? "Logging in..." : "Login"}
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