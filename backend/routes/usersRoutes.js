import express from 'express';
import userModel from '../DB/Models/userModel.js';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../Utils.js';
const userRouter = express.Router();

userRouter.post(
    '/signin',
    expressAsyncHandler(async(req, res) => {
        const user = await userModel.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).send({ message: 'in-valid email or password' });
    })
);

userRouter.post(
    '/signup',
    expressAsyncHandler(async(req, res) => {
        const newUser = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
        });
        const user = await newUser.save();
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
        });
    })
);

export default userRouter;