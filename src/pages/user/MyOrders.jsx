import { FaEye } from "react-icons/fa";
import UserSidebar from "../../components/user/UserSidebar";

const MyOrders = () => {
  const orders = [
    { id: 1, product: "T-Shirt", price: 500, status: "Delivered" },
    { id: 2, product: "Shoes", price: 2000, status: "Processing" },
  ];

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <UserSidebar />
        </div>

        <div className="col-md-9">
          <h4>My Orders</h4>

          <table className="table orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Price</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>T-Shirt</td>
                <td>₹500</td>

                <td>
                  <span className="order-status status-delivered">
                    Delivered
                  </span>
                </td>

                <td>
                  <button className="view-btn">
                    <FaEye />
                  </button>
                </td>
              </tr>

              <tr>
                <td>2</td>
                <td>Shoes</td>
                <td>₹2000</td>

                <td>
                  <span className="order-status status-processing">
                    Processing
                  </span>
                </td>

                <td>
                  <button className="view-btn">
                    <FaEye />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
