import UserSidebar from "../../components/user/UserSidebar";

const UpdateProfile = () => {


  
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <UserSidebar />
        </div>

        <div className="col-md-9">
          <div className="card p-4">
            <h4>Update Profile</h4>

            <form className="dashboard-form">
              <div className="mb-3">
                <label>Name</label>
                <input type="text" className="form-control" />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input type="email" className="form-control" />
              </div>

              <div className="mb-3">
                <label>Phone</label>
                <input type="text" className="form-control" />
              </div>

              <button className="dashboard-btn">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
