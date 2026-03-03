import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InnerBanner from '../../components/common/InnerBanner';
import { sendContactMessage } from "./ContactService";

const Contact = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await sendContactMessage(data);
            if (response.status === "success") {
                setTimeout(() => {
                    toast.success(response?.message);
                    reset();
                }, 300);
            } else {
                setTimeout(() => {
                    toast.error(response?.message);
                }, 300);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }

  return (
    <>
        <InnerBanner title="Contact" />
        <div className="container-fluid pt-5">
            <div className="text-center mb-4">
                <h2 className="section-title px-5"><span className="px-2">Contact For Any Queries</span></h2>
            </div>
            <div className="row px-xl-5">
                <div className="col-lg-7 mb-5">
                    <div className="contact-form">
                        <div id="success"></div>
                        <form 
                        name="sentMessage" 
                        id="contactForm"
                        onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="control-group">
                                <input 
                                type="text" 
                                className="form-control" 
                                id="full_name" 
                                placeholder="Your Full Name"
                                {...register("full_name", { required: true })}
                                />
                                <p className="help-block text-danger">
                                    {errors.full_name && <span>Full name is required</span>}
                                </p>
                            </div>

                            <div className="control-group">
                                <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                placeholder="Your Email"
                                {...register("email", { required: true })} 
                                />
                                <p className="help-block text-danger">
                                    {errors.email && <span>Email is required</span>}
                                </p>
                            </div>

                            <div className="control-group">
                                <input 
                                type="text" 
                                className="form-control" 
                                id="subject" 
                                placeholder="Subject"
                                {...register("subject", { required: true })}
                                />
                                <p className="help-block text-danger">
                                    {errors.subject && <span>Subject is required</span>}
                                </p>
                            </div>

                            <div className="control-group">
                                <textarea 
                                className="form-control" 
                                rows="6" 
                                id="message" 
                                placeholder="Message"
                                {...register("message", { required: true })}
                                ></textarea>
                                <p className="help-block text-danger">
                                    {errors.message && <span>Message is required</span>}
                                </p>
                            </div>

                            <div>
                                <button 
                                className="btn btn-primary py-2 px-4" type="submit" 
                                id="sendMessageButton"
                                disabled={isSubmitting}
                                >
                                {isSubmitting ? (
                                    <>
                                        <span className="custom-spinner"></span>
                                        <span style={{ marginLeft: "8px" }}>Sending...</span>
                                    </>
                                ) : (
                                    "Send Message"
                                )}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
                <div className="col-lg-5 mb-5">
                    <h5 className="font-weight-semi-bold mb-3">Get In Touch</h5>
                    <p>Justo sed diam ut sed amet duo amet lorem amet stet sea ipsum, sed duo amet et. Est elitr dolor elitr erat sit sit. Dolor diam et erat clita ipsum justo sed.</p>
                    <div className="d-flex flex-column mb-3">
                        <h5 className="font-weight-semi-bold mb-3">Store 1</h5>
                        <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3"></i>123 Street, New York, USA</p>
                        <p className="mb-2"><i className="fa fa-envelope text-primary mr-3"></i>info@example.com</p>
                        <p className="mb-2"><i className="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890</p>
                    </div>
                    <div className="d-flex flex-column">
                        <h5 className="font-weight-semi-bold mb-3">Store 2</h5>
                        <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3"></i>123 Street, New York, USA</p>
                        <p className="mb-2"><i className="fa fa-envelope text-primary mr-3"></i>info@example.com</p>
                        <p className="mb-0"><i className="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Contact