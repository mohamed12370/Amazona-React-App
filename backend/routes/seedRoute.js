import express from 'express';
import data from '../data.js';
import productModel from '../DB/Models/productModel.js';
import userModel from '../DB/Models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async(req, res) => {
    await productModel.deleteMany({});
    const createProducts = await productModel.insertMany(data.prodects);
    await userModel.deleteMany({});
    const createusers = await userModel.insertMany(data.users);
    res.send({ createProducts, createusers });
});

export default seedRouter;