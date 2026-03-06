import UserSidebar from "../../components/user/UserSidebar";

const UpdatePassword = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <UserSidebar />
        </div>

        <div className="col-md-9">
          <div className="card p-4">
            <h4>Change Password</h4>

            <form className="dashboard-form">
              <div className="mb-3">
                <label>Current Password</label>
                <input type="password" className="form-control" />
              </div>

              <div className="mb-3">
                <label>New Password</label>
                <input type="password" className="form-control" />
              </div>

              <div className="mb-3">
                <label>Confirm Password</label>
                <input type="password" className="form-control" />
              </div>

              <button className="dashboard-btn">Update Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
