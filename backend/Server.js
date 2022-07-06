import express from 'express';
import path from 'path';
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
app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, '/frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, '/frontend/build/index.html'));
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});