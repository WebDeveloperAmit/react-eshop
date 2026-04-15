import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import UserSidebar from "../../components/user/UserSidebar";
import { changePasswordService } from "../../services/UserService";

const UpdatePassword = () => {

  const [loading, setLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const data = {
    currentPassword,
    newPassword,
    confirmPassword
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if(!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await changePasswordService(data);
      setTimeout(() => {
        if(response?.status === "success") {
          toast.success(response?.message);
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          toast.error(response?.message);
        }
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("UpdatePassword: Error updating password:", error);
      toast.error(error.response?.data?.message);
      setLoading(false);
    }
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-3">
          <UserSidebar />
        </div>

        <div className="col-md-9">
          <div className="card p-4">
            <h4>Change Password</h4>

            <form className="dashboard-form" onSubmit={handleUpdatePassword}>
              <div className="mb-3 password-field">
                <label>Current Password</label>
                <input 
                type={showCurrent ? "text" : "password"} 
                className="form-control" 
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                />

                <span
                  className="password-toggle"
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  {showCurrent ? <FaEyeSlash /> : <FaEye />}
                </span>

              </div>

              <div className="mb-3 password-field">
                <label>New Password</label>
                <input 
                type={showNew ? "text" : "password"}
                className="form-control" 
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                />

                <span
                  className="password-toggle"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <FaEyeSlash /> : <FaEye />}
                </span>

              </div>

              <div className="mb-3 password-field">
                <label>Confirm Password</label>
                <input 
                type={showConfirm ? "text" : "password"}
                className="form-control" 
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <span
                  className="password-toggle"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </span>

              </div>

              <button 
              className="dashboard-btn submit-btn"
              type="submit"
              disabled={loading}
              >
              {loading && <span className="spinner"></span>}
              {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
