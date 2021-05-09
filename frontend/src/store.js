// reduksni import qilish
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
// chrome ga chiqarish uchun
import thunk from 'redux-thunk';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';

// holatni inital qilish
const initialState = {};
// reducer funksiya backenddan kelgan ma'lumotlar bo'yicha combineReducers funksiyasi yordamida
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer
})
const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// baza shakllantirish
const store = createStore(reducer, initialState, composeEnhacer(applyMiddleware(thunk)));

// storeni eksport qilish
export default store;