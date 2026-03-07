import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserSidebar from "../../components/user/UserSidebar";
import { getAllOrdersService } from "../../services/UserService";

const MyOrders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await getAllOrdersService();
          if(response?.status === "success"){
            setOrders(response?.orders);
          } else {
            toast.error(response?.message);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
          toast.error(error.response?.data?.message);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      }
      fetchOrders();
    }, []);


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
                <th>Order Date</th>
                <th>View</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id}>

                    <td>#{order._id.slice(-6).toUpperCase()}</td>

                    <td>
                      {order.orderItems?.map((item, index) => (
                        <div key={item.product?._id || index}>
                          {item.product?.name || "Product"} (x{item.quantity})
                        </div>
                      ))}
                    </td>

                    <td>₹{order.total}</td>

                    <td>
                      <span className={`order-status ${
                        order.orderStatus === "delivered"
                          ? "status-delivered"
                          : order.orderStatus === "processing"
                          ? "status-pending"
                          : order.orderStatus === "shipped"
                          ? "status-shipped"
                          : "status-cancelled"
                      }`}>
                        {order.orderStatus}
                      </span>
                    </td>

                    <td>
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </td>

                    <td>
                      <Link
                        to={`/shop-detail/${order.orderItems[0]?.product?._id}`}
                        className="view-btn"
                        target="_blank"
                      >
                        <FaEye />
                      </Link>
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
