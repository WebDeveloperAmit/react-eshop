import { useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow p-4">

            <h3 className="text-center mb-4">
              Create an Account
            </h3>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label>Name</label>
                <input
                type="text"
                name="name"
                className="form-control"
                onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                type="password"
                name="password"
                className="form-control"
                onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>

            </form>

            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Login</Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Register