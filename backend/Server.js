import express from 'express';
import data from './data.js';
const app = express();
const port = process.env.PORT || 5000;
// test
app.get('/api/prodects', (req, res) => {
    res.send(data.prodects);
});

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});