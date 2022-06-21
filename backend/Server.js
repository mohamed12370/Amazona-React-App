import express from 'express';
import data from './data.js';
const app = express();

const port = process.env.PORT || 5000;

app.get('/api/prodects', (req, res) => {
    res.send(data.prodects);
});

app.get('/api/prodects/slug/:slug', (req, res) => {
    const prodect = data.prodects.find((x) => x.slug === req.params.slug);
    if (prodect) {
        res.send(prodect);
    } else {
        res.status(404).send({ message: 'prodect not found' });
    }
});

app.get('/api/prodects/:id', (req, res) => {
    const prodect = data.prodects.find((x) => x._id === req.params.id);
    if (prodect) {
        res.send(prodect);
    } else {
        res.status(404).send({ message: 'prodect not found' });
    }
});

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});