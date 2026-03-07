import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserSidebar from "../../components/user/UserSidebar";
import { getUserProfileService, updateUserProfileService } from "../../services/UserService";

const UpdateProfile = () => {

  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserProfileService();
        if(response?.status === "success"){
          setUserData(response?.user);
        } else {
          toast.error(response?.message);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error(error.response?.data?.message);
      }
    }
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await updateUserProfileService(userData);
      setTimeout(() => {
        if(response?.status === "success"){
          toast.success(response?.message);
        } else {
          toast.error(response?.message);
        }
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message);
      setLoading(false);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <UserSidebar />
        </div>

        <div className="col-md-9">
          <div className="card p-4">
            <h4>Update Profile</h4>

            <form className="dashboard-form" onSubmit={handleUpdate}>
              <div className="mb-3">
                <label>Name</label>
                <input 
                type="text" 
                className="form-control"
                name="name"
                value={userData?.name}
                onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input 
                type="email" 
                className="form-control" 
                name="email"
                value={userData?.email}
                onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Phone</label>
                <input 
                type="text" 
                className="form-control" 
                name="mobile"
                value={userData?.mobile}
                onChange={handleChange}
                />
              </div>

              <button 
              type="submit"
              className="dashboard-btn submit-btn"
              disabled={loading}
              >
              {loading && <span className="spinner"></span>}
              {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
