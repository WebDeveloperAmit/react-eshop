import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import InnerBanner from '../../components/common/InnerBanner';
import { fetchShopProducts } from '../../services/ShopService';
import { addToCart } from '../cart/CartSlice';


const Shop = () => {

    const [products, setProducts] = useState([]);
    const [localQty, setLocalQty] = useState(1);

    const dispatch = useDispatch()

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchShopProducts();
            if (data) setProducts(data);
        }
        loadProducts();
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, quantity: localQty }))
        toast.success(`Product added to cart!`);
    }

    // fetch all category and calculates how many products belong to each category
    const categoryCounts = products.reduce((acc, product) => {
        if (acc[product.category]) {
            acc[product.category]++;
        } else {
            acc[product.category] = 1;
        }
        return acc;
    }, {})

    if (!products) return <p style={{ textAlign: "center", fontSize: "30px", padding: "50px" }}>Loading...</p>;

  return (
    <>
        <InnerBanner title="Shop" />

        <div className="container-fluid pt-5">
            <div className="row px-xl-5">
                <div className="col-lg-3 col-md-12">
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
                                    <div key={item.id} className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                        <input type="checkbox" className="custom-control-input" id="color-1" />
                                        <label className="custom-control-label" htmlFor="color-1">{item}</label>
                                        <span className="badge border font-weight-normal">{count}</span>
                                    </div>
                                ))
                            }

                        </form>
                    </div>

                    {/* <div className="mb-5">
                        <h5 className="font-weight-semi-bold mb-4">Filter by size</h5>
                        <form>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input" id="size-all" />
                                <label className="custom-control-label" htmlFor="size-all">All Size</label>
                                <span className="badge border font-weight-normal">1000</span>
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input" id="size-1" />
                                <label className="custom-control-label" htmlFor="size-1">XS</label>
                                <span className="badge border font-weight-normal">150</span>
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input" id="size-2" />
                                <label className="custom-control-label" htmlFor="size-2">S</label>
                                <span className="badge border font-weight-normal">295</span>
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input" id="size-3" />
                                <label className="custom-control-label" htmlFor="size-3">M</label>
                                <span className="badge border font-weight-normal">246</span>
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input" id="size-4" />
                                <label className="custom-control-label" htmlFor="size-4">L</label>
                                <span className="badge border font-weight-normal">145</span>
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                                <input type="checkbox" className="custom-control-input" id="size-5" />
                                <label className="custom-control-label" htmlFor="size-5">XL</label>
                                <span className="badge border font-weight-normal">168</span>
                            </div>
                        </form>
                    </div> */}

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
                                        <a className="dropdown-item" href="#">Latest</a>
                                        <a className="dropdown-item" href="#">Popularity</a>
                                        <a className="dropdown-item" href="#">Best Rating</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {products && products.length > 0 ? (
                            <>
                                {products.map((product) => (
                                    <div key={product.id} className="col-lg-4 col-md-6 col-sm-12 pb-1">
                                        <div className="card product-item border-0 mb-4">
                                            <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                                <img 
                                                className="img-fluid w-100" 
                                                src={product.image} 
                                                alt={product.title} 
                                                />
                                            </div>
                                            <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                                <h6 className="text-truncate mb-3">{product.title}</h6>
                                                <div className="d-flex justify-content-center">
                                                    <h6>${product.price}</h6>
                                                </div>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between bg-light border">
                                                <Link to={`/shop-detail/${product.id}`} className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</Link>
                                                <a 
                                                href="#" 
                                                className="btn btn-sm text-dark p-0"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleAddToCart(product);
                                                }}
                                                ><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="col-12 pb-1">
                                <h4 className="center-text" style={{ padding: "40px", textAlign: "center" }}>No products found</h4>
                            </div>
                        )}

                        <div className="col-12 pb-1">
                            <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center mb-3">
                                <li className="page-item disabled">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                </li>
                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                </a>
                                </li>
                            </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Shop