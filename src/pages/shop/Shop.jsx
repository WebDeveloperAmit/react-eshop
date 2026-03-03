import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import InnerBanner from '../../components/common/InnerBanner';
import Loader from '../../components/Loader.jsx';
import ProductList from '../../components/ProductList.jsx';
import { fetchProducts } from '../../services/ShopService.js';
import { addToCart } from '../cart/CartSlice.js';

const Shop = () => {

    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState([]);
    const [localQty, setLocalQty] = useState(1);

    const dispatch = useDispatch()

    useEffect(() => {
        const loadProducts = async () => {
            try {
                    setLoading(true);
                    const response = await fetchProducts();
                    // console.log("Products loaded:", response);
                    setTimeout(() => {
                        if (response?.status === "success") {
                            setProducts(response?.data);
                            setLoading(false);
                        } else {
                            toast.error(response?.message);
                            setLoading(false);
                        }
                    }, 1000);
            } catch (error) {
                console.error("Failed to load products:", error);
                toast.error(error.response?.data?.message);
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, quantity: localQty }))
        toast.success(`Product added to cart!`);
    }

    // fetch all category and calculates how many products belong to each category
    const categoryCounts = products.reduce((acc, product) => {

        if (acc[product.category_name]) 
        {
            acc[product.category_name]++;
        } 
        else 
        {
            acc[product.category_name] = 1;
        }

        return acc;

    }, {})

    // fetch all brand and calculates how many products belong to each brand
    const brandCounts = products.reduce((acc, product) => {

        if (acc[product.brand_name]) 
        {
            acc[product.brand_name]++;
        } 
        else 
        {
            acc[product.brand_name] = 1;
        }

        return acc;

    }, {})

    // console.log("Category counts:", categoryCounts);
    // console.log("Brand counts:", brandCounts);

  return (
    <>
        <InnerBanner title="Shop" />

        <div className="container-fluid pt-5">
            <div className="row px-xl-5">
                <div className="col-lg-3 col-md-12">

                    {/* Filter By Categories */}
                    <div className="border-bottom mb-4 pb-4">
                        <h5 className="font-weight-semi-bold mb-4">Filter by categories</h5>
                        <form>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input" id="color-all" />
                                <label className="custom-control-label" htmlFor="price-all">All Categories</label>
                                <span className="badge border font-weight-normal">{products && products.length > 0 ? products.length : 0}</span>
                            </div>

                            {
                                Object.entries(categoryCounts).map(([item, count]) => (
                                    <div key={item} className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                        <input 
                                        type="checkbox" 
                                        className="custom-control-input" 
                                        id={`color-${item}`} 
                                        />
                                        <label className="custom-control-label" htmlFor={`color-${item}`}>{item}</label>
                                        <span className="badge border font-weight-normal">{count}</span>
                                    </div>
                                ))
                            }

                        </form>
                    </div>

                    {/* Filter By Brands */}
                    <div className="border-bottom mb-4 pb-4">
                        <h5 className="font-weight-semi-bold mb-4">Filter by brands</h5>
                        <form>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input" id="color-all" />
                                <label className="custom-control-label" htmlFor="price-all">All Brands</label>
                                <span className="badge border font-weight-normal">{products && products.length > 0 ? products.length : 0}</span>
                            </div>

                            {
                                Object.entries(brandCounts).map(([item, count]) => (
                                    <div key={item} className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                        <input 
                                        type="checkbox" 
                                        className="custom-control-input" 
                                        id={`color-${item}`} 
                                        />
                                        <label className="custom-control-label" htmlFor={`color-${item}`}>{item}</label>
                                        <span className="badge border font-weight-normal">{count}</span>
                                    </div>
                                ))
                            }

                        </form>
                    </div>

                    {/* Filter By Price */}
                    <div className="border-bottom mb-4 pb-4">
                        <h5 className="font-weight-semi-bold mb-4">Filter by price</h5>

                        <form>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input" id="price-all" />
                                <label className="custom-control-label" htmlFor="price-all">All Price</label>
                                <span className="badge border font-weight-normal">1000</span>
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input" id="price-1" />
                                <label className="custom-control-label" htmlFor="price-1">$0 - $100</label>
                                <span className="badge border font-weight-normal">150</span>
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input" id="price-2" />
                                <label className="custom-control-label" htmlFor="price-2">$100 - $200</label>
                                <span className="badge border font-weight-normal">295</span>
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input" id="price-3" />
                                <label className="custom-control-label" htmlFor="price-3">$200 - $300</label>
                                <span className="badge border font-weight-normal">246</span>
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input" id="price-4" />
                                <label className="custom-control-label" htmlFor="price-4">$300 - $400</label>
                                <span className="badge border font-weight-normal">145</span>
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                                <input type="checkbox" className="custom-control-input" id="price-5" />
                                <label className="custom-control-label" htmlFor="price-5">$400 - $500</label>
                                <span className="badge border font-weight-normal">168</span>
                            </div>
                        </form>

                    </div>

                </div>

                <div className="col-lg-9 col-md-12">
                    <div className="row pb-3">
                        <div className="col-12 pb-1">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <form action="">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Search by name" />
                                        <div className="input-group-append">
                                            <span className="input-group-text bg-transparent text-primary">
                                                <i className="fa fa-search"></i>
                                            </span>
                                        </div>
                                    </div>
                                </form>
                                <div className="dropdown ml-4">
                                    <button className="btn border dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                                Sort by
                                            </button>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">
                                        <a className="dropdown-item" href="#">Ascending</a>
                                        <a className="dropdown-item" href="#">Descending</a>
                                        {/* <a className="dropdown-item" href="#">Best Rating</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {loading ? (
                            <Loader />
                        ) : (
                            <ProductList 
                            products={products} 
                            handleAddToCart={handleAddToCart} 
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Shop