import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cardConstants";
import Axios from "axios";
// cardAction funksiyasi
export const addToCard = (productId, qty) => async (dispatch, getState) => {
  // birinchi bo'lib bacenddan Id ga muvofiq ma'lumit olamiz:
  const { data } = await Axios.get(`/api/products/${productId}`);
  console.log(`data: ${data}`);
  // dispatch yozamiz:
  dispatch({
    // toifasiga CART_ADD_ITEM yozamiz
    type: CART_ADD_ITEM,
    // payload ga data malumotlarini qaytaramiz
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  });
  // itemlarni localStorage ga saqlash kerak
  // chunki page refresh qilinganda card itemlar o'chib ketadi
  localStorage.setItem("cardItems", JSON.stringify(getState().card.cardItems));
};

export const removeFromCard = (productId) => (dispatch, setState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
  localStorage.setItem("cardItems", JSON.stringify(setState().card.cardItems));
};

// shipping addressni saqlovchi action
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  // reload bo'lganida o'chib ketmasligi uchun localstorage ga saqlash
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
