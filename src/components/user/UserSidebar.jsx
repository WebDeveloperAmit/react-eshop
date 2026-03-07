import { FaBox, FaHome, FaKey, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { logout } from "../../redux/slices/auth/authSlice";

const UserSidebar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {

    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout from your account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        Swal.fire({
          title: "Logged Out!",
          text: "You have been logged out.",
          icon: "success"
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    });

  }

  return (
    <div className="dashboard-sidebar">

      <NavLink to="/dashboard">
        <FaHome /> Dashboard
      </NavLink>

      <NavLink to="/my-orders">
        <FaBox /> My Orders
      </NavLink>

      <NavLink to="/profile">
        <FaUser /> Update Profile
      </NavLink>

      <NavLink to="/change-password">
        <FaKey /> Change Password
      </NavLink>

      <button onClick={handleLogout} className="logout-btn">
        <FaSignOutAlt /> Logout
      </button>

    </div>
  );
};

export default UserSidebar;