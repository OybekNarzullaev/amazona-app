import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cardConstants";
import Axios from 'axios'
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
            qty
        }
    });
    // itemlarni localStorage ga saqlash kerak
    // chunki page refresh qilinganda card itemlar o'chib ketadi
    localStorage.setItem('cardItems', JSON.stringify(getState().card.cardItems))
}

export const removeFromCard = (productId) => (dispatch, setState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: productId
    });
    localStorage.setItem('cardItems', JSON.stringify(setState().card.cardItems))
}