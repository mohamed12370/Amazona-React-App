import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import { connectDB } from './DB/connect.js';
import seedRouter from './routes/seedRoute.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/usersRoutes.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});