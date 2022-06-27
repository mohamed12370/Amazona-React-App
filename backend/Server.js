import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import { connectDB } from './DB/connect.js';
import seedRouter from './routes/seedRoute.js';
import productRouter from './routes/productRoutes.js';
import productModel from './DB/Models/productModel.js';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});