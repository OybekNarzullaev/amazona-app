import express from 'express';
import data from './data.js';
import morgan from 'morgan';

const app = express();

app.use(morgan('tiny'));

app.get('/api/products', (req, res) => {
    res.send(data.products);
})
app.get('/api/products/:id', (req, res) => {
    const product = data.products.find(x => x._id == req.params.id);
    if (!product) {
        console.log(req.params.id); // mening xatoyim shunda req.params.id ni req.params._id deganimda!!!
        return res.status(404).send({ message: 'Product not found' });
    }

    return res.send(product);
})
app.get('/', (req, res) => {
    res.send('Server is ready');
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("serve at http://localhost:" + port);
})