import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';

const productRouter = express.Router();

// barcha maxsulotlar uchun / for all products
productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
}));

//maxsulot detallari uchun / for product details
productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    !product ? res.send({ message: 'Product Not Found' }) : res.send(product);
}));

// maxsulotlarni yaratish uchun // for to create products
productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    //await Product.remove({})
    const createProducts = await Product.insertMany(data.products);
    res.send({ createProducts });
}));

export default productRouter;