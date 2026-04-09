import express from 'express';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import morgan from 'morgan';

// En app.js inicializamos SOLO la app de express
const app = express();
const appDir = dirname(fileURLToPath(import.meta.url));
// const appDir = dirname(import.meta.url);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(appDir, '../public')));
app.use(morgan('tiny'));

// Custom middleware
// Para todas las peticiones
// app.use((req, res, next) => {
//     console.log(req.url);
//     console.log('Nueva Petición!');

//     // Un middlware siempre tiene que contestar a la petición o llamar a next();
//     next();
// });

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/health', (req, res) => {
    res.send({
        status: 'ok!'
    });
});


export default app;