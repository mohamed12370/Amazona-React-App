import mongoose from 'mongoose';

const prodectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    barnd: { type: String, required: true },
    categoru: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
}, { timestamps: true });

const productModel = mongoose.model('product', prodectSchema);
export default productModel;