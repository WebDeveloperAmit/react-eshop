import { FaBox, FaHome, FaKey, FaSignOutAlt, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const UserSidebar = () => {
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

      <NavLink to="/logout">
        <FaSignOutAlt /> Logout
      </NavLink>

    </div>
  );
};

export default UserSidebar;