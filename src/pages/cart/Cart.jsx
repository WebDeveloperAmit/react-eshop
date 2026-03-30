import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import InnerBanner from '../../components/common/InnerBanner';
import Loader from '../../components/Loader';
import { decrementQuantity, incrementQuantity, removeProductFromCart } from '../../redux/slices/CartSlice';
import { removeCartService, updateCartQtyService } from '../../services/CartService';

const Cart = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    // const [cartData, setCartData] = useState({
    //     products: [],
    //     cartTotal: 0
    // });

     const shippingCost = 10;

    // Get cart items from Redux store
    const cartItems = useSelector((state) => state.cart.cart);
    const cartTotal = cartItems.reduce(
        (total, item) =>
        total + Number(item.price || 0) * Number(item.quantity || 0),
        0
    );

    // useEffect(() => {

    //     const fetchCartData = async () => {
    //         try {
    //             setLoading(true);
    //             const res = await getCartService();
    //             // console.log("Cart data fetched:", res);
    //             setTimeout(() => {
    //                 if (res?.status === "success") {
    //                     setLoading(false);
    //                     setCartData(res.data);
    //                 } else {
    //                     setLoading(false);
    //                     toast.error(res?.message);
    //                 }
    //             }, 1000);
    //         } catch (error) {
    //             setLoading(false);
    //             console.error("Failed to fetch cart data:", error);
    //             toast.error("Failed to fetch cart data");
    //         }
    //     }

    //     fetchCartData();

    // }, []);

    const handleIncrementQuantity = async (productId, currentQty) => {
        // console.log("Incrementing quantity for product ID:", productId);
        // return;
        try {
            const newQty = currentQty + 1;
            const res = await updateCartQtyService(productId, newQty);

            if (res?.status === "success") {
                dispatch(incrementQuantity(productId));
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            console.error("Failed to update cart quantity:", error);
            toast.error("Failed to update cart quantity");
        }

    }

    const handleDecrementQuantity = async (productId, currentQty) => {
        // console.log("Incrementing quantity for product ID:", productId);
        // return;
        try {
            const newQty = currentQty - 1;
            const res = await updateCartQtyService(productId, newQty);

            if (res?.status === "success") {
                dispatch(decrementQuantity(productId));
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            console.error("Failed to update cart quantity:", error);
            toast.error("Failed to update cart quantity");
        }

    }

    // Cart item remove
    const handleRemoveProduct = (product) => {
        const toastId = toast.info(
            <div>
                <p>Remove this item?</p>
                <button
                    onClick={() => confirmRemove(product, toastId)}
                    className="btn btn-sm btn-danger mr-2"
                >
                    Yes
                </button>
                <button
                    onClick={() => toast.dismiss(toastId)}
                    className="btn btn-sm btn-secondary"
                >
                    No
                </button>
            </div>,
            { autoClose: false }
        );
    };

    const confirmRemove = async (product, toastId) => {
        // console.log("Removing product:", product);
        // console.log("Removing product:", product.productId);
        // toast.dismiss(toastId);
        try {
            const res = await removeCartService(product.productId);

            if (res?.status === "success") {
                dispatch(removeProductFromCart(product.productId));
                toast.dismiss(toastId);
                toast.success(res?.message);
            }
        } catch (error) {
            toast.error("Failed to remove product");
        }
    };

  return (
    <>
    <InnerBanner title="Cart" />
      <div className="container-fluid pt-5">
          <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5">
                {
                    loading ? (
                        <Loader />
                    ) : (
                        cartItems && cartItems?.length > 0 ? (
                            <>
                                <table className="table table-bordered mb-0">
                                    <thead className="bg-secondary text-dark">
                                        <tr>
                                            <th>Products</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody className="align-middle">
                                    {
                                        cartItems.map((item) => (
                                    
                                            <tr key={item.productId}>
                                                <td className="align-middle">
                                                    <img src={`${import.meta.env.VITE_BACKEND_ASSETS_URI}${item.image}`} alt={item.product_name} style={{ width: "50px" }} /> {item.product_name}
                                                </td>

                                                <td className="align-middle">₹{Number(item.price || 0).toFixed(2)}</td>

                                                <td className="align-middle">
                                                    <div className="input-group quantity mx-auto" style={{ width: "100px" }}>

                                                        <div className="input-group-btn">
                                                            <button 
                                                            className="btn btn-sm btn-primary btn-minus" 
                                                            onClick={() => 
                                                                handleDecrementQuantity(item.productId, item.quantity)
                                                            }
                                                            >
                                                            <i className="fa fa-minus"></i>
                                                            </button>
                                                        </div>

                                                        <input type="text" className="form-control form-control-sm bg-secondary text-center" value={item.quantity} readOnly />

                                                        <div className="input-group-btn">
                                                            <button 
                                                            className="btn btn-sm btn-primary btn-plus"
                                                            onClick={() => 
                                                                handleIncrementQuantity(item.productId, item.quantity)
                                                            }
                                                            >
                                                                <i className="fa fa-plus"></i>
                                                            </button>
                                                        </div>

                                                    </div>
                                                </td>

                                                <td className="align-middle">
                                                    ₹{(
                                                        Number(item.price || 0) *
                                                        Number(item.quantity || 0)
                                                    ).toFixed(2)}
                                                </td>

                                                <td className="align-middle"><button 
                                                className="btn btn-sm btn-primary"
                                                onClick={() => 
                                                    handleRemoveProduct(item)
                                                }
                                                ><i className="fa fa-times"></i></button></td>

                                            </tr>
                                    
                                        ))
                                        
                                    }
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <h3 style={{ fontWeight: 600, textAlign: "center" }}>Cart is empty</h3>
                        )
                    )
                }
            </div>

              <div className="col-lg-4">
                  <form className="mb-5" action="">
                      <div className="input-group">
                          <input type="text" className="form-control p-4" placeholder="Coupon Code" />
                          <div className="input-group-append">
                              <button className="btn btn-primary">Apply Coupon</button>
                          </div>
                      </div>
                  </form>
                  <div className="card border-secondary mb-5">
                      <div className="card-header bg-secondary border-0">
                          <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
                      </div>
                      <div className="card-body">
                          <div className="d-flex justify-content-between mb-3 pt-1">
                              <h6 className="font-weight-medium">Subtotal</h6>
                              <h6 className="font-weight-medium">₹{ cartTotal.toFixed(2) || 0.00 }</h6>
                          </div>
                          <div className="d-flex justify-content-between">
                              <h6 className="font-weight-medium">Shipping</h6>
                              <h6 className="font-weight-medium">₹{ shippingCost.toFixed(2) || 0.00 }</h6>
                          </div>
                      </div>
                      <div className="card-footer border-secondary bg-transparent">
                          <div className="d-flex justify-content-between mt-2">
                              <h5 className="font-weight-bold">Total</h5>
                              <h5 className="font-weight-bold">₹{ (cartTotal + shippingCost)?.toFixed(2) || 0.00 }</h5>
                          </div>
                          <Link 
                          to={`/checkout`}
                          className="btn btn-block btn-primary my-3 py-3"
                          >Proceed To Checkout</Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default Cart