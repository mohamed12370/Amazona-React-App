import express from 'express';
import data from '../data.js';
import productModel from '../DB/Models/productModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async(req, res) => {
    await productModel.deleteMany({});
    const createProducts = await productModel.insertMany(data.prodects);
    res.send({ createProducts });
});

export default seedRouter;