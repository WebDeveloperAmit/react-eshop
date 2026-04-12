import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { subscribeNewsletter } from "../../services/CommonService.js";

const Footer = () => {

const [loading, setLoading] = useState(false);

const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
} = useForm()

const onSubmit = async (data) => {
    try {
        setLoading(true);
        const response = await subscribeNewsletter(data);
        setTimeout(() => {
            if (response?.status === "success") {
                toast.success(response?.message);
                reset();
            } else {
                toast.error(response?.message);
            }
            setLoading(false);
        }, 5000);
    } catch (error) {
        console.error("Error subscribing to newsletter:", error);
        toast.error(error.response?.data?.message);
        setLoading(false);
    }
}

  return (
    <>
      <div className="container-fluid bg-secondary text-dark mt-5 pt-5">
          <div className="row px-xl-5 pt-5">
              <div className="col-lg-5 col-md-12 mb-5 pr-3 pr-xl-5">
                  <a href="" className="text-decoration-none">
                      <h1 className="mb-4 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border border-white px-3 mr-1">E</span>Shopper</h1>
                  </a>
                  <p>Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum no sit erat lorem et magna ipsum dolore amet erat.</p>
                  <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3"></i>123 Street, New York, USA</p>
                  <p className="mb-2"><i className="fa fa-envelope text-primary mr-3"></i>info@example.com</p>
                  <p className="mb-0"><i className="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890</p>
              </div>
              <div className="col-lg-7 col-md-12">
                  <div className="row">
                      <div className="col-md-6 mb-5">
                          <h5 className="font-weight-bold text-dark mb-4">Quick Links</h5>
                          <div className="d-flex flex-column justify-content-start">
                              <Link className="text-dark mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>Home</Link>
                              <Link className="text-dark mb-2" to="/shop"><i className="fa fa-angle-right mr-2"></i>Our Shop</Link>
                              <Link className="text-dark mb-2" to="/cart"><i className="fa fa-angle-right mr-2"></i>Shopping Cart</Link>
                              <Link className="text-dark mb-2" to="/checkout"><i className="fa fa-angle-right mr-2"></i>Checkout</Link>
                              <Link className="text-dark" to="/contact"><i className="fa fa-angle-right mr-2"></i>Contact Us</Link>
                          </div>
                      </div>
                      {/* <div className="col-md-4 mb-5">
                          <h5 className="font-weight-bold text-dark mb-4">Quick Links</h5>
                          <div className="d-flex flex-column justify-content-start">
                              <a className="text-dark mb-2" href="index.html"><i className="fa fa-angle-right mr-2"></i>Home</a>
                              <a className="text-dark mb-2" href="shop.html"><i className="fa fa-angle-right mr-2"></i>Our Shop</a>
                              <a className="text-dark mb-2" href="detail.html"><i className="fa fa-angle-right mr-2"></i>Shop Detail</a>
                              <a className="text-dark mb-2" href="cart.html"><i className="fa fa-angle-right mr-2"></i>Shopping Cart</a>
                              <a className="text-dark mb-2" href="checkout.html"><i className="fa fa-angle-right mr-2"></i>Checkout</a>
                              <a className="text-dark" href="contact.html"><i className="fa fa-angle-right mr-2"></i>Contact Us</a>
                          </div>
                      </div> */}
                      <div className="col-md-6 mb-5">
                          <h5 className="font-weight-bold text-dark mb-4">Newsletter</h5>

                          <form onSubmit={handleSubmit(onSubmit)}>

                              <div className="form-group">
                                  <input 
                                  type="text" 
                                  className="form-control border-0 py-4" placeholder="Your Name" 
                                  {...register("name", { required: true })}
                                  />
                                  <p>
                                    {errors.name && <span className="text-danger">Name is required</span>}
                                  </p>
                              </div>

                              <div className="form-group">
                                  <input 
                                  type="email" 
                                  className="form-control border-0 py-4" placeholder="Your Email"
                                    {...register("email", { required: true })}
                                  />
                                  <p>
                                    {errors.email && <span className="text-danger">Email is required</span>}
                                  </p>
                              </div>

                              <div>
                                  <button 
                                  className="btn btn-primary btn-block border-0 py-3 submit-btn" 
                                  type="submit"
                                  disabled={loading}
                                  >
                                    {loading && <span className="spinner"></span>}
                                    {loading ? "Subscribing..." : "Subscribe Now"}
                                    </button>
                              </div>

                          </form>

                      </div>
                  </div>
              </div>
          </div>
          <div className="row border-top border-light mx-xl-5 py-4">
              <div className="col-md-6 px-xl-0">
                  <p className="mb-md-0 text-center text-md-left text-dark">
                      &copy; <a className="text-dark font-weight-semi-bold" href="#">Your Site Name</a>. All Rights Reserved. 
            
            Developed by <a className="text-dark font-weight-semi-bold" href="https://weblayersolutions.com/" target="_blank" rel="noopener noreferrer">WebLayerSolutions.com</a>
                  </p>
              </div>
              <div className="col-md-6 px-xl-0 text-center text-md-right">
                  <img className="img-fluid" src="img/payments.png" alt="" />
              </div>
          </div>
      </div>

      <a 
      href="#" 
      className="btn btn-primary back-to-top"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      ><i className="fa fa-angle-double-up"></i></a>
    </>
  )
}

export default Footer