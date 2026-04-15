import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="container text-center" style={{ padding: "80px 0" }}>
      
      <h1 style={{ color: "green" }}>✅ Order Placed Successfully!</h1>
      
      <p style={{ fontSize: "18px", marginTop: "20px" }}>
        Thank you for your order. Your items will be delivered soon.
      </p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/shop" className="btn btn-primary mr-3">
          Continue Shopping
        </Link>

        <Link to="/my-orders" className="btn btn-outline-dark">
          View Orders
        </Link>
      </div>

    </div>
  );
};

export default OrderSuccess;