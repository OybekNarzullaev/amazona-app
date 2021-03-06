import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cardConstants";
import { CART_EMPTY } from "../constants/orderConstants";

export const cardReducer = (state = { cardItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // yangi itemni olish
      const item = action.payload;
      console.log(item);
      // item ni existItem sifatida cardItem dan izlash (nu yerda product <-> Id o'rnida)
      const existItem = state.cardItems.find((x) => x.product === item.product);
      //agar ixitsItem mavjud bo'lsa uni yangilash
      if (existItem) {
        return {
          ...state,
          cardItems: state.cardItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      }
      // cardItemda yangi item bo'lmasa cardItem ga itemni concat qilish
      else {
        return { ...state, cardItems: [...state.cardItems, item] };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        // card itemga qayta action.payloaddagi id ga teng bo'lmagan productlarni filterlash
        cardItems: state.cardItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_EMPTY:
      return {
        ...state,
        cardItems: [],
      };
    default:
      return state;
  }
};
