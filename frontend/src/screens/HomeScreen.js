import React, { useEffect } from 'react'
// import axios from "axios"; // backenddan frontendga ma'lumotlarni fetch qilish uchun
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

//  home page
function HomeScreen() {
    // // bu react hook. bunda products elementi setProducts yordamida olinadi
    // const [products, setProducts] = useState([]); // useStatedagi bo'sh array bu productsning default holati
    // // bu sahifani fetch qilishdan oldin ishlatiladi
    // const [loading, setLoading] = useState(false); // loading hook default holatda false
    // // bu sahifani fetch qilishda xato bo'lsa chiqadi
    // const [error, setError] = useState(false); // error hook default holarda false

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    // bu hamma sahifa render bo'lgandan so'ng ishga tushuvchi qism
    useEffect(() => {

        // // fetchData -> ma'lumotlarni backenddan olinadigan funksiya
        // const fetchData = async () => {
        //     try {
        //         setLoading(true) // fetch qilishdan oldin loading qilish
        //         const { data } = await axios.get('/api/products'); // backenddan ma'lumotlarni olish
        //         // hookga fetch qilingan ma'lumotlarni uzatish
        //         setLoading(false); //loadingni tugatish;  
        //         setProducts(data);
        //     } catch (err) {
        //         // sahifani yuklashdagi xato bo'lsa setErrorni ishlatish
        //         setError(err.message);
        //         // setErrorni to'xtatib qo'yish
        //         setLoading(false);
        //     }
        // }
        // //funksiyani chaqirish
        // fetchData();

        dispatch(listProducts())
    }, [dispatch])
    return (
        <div>
            {
                // loading true bo'lsa LoadingBoxni chiqarish
                loading ? <LoadingBox></LoadingBox> :
                    //xato bo'lsa ErrorBoxni chiqarish
                    error ? <MessageBox variant='danger'>{error}</MessageBox> :
                        // yuqoridagilar false bo'lsa sahifani chiqarish
                        <div className="row center">
                            {
                                // backenddan olingan products ma'lumotlarni map qilish 
                                products.map(product => (
                                    //har bir productni key si bo'lishi shart
                                    <Product key={product._id} product={product}></Product> //Product componentiga uzatish
                                ))
                            }

                        </div>
            }
        </div>
    )
}

export default HomeScreen
