import express from 'express';

export const pagesRouter = express.Router();

pagesRouter.get('/', (req, res, next) => {
    const title = 'Server HTTP Básico';
    const pendingTasks = 0;
    const content = `
        <h1>Server HTTP basico</h1>
        <p>Este ejemplo ya respira web SSR: una ruta HTML, una lista HTML y una ruta de health.</p>
    `;
    res.send(`
        <!doctype html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <link rel="stylesheet" href="/app.css">
                    <link rel="icon" href="/icon.webp">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>${title}</title>
                </head>
                <body style="">
                    <nav>
                        <a href="/">Inicio</a>
                        <a href="/tasks">Lista de tareas (${pendingTasks})</a>
                        <a href="/health">Estado de la aplicación</a>
                    </nav>
                    ${content}
                </body>
            </html>
    `);
});

pagesRouter.get('/contact', (req, res, next) => {
    res.send('Need help? Contact us');
});