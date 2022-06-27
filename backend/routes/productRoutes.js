import express from 'express';
import productModel from '../DB/Models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', async(req, res) => {
    const products = await productModel.find({});
    res.send({ products });
});

productRouter.get('/slug/:slug', async(req, res) => {
    const prodect = await productModel.findOne({ slug: req.params.slug });
    if (prodect) {
        res.send(prodect);
    } else {
        res.status(404).send({ message: 'prodect not found' });
    }
});

productRouter.get('/:id', async(req, res) => {
    const prodect = await productModel.findById({ _id: req.params.id });
    console.log(req.params.id);
    if (prodect) {
        res.send(prodect);
    } else {
        res.status(404).send({ message: 'prodect not found' });
    }
});

export default productRouter;