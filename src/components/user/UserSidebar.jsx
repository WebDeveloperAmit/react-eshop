import { Link } from "react-router-dom";

const UserSidebar = () => {
  return (
    <div className="dashboard-sidebar">
      <Link to="/dashboard" className="active">
        Dashboard
      </Link>

      <Link to="/my-orders">My Orders</Link>

      <Link to="/profile">Update Profile</Link>

      <Link to="/change-password">Change Password</Link>
    </div>
  );
};

export default UserSidebar;
