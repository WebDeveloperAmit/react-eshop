import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomeLayout from "./components/layout/HomeLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Contact from "./pages/contact/Contact";
import Home from './pages/home/Home';
import Shop from "./pages/shop/Shop";
import ShopDetail from "./pages/shop/ShopDetail";
import Dashboard from "./pages/user/Dashboard";
import MyOrders from "./pages/user/MyOrders";
import UpdatePassword from "./pages/user/UpdatePassword";
import UpdateProfile from "./pages/user/UpdateProfile";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeLayout />}>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/profile" element={<UpdateProfile />} />
              <Route path="/change-password" element={<UpdatePassword />} />
            </Route>


            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop-detail/:proId" element={<ShopDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
