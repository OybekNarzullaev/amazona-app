// reduksni import qilish
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
// chrome ga chiqarish uchun
import thunk from 'redux-thunk';
import { cardReducer } from './reducers/cardReducers';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';

// holatni inital qilish
const initialState = {
    // cardActiondagi itemlarni initsilizatisiya qilib qo'yish
    card: {
        cardItems: localStorage.getItem('cardItems') ? // localStorage.getItem('cardItems') mavjud bo'lsa qaytarish
            JSON.parse(localStorage.getItem('cardItems')) :
            [] //aks holsa bo'sh qiymat qaytarish
    }
};
// reducer funksiya backenddan kelgan ma'lumotlar bo'yicha combineReducers funksiyasi yordamida
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    card: cardReducer
})
const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// baza shakllantirish
const store = createStore(reducer, initialState, composeEnhacer(applyMiddleware(thunk)));

// storeni eksport qilish
export default store;