import express from 'express';
import { createTaskController, tasksPageController, newTaskPageController, taskPageController, editTaskController, deleteTaskController } from '../controllers/tasks-controllers.js';
import { guard } from '../middleware/auth-middleware.js';

// El router YA INCLUYE la ruta declarada en app.
export const tasksRouter = express.Router();

// tasks
//      GET / (obtener todas)
//      GET /id (obtener una por su id)
//      POST / (creando una) 
//      PUT  /id (actualizar una)  //! /update/id (evitar)
//      DELETE /id (eliminar una). //! /delete/id (evitar)

// CRUD de Tareas

// C:
tasksRouter.get('/new', newTaskPageController);
tasksRouter.post('/', createTaskController);

// R:
tasksRouter.get('/', tasksPageController);

// U:
tasksRouter.get('/:taskId', taskPageController);
tasksRouter.post('/edit/:taskId', editTaskController);

// D:
tasksRouter.delete('/:taskId', deleteTaskController); // Requeriria lanzar la petición con JS
// tasksRouter.post('/delete/:taskId', editTaskController);