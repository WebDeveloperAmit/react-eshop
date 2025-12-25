import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import InnerBanner from '../../components/common/InnerBanner';
import { decrementQuantity, incrementQuantity, removeProductFromCart } from './CartSlice';

const Cart = () => {

    const shippingCost = 10;
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.cart.cart)
    // console.log(cartProducts)

    // Fetch Grand Total
    const totalPrice = cartProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0 // initial value
    )

    const grandTotal = totalPrice + shippingCost;

    const handleIncrementQuantity = (productId) => {
        // console.log(productId);
        dispatch(incrementQuantity(productId))
    }

    const handleDecrementQuantity = (productId) => {
        dispatch(decrementQuantity(productId))
    }

    const handleRemoveProduct = (product) => {
        //console.log(productId);
        dispatch(removeProductFromCart(product))
    }

  return (
    <>
    <InnerBanner title="Cart" />
      <div className="container-fluid pt-5">
          <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5">
                {
                    cartProducts && cartProducts.length > 0 ? (
                        <>
                            <table className="table table-bordered text-center mb-0">
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
                                    cartProducts.map((product) => (
                                    
                                        <tr key={product.id}>
                                            <td className="align-middle"><img src={product.image} alt={product.title} style={{ width: "50px" }} /> {product.title}</td>

                                            <td className="align-middle">${product.price.toFixed(2)}</td>

                                            <td className="align-middle">
                                                <div className="input-group quantity mx-auto" style={{ width: "100px" }}>

                                                    <div className="input-group-btn">
                                                        <button 
                                                        className="btn btn-sm btn-primary btn-minus" 
                                                        onClick={() => 
                                                            handleDecrementQuantity(product.id)
                                                        }
                                                        >
                                                        <i className="fa fa-minus"></i>
                                                        </button>
                                                    </div>

                                                    <input type="text" className="form-control form-control-sm bg-secondary text-center" value={product.quantity} readOnly />

                                                    <div className="input-group-btn">
                                                        <button 
                                                        className="btn btn-sm btn-primary btn-plus"
                                                        onClick={() => 
                                                            handleIncrementQuantity(product.id)
                                                        }
                                                        >
                                                            <i className="fa fa-plus"></i>
                                                        </button>
                                                    </div>

                                                </div>
                                            </td>

                                            <td className="align-middle">${(product.price * product.quantity).toFixed(2)}</td>

                                            <td className="align-middle"><button 
                                            className="btn btn-sm btn-primary"
                                            onClick={() => 
                                                handleRemoveProduct(product)
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
                              <h6 className="font-weight-medium">${totalPrice.toFixed(2)}</h6>
                          </div>
                          <div className="d-flex justify-content-between">
                              <h6 className="font-weight-medium">Shipping</h6>
                              <h6 className="font-weight-medium">$10</h6>
                          </div>
                      </div>
                      <div className="card-footer border-secondary bg-transparent">
                          <div className="d-flex justify-content-between mt-2">
                              <h5 className="font-weight-bold">Total</h5>
                              <h5 className="font-weight-bold">${grandTotal.toFixed(2)}</h5>
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