import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import InnerBanner from '../../components/common/InnerBanner';
import Loader from '../../components/Loader';
import { decrementQuantity, incrementQuantity, removeProductFromCart } from '../../redux/slices/CartSlice';
import { getCartService } from '../../services/CartService';

const Cart = () => {

    const shippingCost = 10;
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [cartData, setCartData] = useState({});

    useEffect(() => {

        const fetchCartData = async () => {
            try {
                setLoading(true);
                const res = await getCartService();
                // console.log("Cart data fetched:", res);
                setTimeout(() => {
                    if (res?.status === "success") {
                        setLoading(false);
                        setCartData(res.data);
                    } else {
                        setLoading(false);
                        toast.error(res?.message);
                    }
                }, 1000);
            } catch (error) {
                setLoading(false);
                console.error("Failed to fetch cart data:", error);
                toast.error("Failed to fetch cart data");
            }
        }

        fetchCartData();

    }, []);


    const handleIncrementQuantity = (productId) => {
        dispatch(incrementQuantity(productId))
    }

    const handleDecrementQuantity = (productId) => {
        dispatch(decrementQuantity(productId))
    }

    const handleRemoveProduct = (product) => {  
        dispatch(removeProductFromCart(product))
    }

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
                        cartData && cartData?.products?.length > 0 ? (
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
    
                                        cartData.products.map((item) => (
                                    
                                            <tr key={item._id}>
                                                <td className="align-middle">
                                                    <img src={`${import.meta.env.VITE_BACKEND_ASSETS_URI}${item.productId.thumbnail_image_url}`} alt={item.productId.product_name} style={{ width: "50px" }} /> {item.productId.product_name}
                                                </td>

                                                <td className="align-middle">₹{item.price.toFixed(2)}</td>

                                                <td className="align-middle">
                                                    <div className="input-group quantity mx-auto" style={{ width: "100px" }}>

                                                        <div className="input-group-btn">
                                                            <button 
                                                            className="btn btn-sm btn-primary btn-minus" 
                                                            onClick={() => 
                                                                handleDecrementQuantity(item._id)
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
                                                                handleIncrementQuantity(item.id)
                                                            }
                                                            >
                                                                <i className="fa fa-plus"></i>
                                                            </button>
                                                        </div>

                                                    </div>
                                                </td>

                                                <td className="align-middle">
                                                    ₹{(item.price * item.quantity).toFixed(2)}
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
                              <h6 className="font-weight-medium"></h6>
                          </div>
                          <div className="d-flex justify-content-between">
                              <h6 className="font-weight-medium">Shipping</h6>
                              <h6 className="font-weight-medium">₹{ shippingCost.toFixed(2) }</h6>
                          </div>
                      </div>
                      <div className="card-footer border-secondary bg-transparent">
                          <div className="d-flex justify-content-between mt-2">
                              <h5 className="font-weight-bold">Total</h5>
                              <h5 className="font-weight-bold">₹{ (cartData.cartTotal + shippingCost).toFixed(2) }</h5>
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