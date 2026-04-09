import { countPendingTasks } from '../data/tasksRepository.js';

export async function homePageController(req, res, next) {
    const title = 'Server HTTP Básico';
    const pendingTasks = await countPendingTasks();
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
}