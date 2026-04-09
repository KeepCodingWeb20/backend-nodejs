import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import morgan from 'morgan';

import { pagesRouter } from './routes/pages-routes.js';

// En app.js inicializamos SOLO la app de express
const app = express();
const appDir = dirname(fileURLToPath(import.meta.url));
// const appDir = dirname(import.meta.url);

// Global Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(appDir, '../public')));
app.use(morgan('tiny'));

// Routes
app.use('/', pagesRouter);


// Custom middleware
// Para todas las peticiones
// app.use((req, res, next) => {
//     console.log(req.url);
//     console.log('Nueva Petición!');

//     // Un middlware siempre tiene que contestar a la petición o llamar a next();
//     next();
// });

app.get('/health', (req, res) => {
    res.send({
        status: 'ok!'
    });
});

// Handler 404
// Si ha llegado hasta aqui es que no hay ninguna ruta que lo capture
app.use((req, res) => {
    res.status(404).send('Resource not found');
});


export default app;