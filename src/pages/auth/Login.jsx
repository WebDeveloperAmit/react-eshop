import { useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Login</h3>

            <form onSubmit={handleSubmit}>

              <div className="form-group mb-3">
                <label>Email</label>
                <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label>Password</label>
                <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>

            </form>

            <p className="text-center mt-3">
                Don't have an account? <Link to="/register">Register</Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Login