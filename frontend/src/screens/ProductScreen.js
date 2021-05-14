import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // single page application uchun
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";

function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  const addToCardHandler = () => {
    props.history.push(`/card/${productId}?qty=${qty}`);
  };
  return (
    <div>
      {
        // loading true bo'lsa LoadingBoxni chiqarish
        loading ? (
          <LoadingBox></LoadingBox>
        ) : //xato bo'lsa ErrorBoxni chiqarish
        error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          // yuqoridagilar false bo'lsa sahifani chiqarish
          <div>
            <Link to="/">Back to Result</Link>
            <div className="row top">
              <div className="col-2">
                <img
                  className="large"
                  src={product.image}
                  alt={product.name}
                ></img>
              </div>
              <div className="col-1">
                <ul>
                  <li>
                    <h1>{product.name}</h1>
                  </li>
                  <li>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numberReviews}
                    ></Rating>
                  </li>
                  <li>Price: ${product.price}</li>
                  <li>
                    Desciption:
                    <p>{product.description}</p>
                  </li>
                </ul>
              </div>
              <div className="col-1">
                <div className="card card-body">
                  <ul>
                    <li>
                      <div className="row">
                        <div>Price</div>
                        <div className="price">${product.price}</div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div>Status</div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unvailable</span>
                        )}
                      </div>
                    </li>
                    {product.countInStock > 0 && (
                      // <> -> tegi bu () qavlar ichiga ikkita va undan
                      // ortiq <div> qo'shish uchun kerak
                      <>
                        <li>
                          <div className="row">
                            <div>Qty</div>
                            <div>
                              <select
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                        </li>
                        <li>
                          <button
                            onClick={addToCardHandler}
                            className="primary block"
                          >
                            Add to Card
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default ProductScreen;
