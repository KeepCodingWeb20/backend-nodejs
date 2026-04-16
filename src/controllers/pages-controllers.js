import { countPendingTasks } from '../data/tasksRepository.js';

export async function homePageController(req, res, next) {
    // TODO: Añade la variable que falta a la vista.
    // Quiero saber si existe el usuario
    console.log('Session: ', req.session);
    res.render('index.html', {
        title: 'Server HTTP Básico',
    });
}