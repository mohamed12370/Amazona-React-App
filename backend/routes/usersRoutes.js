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

export default userRouter;