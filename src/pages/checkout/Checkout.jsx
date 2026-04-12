import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import InnerBanner from '../../components/common/InnerBanner';
import { PlaceOrderService } from '../../services/CheckoutService';

const Checkout = () => {

    const cartProducts = useSelector((state) => state.cart.cart);
    const ShippingCost = 10;
    const totalPrice = cartProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0
    );
    const grandTotal = totalPrice + ShippingCost;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [country, setCountry] = useState('India');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(''); 

    const [shippingAddress, setShippingAddress] = useState({});
    const [useSameBillingAddress, setUseSameBillingAddress] = useState(false);


    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setUseSameBillingAddress(isChecked);
        if (isChecked) {
            // console.log(isChecked);
            setShippingAddress({
                firstName,
                lastName,
                email,
                mobile,
                address1,
                address2,
                country,
                city,
                state,
                zipCode
            });
        } else {
            setShippingAddress({});
        }
    }

    const handlePaymentRadioChange = (method) => {
        if (!method) {
            toast.error('Select payment method');
            return;
        }
        setSelectedPaymentMethod(method);
    }

    const handlePlaceOrder = async () => {
        // Validate form fields
        if (!firstName || !lastName || !email || !mobile || !address1 || !city || !state || !zipCode) {
            toast.error('All fields are required');
            return;
        }

        if (useSameBillingAddress === true) {
            if (!shippingAddress.firstName || !shippingAddress.mobile || !shippingAddress.address1) {
                toast.error('Fill shipping address');
                return;
            }
        }

        const finalShipping = useSameBillingAddress
                            ? shippingAddress
                            : {
                                firstName,
                                lastName,
                                email,
                                mobile,
                                address1,
                                address2,
                                country,
                                city,
                                state,
                                zipCode
                            };

        // Place order logic here
        const orderData = {
            billingAddress: {
                firstName,
                lastName,
                email,
                mobile,
                address1,
                address2,
                country,
                city,
                state,
                zipCode
            },
            shippingAddress: finalShipping,
            orderItems: cartProducts,
            subtotal: totalPrice,
            shipping: ShippingCost,
            paymentMethod: selectedPaymentMethod,
            total: grandTotal
        };

        // console.log('Order Data:', orderData);

        try {
            const res = await PlaceOrderService(orderData);
            if (res?.status) {
                window.location.href = "/order-success";
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error(error.response?.data?.message);
        }

    }

  return (
    <>
        <InnerBanner title="Checkout" />
        <div className="container-fluid pt-5">
            <div className="row px-xl-5">
                <div className="col-lg-8">

                    <div className="mb-4">
                        <h4 className="font-weight-semi-bold mb-4">Billing Address</h4>

                        <div className="row">
                        
                            <div className="col-md-6 form-group">
                                <label>First Name</label>
                                <input 
                                className="form-control" 
                                type="text" 
                                name="firstName"
                                placeholder="John" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>

                            <div className="col-md-6 form-group">
                                <label>Last Name</label>
                                <input 
                                className="form-control" 
                                type="text" 
                                name="lastName"
                                placeholder="Doe" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>

                            <div className="col-md-6 form-group">
                                <label>E-mail</label>
                                <input 
                                className="form-control" 
                                type="email" 
                                name="email"
                                placeholder="example@email.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="col-md-6 form-group">
                                <label>Mobile No</label>
                                <input 
                                className="form-control" 
                                type="text" 
                                name="mobile"
                                placeholder="+91 888 8888 888" 
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                />
                            </div>

                            <div className="col-md-12 form-group">
                                <label>Address Line 1</label>
                                <input 
                                className="form-control" 
                                type="text" 
                                name="address1"
                                placeholder="123 Street" 
                                value={address1}
                                onChange={(e) => setAddress1(e.target.value)}
                                />
                            </div>

                            <div className="col-md-12 form-group">
                                <label>Address Line 2</label>
                                <input 
                                className="form-control" 
                                type="text" 
                                name="address2"
                                placeholder="123 Street" 
                                value={address2}
                                onChange={(e) => setAddress2(e.target.value)}
                                />
                            </div>

                            <div className="col-md-6 form-group">
                                <label>Country</label>
                                <select 
                                className="custom-select" 
                                name="country"
                                onChange={(e) => setCountry(e.target.value)}
                                >
                                    <option value="India">India</option>
                                </select>
                            </div>

                            <div className="col-md-6 form-group">
                                <label>City</label>
                                <input 
                                className="form-control" 
                                type="text" 
                                name="city"
                                placeholder="Kolkata" 
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                />
                            </div>

                            <div className="col-md-6 form-group">
                                <label>State</label>
                                <input 
                                className="form-control" 
                                type="text" 
                                name="state"
                                placeholder="West Bengal" 
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                />
                            </div>

                            <div className="col-md-6 form-group">
                                <label>ZIP Code</label>
                                <input 
                                className="form-control" 
                                type="text" 
                                name="zipCode" 
                                placeholder="123" 
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                />
                            </div>
                        

                            {/* <div className="col-md-12 form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="newaccount" />
                                    <label className="custom-control-label" htmlFor="newaccount">Create an account</label>
                                </div>
                            </div> */}

                            <div className="col-md-12 form-group">
                                <div className="custom-control custom-checkbox">

                                    <input 
                                    type="checkbox" 
                                    className="custom-control-input" 
                                    id="shipto" 
                                    onChange={handleCheckboxChange}
                                    />

                                    <label 
                                    className="custom-control-label" 
                                    htmlFor="shipto"  
                                    data-toggle="collapse" 
                                    data-target="#shipping-address">Same as Billing Address</label>
                                </div>
                            </div>
                        </div>
                            
                    </div>

                    <div className="collapse mb-4" id="shipping-address">
                        <h4 className="font-weight-semi-bold mb-4">Shipping Address</h4>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label>First Name</label>
                                <input 
                                className="form-control" 
                                type="text" 
                                name="firstName" 
                                placeholder="John" 
                                value={shippingAddress.firstName || ''}
                                onChange={(e) => setShippingAddress({
                                    ...shippingAddress, 
                                    firstName: e.target.value
                                })}
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Last Name</label>
                                <input 
                                className="form-control" 
                                type="text" 
                                name="lastName" 
                                placeholder="Doe" 
                                value={shippingAddress.lastName || ''}
                                onChange={(e) => setShippingAddress({
                                    ...shippingAddress,
                                    lastName: e.target.value
                                })}
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>E-mail</label>
                                <input 
                                className="form-control" 
                                type="text" 
                                name="email" 
                                placeholder="example@email.com" 
                                value={shippingAddress.email || ''}
                                onChange={(e) => setShippingAddress({
                                    ...shippingAddress,
                                    email: e.target.value
                                })}
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Mobile No</label>
                                <input 
                                className="form-control" 
                                type="text" 
                                name="mobile" 
                                placeholder="+91 888 8888 888" 
                                value={shippingAddress.mobile || ''}
                                onChange={(e) => setShippingAddress({
                                    ...shippingAddress,
                                    mobile: e.target.value
                                })}
                                />
                            </div>
                            <div className="col-md-12 form-group">
                                <label>Address Line 1</label>
                                <input 
                                className="form-control" 
                                type="text" 
                                name="address1" 
                                placeholder="123 Street" 
                                value={shippingAddress.address1 || ''}
                                onChange={(e) => setShippingAddress({
                                    ...shippingAddress,
                                    address1: e.target.value
                                })}
                                />
                            </div>
                            <div className="col-md-12 form-group">
                                <label>Address Line 2</label>
                                <input 
                                className="form-control" 
                                type="text" 
                                name="address2" 
                                placeholder="123 Street" 
                                value={shippingAddress.address2 || ''}
                                onChange={(e) => setShippingAddress({
                                    ...shippingAddress,
                                    address2: e.target.value
                                })}
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Country</label>
                                <select className="custom-select" name="country" defaultValue="India">
                                    <option value="India">India</option>
                                </select>
                            </div>
                            <div className="col-md-6 form-group">
                                <label>City</label>
                                <input 
                                className="form-control" 
                                type="text" 
                                name="city" 
                                placeholder="Kolkata" 
                                value={shippingAddress.city || ''}
                                onChange={(e) => setShippingAddress({
                                    ...shippingAddress,
                                    city: e.target.value
                                })}
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>State</label>
                                <input 
                                className="form-control" 
                                type="text" 
                                name="state" 
                                placeholder="West Bengal" 
                                value={shippingAddress.state || ''}
                                onChange={(e) => setShippingAddress({
                                    ...shippingAddress,
                                    state: e.target.value
                                })}
                                />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>ZIP Code</label>
                                <input 
                                className="form-control" 
                                type="text" 
                                name="zipCode" 
                                placeholder="123" 
                                value={shippingAddress.zipCode || ''}
                                onChange={(e) => setShippingAddress({
                                    ...shippingAddress,
                                    zipCode: e.target.value
                                })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card border-secondary mb-5">
                        <div className="card-header bg-secondary border-0">
                            <h4 className="font-weight-semi-bold m-0">Order Total</h4>
                        </div>
                        <div className="card-body">
                            <h5 className="font-weight-medium mb-3">Products</h5>
                            {
                                cartProducts && cartProducts.length > 0 ? (
                                    <>
                                        {
                                            cartProducts.map((product, index) => (
                                                <div key={index} className="d-flex justify-content-between">
                                                    <p>{product.product_name}</p>
                                                    <p>₹{product.price.toFixed(2)} x {product.quantity}</p>
                                                </div>
                                            ))
                                        }
                                    </>
                                ) : (
                                    <div className="d-flex justify-content-between">
                                        <p>No product found</p>
                                    </div>
                                )
                            }

                            <hr className="mt-0" />
                            <div className="d-flex justify-content-between mb-3 pt-1">
                                <h6 className="font-weight-medium">Subtotal</h6>
                                <h6 className="font-weight-medium">₹{totalPrice.toFixed(0)}</h6>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6 className="font-weight-medium">Shipping charge</h6>
                                <h6 className="font-weight-medium">₹{ShippingCost.toFixed(0)}</h6>
                            </div>
                        </div>
                        <div className="card-footer border-secondary bg-transparent">
                            <div className="d-flex justify-content-between mt-2">
                                <h5 className="font-weight-bold">Total</h5>
                                <h5 className="font-weight-bold">₹{grandTotal.toFixed(0)}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card border-secondary mb-5">
                        <div className="card-header bg-secondary border-0">
                            <h4 className="font-weight-semi-bold m-0">Payment</h4>
                        </div>

                        <div className="card-body">

                            <div className="form-group">
                                <div className="custom-control custom-radio">
                                    <input 
                                    type="radio" 
                                    className="custom-control-input" 
                                    name="razorpay" 
                                    id="razorpay" 
                                    onChange={() => handlePaymentRadioChange('Razorpay')} 
                                    />
                                    <label className="custom-control-label" htmlFor="razorpay">Razorpay</label>
                                </div>
                            </div>

                            <div className="">
                                <div className="custom-control custom-radio">
                                    <input 
                                    type="radio" 
                                    className="custom-control-input" 
                                    name="cod" 
                                    id="cod" 
                                    onChange={() => handlePaymentRadioChange('COD')} 
                                    />
                                    <label className="custom-control-label" htmlFor="cod">Cash on Delivery</label>
                                </div>
                            </div>

                        </div>

                        <div className="card-footer border-secondary bg-transparent">
                            <button 
                            className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3"
                            onClick={() => handlePlaceOrder()}
                            >Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Checkout