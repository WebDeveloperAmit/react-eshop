import UserSidebar from "../../components/user/UserSidebar";

const Dashboard = () => {
  return (
    <div className="container-fluid dashboard-container">

      <div className="row">

        {/* Sidebar */}
        <div className="col-md-3">
          <UserSidebar />
        </div>

        {/* Dashboard Content */}
        <div className="col-md-9">

          <div className="dashboard-card">

            <div className="dashboard-welcome">
              <h4>Welcome Back 👋</h4>
              <p>Manage your account information and orders.</p>
            </div>

            <div className="row dashboard-stats">

              <div className="col-md-3">
                <div className="stat-box">
                  <div className="stat-number">5</div>
                  <p>Orders</p>
                </div>
              </div>

              <div className="col-md-3">
                <div className="stat-box">
                  <div className="stat-number">2</div>
                  <p>Pending</p>
                </div>
              </div>

              <div className="col-md-3">
                <div className="stat-box">
                  <div className="stat-number">3</div>
                  <p>Wishlist</p>
                </div>
              </div>

              <div className="col-md-3">
                <div className="stat-box">
                  <div className="stat-number">1</div>
                  <p>Cart</p>
                </div>
              </div>

            </div>

            {/* <div className="account-info">
              <h5>Account Information</h5>
              <p><strong>Name:</strong> Amit Das</p>
              <p><strong>Email:</strong> amit@email.com</p>
            </div> */}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;