import UserSidebar from "../../components/user/UserSidebar";

const Dashboard = () => {

  return (
    <div className="container mt-5">

      <div className="row">

        <div className="col-md-3">
          <UserSidebar/>
        </div>

        <div className="col-md-9">

          <div className="card p-4">

            <h4>User Dashboard</h4>

            <p>Welcome to your account dashboard.</p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard