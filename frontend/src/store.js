// reduksni import qilish
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
// chrome ga chiqarish uchun
import thunk from "redux-thunk";
import { cardReducer } from "./reducers/cardReducers";
import { orderCreateReducer } from "./reducers/orderReducers";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import { userRegisterReducer, userSigninReducer } from "./reducers/userReducer";

// holatni inital qilish
const initialState = {
  // userInfo refrach da ham saqlab qolish uchun
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  // cardActiondagi itemlarni initsilizatisiya qilib qo'yish
  card: {
    cardItems: localStorage.getItem("cardItems") // localStorage.getItem('cardItems') mavjud bo'lsa qaytarish
      ? JSON.parse(localStorage.getItem("cardItems"))
      : [], //aks holsa bo'sh qiymat qaytarish
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
};
// reducer funksiya backenddan kelgan ma'lumotlar bo'yicha combineReducers funksiyasi yordamida
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  card: cardReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
});
const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// baza shakllantirish
const store = createStore(
  reducer,
  initialState,
  composeEnhacer(applyMiddleware(thunk))
);

// storeni eksport qilish
export default store;
