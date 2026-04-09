import express from 'express';

export const pagesRouter = express.Router();

pagesRouter.get('/', (req, res, next) => {
    res.send('Hello World from pages router!');
});

pagesRouter.get('/contact', (req, res, next) => {
    res.send('Need help? Contact us');
});