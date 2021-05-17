import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cardAction";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingAddressScreen(props) {
  // user ma'lumotlarini olish
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  // agar autinfikatsiyadan o'tmagan bo'lsa signin ga o'tish
  if (!userInfo) {
    props.history.push("/signin");
  }
  // kiritilgan ma'lumiotlarni saqlab qolish
  const card = useSelector((state) => state.card);
  const { shippingAddress } = card;
  //react hook lar
  const [fullName, setFullname] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [country, setCountry] = useState(shippingAddress.country);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const dispatch = useDispatch();
  // bumit qilingandan keyingi funksiya
  const submitHandler = (e) => {
    e.preventDefault();
    // To Do dispatch save shipping address action
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );

    props.history.push("/payment");
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            placeholder="Enter full name"
            onChange={(e) => setFullname(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            placeholder="Enter address"
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            placeholder="Enter city"
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            placeholder="Enter address"
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            value={country}
            placeholder="Enter country"
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingAddressScreen;
