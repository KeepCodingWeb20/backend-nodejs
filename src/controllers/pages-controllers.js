import { countPendingTasks } from '../data/tasksRepository.js';

export async function homePageController(req, res, next) {
    // TODO: Añade la variable que falta a la vista.
    const pendingTasks = await countPendingTasks();
    res.render('index.html', {
        title: 'Server HTTP Básico',
        pendingTasks: pendingTasks,
    });
}