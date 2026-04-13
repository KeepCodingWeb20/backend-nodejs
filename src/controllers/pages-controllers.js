import { countPendingTasks } from '../data/tasksRepository.js';

export async function homePageController(req, res, next) {
    res.render('index.html');
    // TODO: Refactorizar
    return;
    res.locals.title = 'Server HTTP Básico';
    res.locals.pendingTasks = await countPendingTasks();
    res.locals.content = `
        <h1>Server HTTP basico</h1>
        <p>Este ejemplo ya respira web SSR: una ruta HTML, una lista HTML y una ruta de health.</p>
    `;
    res.locals.html = true; // Defino que el contenido es HTML.
    next();
    return;
}