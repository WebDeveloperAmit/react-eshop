import { Link } from "react-router-dom";

const ProductList = ({ products, handleAddToCart }) => {

  return (
    <>
        {products && products.length > 0 ? (
            <>
                {products.map((product, index) => (
                    <div key={index} className="col-lg-4 col-md-6 col-sm-12 pb-1">
                        <div className="card product-item border-0 mb-4">
                            <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                <img 
                                className="img-fluid w-100" 
                                src={`${import.meta.env.VITE_BACKEND_ASSETS_URI}${product.thumbnail_image_url}`} 
                                alt={product.product_name} 
                                />
                            </div>
                            <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                <h6 className="text-truncate mb-3">{product.product_name}</h6>
                                <div className="d-flex justify-content-center align-items-center">
                                    {product.sale_price && product.sale_price < product.regular_price ? (
                                        <>
                                            <h6 className="text-danger mr-2">
                                                ${product.sale_price}
                                            </h6>
                                            <h6 className="text-muted mr-2">
                                                <del>${product.regular_price}</del>
                                            </h6>
                                            <span className="badge badge-success">
                                                {Math.round(
                                                ((product.regular_price - product.sale_price) / product.regular_price) * 100
                                                )}
                                                % OFF
                                            </span>
                                        </>
                                    ) : (
                                            <h6>${product.regular_price}</h6>
                                    )}
                                </div>
                            </div>
                            <div className="card-footer d-flex justify-content-between bg-light border">
                                <Link to={`/shop-detail/${product._id}`} className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</Link>
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

    </>
  )
}

export default ProductList