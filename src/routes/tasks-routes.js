import express from 'express';
import { createTaskController, tasksPageController, newTaskPageController, taskPageController } from '../controllers/tasks-controllers.js';

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

tasksRouter.get('/:taskId', taskPageController);

