import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import orderModel from '../DB/Models/orderModel.js';
import { isAuth } from '../Utils.js';

const orderRouter = express.Router();

orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async(req, res) => {
        const newOrder = new orderModel({
            orderItems: req.body.orderItems.map((el) => ({...el, product: el._id })),
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });
        const order = await newOrder.save();
        res.status(201).send({ message: 'New Order Craeted', order });
    })
);

export default orderRouter;