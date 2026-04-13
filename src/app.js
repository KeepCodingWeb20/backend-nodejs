import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import morgan from 'morgan';
import ejs from 'ejs';

import { pagesRouter } from './routes/pages-routes.js';
import { utilitesRouter } from './routes/utilities-router.js';
import { tasksRouter } from './routes/tasks-routes.js';

// En app.js inicializamos SOLO la app de express
const app = express();
const appDir = dirname(fileURLToPath(import.meta.url)); // __dirname
// const appDir = dirname(import.meta.url);

// Global Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(appDir, '../public')));
app.use(morgan('tiny'));

// Configuración del motor de plantillas
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('views', join(appDir, 'views'));

// Routes
app.use('/', pagesRouter);
app.use('/', utilitesRouter);
app.use('/tasks', tasksRouter);
// 1. Task router



// Custom middleware
// Para todas las peticiones
// app.use((req, res, next) => {
//     console.log(req.url);
//     console.log('Nueva Petición!');

//     // Un middlware siempre tiene que contestar a la petición o llamar a next();
//     next();
// });

app.use((req, res, next) => {
    const renderHtml = res.locals.html; // Evaluo si el contenido es HTML.
    if (!renderHtml) {
        next(); // Si no es HTML, no tengo nada que hacer. Next();
        return;
    }

    // En caso que si que sea HTML, construyo el template y lo envio.
    const title = res.locals.title || 'Express APP';
    const pendingTasks = res.locals.pendingTasks || 0;
    const content = res.locals.content || '<p>Express App</p>';

    res.send(`
        <!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <link rel="stylesheet" href="/app.css">
                <link rel="icon" href="/icon.webp">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
                <title>${title}</title>
            </head>
            <body style="">
                <nav class="container">
                    <a href="/">Inicio</a>
                    <a href="/tasks">Lista de tareas (${pendingTasks})</a>
                    <a href="/health">Estado de la aplicación</a>
                </nav>
                ${content}

                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
            </body>
        </html>    
    `);

})

// Handler 404
// Si ha llegado hasta aqui es que no hay ninguna ruta que lo capture
app.use((req, res) => {
    res.status(404).send('Resource not found');
});


export default app;