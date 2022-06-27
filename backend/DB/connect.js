import mongoose from 'mongoose';

export const connectDB = () => {
    mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('connect to db');
        })
        .catch((err) => {
            console.log(err.message);
        });
};