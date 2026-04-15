import { useEffect, useState } from "react";
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
          if(response?.status === "success") {
            // console.log("Orders fetched successfully:", response.orders);
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
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-3">
          <UserSidebar />
        </div>

        <div className="col-md-9">
          <h4>My Orders</h4>

          <table className="table orders-table table-bordered">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Item</th>
                <th>Total Qty</th>
                <th>Total Price</th>
                <th>Order Status</th>
                <th>Payment Method</th>
                <th>Payment Status</th>
                <th>Order Date</th>
                {/* <th>View</th> */}
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
                      {order.orderItems.map((item, index) => (
                        <Link
                          key={item.product?._id || index}
                          to={`/shop-detail/${item.product?._id}`}
                          target="_blank"
                          style={{
                            display: "inline-block",
                            padding: "3px 8px",
                            margin: "2px",
                            background: "#f1f1f1",
                            borderRadius: "12px",
                            fontSize: "12px",
                            textDecoration: "none",
                            color: "#333"
                          }}
                        >
                          {item.product?.product_name || "Product"} x {item.quantity}
                        </Link>
                      ))}
                    </td>

                    <td>{order.orderItems.reduce((total, item) => total + item.quantity, 0)}</td> 
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

                    <td>{order.paymentMethod}</td>
                    <td>{order.paymentStatus}</td>

                    <td>
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </td>

                    {/* <td>
                      <Link
                        to={`/shop-detail/${order.orderItems[0]?.product?._id}`}
                        className="view-btn"
                        target="_blank"
                      >
                        <FaEye />
                      </Link>
                    </td> */}

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
