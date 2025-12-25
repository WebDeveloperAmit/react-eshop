import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomeLayout from "./components/layout/HomeLayout";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Contact from "./pages/contact/Contact";
import Home from './pages/home/Home';
import Shop from "./pages/shop/Shop";
import ShopDetail from "./pages/shop/ShopDetail";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
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
