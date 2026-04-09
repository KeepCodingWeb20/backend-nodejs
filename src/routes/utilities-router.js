import express from 'express';

export const utilitesRouter = express.Router();

utilitesRouter.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        date: new Date().toISOString(),
    });
});
