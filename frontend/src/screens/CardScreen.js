import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCard, removeFromCard } from "../actions/cardAction";
import MessageBox from "../components/MessageBox";

function CardScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  // card ni useSelector yordamida olamiz
  const card = useSelector((state) => state.card);
  console.log(card);
  const { cardItems } = card; // cardItems massivini carddan olamiz

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addToCard(productId, qty));
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    //delete action
    dispatch(removeFromCard(id))
  };

  const checkoutHandler = () => {
    props.history.push("/singin?redirect=shipping");
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cardItems.length === 0 ? (
          <MessageBox>
            Cart is Empty <Link to="/">Go to Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cardItems.map((item) => (
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
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCard(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <button onClick={() => removeFromCartHandler(item.product)}>
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cardItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cardItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <l1>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cardItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </l1>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CardScreen;
