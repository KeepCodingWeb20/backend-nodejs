import http from 'node:http';

import { PORT, HOST } from './config.js';
import { renderPage } from './renderUtils.js';
import { getTasks } from './tasksRepository.js'


// Extrae estas variables a un archivo config.js
// const port = 8000;
// const host = '127.0.0.1'; // Es lo mismo que localhost

// const tasks = [
//   {
//     "id": 1,
//     "title": "Preparar la clase de asincronia",
//     "done": false
//   },
//   {
//     "id": 2,
//     "title": "Revisar los ejemplos de fs/promises",
//     "done": true
//   },
//   {
//     "id": 3,
//     "title": "Explicar Promise.all en directo",
//     "done": false
//   },
//   {
//     "id": 4,
//     "title": "Refactorizar la función de render",
//     "done": true
//   }
// ]

// En el menu, en tareas debemos mostrar siempre las tareas pendientes



const server = http.createServer( async (req, res) => {

    //console.log(req.headers);
    console.log(req.url);
    let error = false;

    const url = new URL(req.url  ?? '/', `http://${req.headers.host ?? 'localhost'}`);

    // Vamos a crear una url de HEALTH. -> GET /health
    // Va a devolver un json { status: ok }
    if (req.method === 'GET' && url.pathname === '/health') {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8' } );
        res.end(JSON.stringify({ status: 'ok' }));
        return;
    }

    // TODO: cuando navegamos a /tasks, devolvemos el listado de tareas en formato JSON.
    // TODO: devolver las tareas en formato HTML (una lista de: #id - {Nombre} - [x] / [ ])
    // Esta lista tiene que ser dinamica.
    if (req.method === 'GET' && url.pathname === '/tasks') {
        // res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8' } );
        // res.end(JSON.stringify(tasks));
        try {

            const tasks = await getTasks();

            const status = url.searchParams.get('status') ?? 'all';
            
            let filteredTasks;
            if (status === 'pending') {
                filteredTasks = tasks.filter(t => t.done === false);
            } else if (status === 'done') {
                filteredTasks = tasks.filter(t => t.done === true);
            } else {
                filteredTasks = tasks;
            }

            // console.log(req.url); // En node:http el objeto request no parsea la URL

            // TODO: Si existe el parametro status: pending / done / all, filtrar por su estado.

            // TODO: implementar un pequeño menu debajo del título para poder aplicar los filtros de esta pagina.

            const htmlTasks = filteredTasks.map(t => `<li>#${t.id} - ${t.title} - [${t.done ? 'x' : ' '}] </li>`).join('');
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' } );
            // Que pasaria si no existen tareas?
            // Podriamos llegar a poner un "fallback?"
            res.end(
                await renderPage({
                    title: 'Listado de Tareas',
                    content: `
                        <h1>Listado de Tasks</h1>
                        <p>Filtrar tareas:</p>
                        <nav>
                            <a href="/tasks?status=all">Todas las tareas</a>
                            <a href="/tasks?status=pending">Pendientes</a>
                            <a href="/tasks?status=done">Finalizadas</a>
                        </nav>
                        <ul>
                            ${htmlTasks.length === 0 ? '<li>No se han encontrado tareas</li>' : htmlTasks}
                        </ul>
                    `
                })
            );
            return;

        } catch(ex) {
            console.log(ex);
            error = true;
        }

    }

    // 1. En / Devolver un contenido legible (HTML)
    // TODO:
    // Devolver un title
    // Devolver un content con un <h1> y un <p>
    if ( req.method === 'GET' && url.pathname === '/' ) {
        try {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' } );
            res.end(
                await renderPage({
                    title: 'Server HTTP Básico',
                    content: `
                        <h1>Server HTTP basico</h1>
                        <p>Este ejemplo ya respira web SSR: una ruta HTML, una lista HTML y una ruta de health.</p>
                    `
                })
            );
            return;
        } catch(ex) {
            console.log(ex);
            error = true;
        }
    }

    // 2. Asegurarnos que funcionan las rutas que nosotros definimos.

    // En cualquier otro caso, va a devolver un texto plano. 'Servidor HTTP funcionando'



    // TODO: añade un header que informe de la fecha y hora del servidor
    // const serverDate = new Date();
    // res.writeHead(200, {'Content-Type': 'application/json', 'X-Author': 'KeepCoding', 'X-Server-Date': serverDate } );
    // res.end(JSON.stringify({
    //     data: 'Hello World',
    //     serverDate: serverDate
    // }));

    // TODO: Captura de errores
    // Debemos capturar ese posible error
    // Devolver un error 500
    if (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Internal Server Error');
        return;
    }

    // Handler 404
    // No tengo ninguna ruta que conteste a la petición
    // EL orden importa. siempre tiene que ir el ultimo
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Ruta no encontrada');

});

server.listen(PORT, HOST, () => {
    console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
});