import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import InnerBanner from '../../components/common/InnerBanner'
import Loader from '../../components/Loader'
import { getProductById } from '../../services/ShopService'
import { addToCart } from '../cart/CartSlice'

const ShopDetail = () => {
    const { proId } = useParams();

    const [loading, setLoading] = useState(false);
    const [proDetail, setProDetail] = useState(null);
    const [proGallery, setProGallery] = useState([]);
    const [localQty, setLocalQty] = useState(1);

    // const cart = useSelector((state) => state.cart.cart)
    // const itemInCart = proDetail ? cart.find(item => item.id === proDetail.id) : null;
    // const quantity = itemInCart ? itemInCart.quantity : 1;
    

    const dispatch = useDispatch();

    useEffect(() => {

        const loadProDetail = async () => {
            try {
                    setLoading(true);
                    const response = await getProductById(proId);
                    console.log("Products loaded:", response);
                    setTimeout(() => {
                        if (response?.status === "success") {
                            setProDetail(response?.data);
                            setProGallery(response?.gallery_images || []);
                            setLoading(false);
                        } else {
                            toast.error(response?.message);
                            setLoading(false);
                        }
                    }, 1000);
            } catch (error) {
                console.error("Failed to load product detail:", error);
                toast.error(error.response?.data?.message);
                setLoading(false);
            }
        };
        loadProDetail();
    }, [proId]);

    // Combine thumbnail + galleries
    const allImages = [
        proDetail?.thumbnail_image_url,
        ...(proGallery.map(g => g.image_url) || [])
    ];

    // console.log("allImages:", allImages);

    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, quantity: localQty }))
        toast.success(`Product added to cart!`);
    }

    // Quantity Increment
    const handleIncrementQuantity = () => {
        // console.log(productId);
        // dispatch(incrementQuantity(productId))
        setLocalQty(prev => prev + 1)
    }

    // Quantity Decrement
    const handleDecrementQuantity = () => {
        // dispatch(decrementQuantity(productId))
        setLocalQty(prev => (prev > 1 ? prev - 1 : 1))
    }

    // if (!proDetail) return <p style={{ textAlign: "center", fontSize: "30px", padding: "50px" }}>Loading...</p>;

    if (!proDetail) return <Loader />;

  return (
    <>
        <InnerBanner title="Shop Detail" />

        <div className="container-fluid py-5">
            <div className="row px-xl-5">
                <div className="col-lg-5 pb-5">
                    <div id="product-carousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner border">

                            {allImages.map((imgUrl, index) => (
                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                    <img 
                                    className="w-100 h-100" 
                                    src={`${import.meta.env.VITE_BACKEND_ASSETS_URI}${imgUrl}`} 
                                    alt={proDetail?.product_name} 
                                    />
                                </div>
                            ))}

                        </div>
                        <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                            <i className="fa fa-2x fa-angle-left text-dark"></i>
                        </a>
                        <a className="carousel-control-next" href="#product-carousel" data-slide="next">
                            <i className="fa fa-2x fa-angle-right text-dark"></i>
                        </a>
                    </div>
                </div>

                <div className="col-lg-7 pb-5">
                    <h3 className="font-weight-semi-bold">{proDetail?.product_name}</h3>
                    <div className="d-flex mb-3">
                        <div className="text-primary mr-2">
                            <small className="fas fa-star"></small>
                            <small className="fas fa-star"></small>
                            <small className="fas fa-star"></small>
                            <small className="fas fa-star-half-alt"></small>
                            <small className="far fa-star"></small>
                        </div>
                        <small className="pt-1">(50 Reviews)</small>
                    </div>

                    <h3 className="font-weight-semi-bold mb-4">
                        {proDetail?.sale_price && proDetail?.sale_price < proDetail?.regular_price ? (
                            <>
                                <p className="text-danger mr-2">
                                    ${proDetail?.sale_price}
                                </p>
                                <p className="text-muted mr-2">
                                    <del>${proDetail?.regular_price}</del>
                                </p>
                                <span className="badge badge-success">
                                    {Math.round(
                                    ((proDetail?.regular_price - proDetail?.sale_price) / proDetail?.regular_price) * 100
                                    )}
                                    % OFF
                                </span>
                            </>
                        ) : (
                                <p>${proDetail?.regular_price}</p>
                        )}
                    </h3>


                    {/* <h3 className="font-weight-semi-bold mb-4">${proDetail.regular_price}</h3> */}
                    <div dangerouslySetInnerHTML={{ __html: proDetail?.short_desc }} />

                    <div className="d-flex align-items-center mb-4 pt-2">
                        <div className="input-group quantity mr-3" style={{ width: "130px" }}>

                            <div className="input-group-btn">
                                <button 
                                className="btn btn-primary btn-minus" 
                                onClick={() => handleDecrementQuantity()}
                                >
                                <i className="fa fa-minus"></i>
                                </button>
                            </div>

                            <input type="text" className="form-control bg-secondary text-center" value={localQty} readOnly />

                            <div className="input-group-btn">
                                <button 
                                className="btn btn-primary btn-plus"
                                onClick={() => handleIncrementQuantity()}
                                >
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <button 
                        className="btn btn-primary px-3"
                        onClick={() => handleAddToCart(proDetail)}
                        ><i className="fa fa-shopping-cart mr-1"></i> Add To Cart</button>
                    </div>
                    <div className="d-flex pt-2">
                        <p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
                        <div className="d-inline-flex">
                            <a className="text-dark px-2" href="">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a className="text-dark px-2" href="">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a className="text-dark px-2" href="">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a className="text-dark px-2" href="">
                                <i className="fab fa-pinterest"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row px-xl-5">
                <div className="col">
                    <div className="nav nav-tabs justify-content-center border-secondary mb-4">
                        <a className="nav-item nav-link active" data-toggle="tab" href="#tab-pane-1">Description</a>
                        <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-2">Information</a>
                        <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-3">Reviews (0)</a>
                    </div>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="tab-pane-1">
                            <h4 className="mb-3">Product Description</h4>
                            <div dangerouslySetInnerHTML={{ __html: proDetail?.long_desc }}></div>
                        </div>
                        
                        <div className="tab-pane fade" id="tab-pane-2">
                            <h4 className="mb-3">Additional Information</h4>
                            <p>No additional information found</p>

                        </div>

                        <div className="tab-pane fade" id="tab-pane-3">
                            <div className="row">
                                <div className='col-12'>No reviews</div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ShopDetail