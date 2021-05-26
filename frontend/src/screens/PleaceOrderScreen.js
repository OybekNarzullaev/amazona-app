import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PleaceOrderScreen(props) {
  const card = useSelector((state) => state.card);
  //const dispatch = useDispatch;
  if (!card.paymentMethod) {
    props.history.push("/payment");
  }
  const orderCreate = useSelector((state) => state.order);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2));
  card.itemsPrice = toPrice(
    card.cardItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  card.shippingPrice = card.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  card.taxPrice = toPrice(card.itemsPrice * 0.15);
  card.totalPrice = card.itemsPrice + card.shippingPrice + card.taxPrice;
  const dispatch = useDispatch;
  const pleaceOrderHandler = () => {
    dispatch(createOrder({ ...card, orderItems: card.cardItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong>
                  {card.shippingAddress.fullName}
                  <br />
                  <strong>Address: </strong>
                  {card.shippingAddress.address}
                  <br />
                  <strong>City: </strong>
                  {card.shippingAddress.city}
                  <br />
                  <strong>Postal Code: </strong>
                  {card.shippingAddress.postalCode}
                  <br />
                  <strong>Country: </strong>
                  {card.shippingAddress.country}
                  <br />
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method: </strong>
                  {card.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {card.cardItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div></div>
                        <div>
                          {item.qty} x ${item.price} = {item.qty * item.price}
                        </div>
                        <div></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${card.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${card.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${card.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>${card.totalPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <button
                  className="primary block"
                  disabled={card.cardItems.length === 0}
                  onClick={pleaceOrderHandler}
                >
                  Pleace Order
                </button>
              </li>
              {loading && <LoadingBox />}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PleaceOrderScreen;
