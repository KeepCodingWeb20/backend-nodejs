import { readFile, writeFile } from 'node:fs/promises';
import { ObjectId } from 'mongodb';

import { Task } from '../models/task-model.js';
const dbClient = {};


const COLLECTION = 'tasks';

export async function getTasks() {
    //     const fileUrl = new URL('./tasks.json', import.meta.url);
    //     const fileContents = await readFile(fileUrl);
    //     return JSON.parse(fileContents);
    // const result = await dbClient.collection(COLLECTION).find({}).toArray();
    const result = Task.find({});
    console.log(result);
    return result;
}

export async function countPendingTasks() {
// const tasks = await getTasks();
// return tasks.filter(task => task.done === false).length;
    // const count = await dbClient.collection(COLLECTION).countDocuments({
    //     done: false,
    // });
    const count = Task.countDocuments({
        done: false,
    });
    return count;
}

export async function getTask(_id) {
    const task = await dbClient.collection(COLLECTION).findOne({
        _id: new ObjectId(_id),
    });
    return task;
}

export async function addNewTask(task) {
    // { title: 'Crear la funcion new task', done: false }
    // Obtener el fichero
    // const tasks = await getTasks();
    // Crear una nueva tarea (dar id)
    // const lastId = tasks.sort((a, b) => a - b )[tasks.length - 1].id;
    // const newTask = { id: lastId+1, ...task };
    // Guardar ese fichero
    // const fileUrl = new URL('./tasks.json', import.meta.url);
    // Añadir esa nueva tarea a la lista
    // tasks.push(newTask);
    // await writeFile(fileUrl, JSON.stringify(tasks));
    // Devolver el objeto creado
    // { id: 5, title: 'Crear la funcion new task', done: false }
    const newTask = await dbClient.collection(COLLECTION).insertOne(task);
    return newTask;
}

export async function updateTask(taskId, updatedTask) {
    // Obtener el fichero
    // const tasks = await getTasks();

    // const taskIdx = tasks.findIndex(i => i.id === taskId);
    // if (taskIdx === -1) {
    //     return;
    // }

    // tasks[taskIdx] = newTask;

    // const fileUrl = new URL('./tasks.json', import.meta.url);
    // await writeFile(fileUrl, JSON.stringify(tasks));

    const task = await dbClient.collection(COLLECTION)
        .updateOne(
            { _id: new ObjectId(taskId) },
            {
                $set: {
                    title: updatedTask.title,
                    done: updatedTask.done,
                }
            }
        );
    return task;
}

export async function deleteTask(taskId) {
    // // Obtener el fichero
    // const tasks = await getTasks();

    // const taskIdx = tasks.findIndex(i => i.id === taskId);
    // if (taskIdx === -1) {
    //     return;
    // };

    // const newTasks = tasks.splice(taskIdx, 1);
    // const fileUrl = new URL('./tasks.json', import.meta.url);
    // await writeFile(fileUrl, JSON.stringify(tasks));
    const deleteResult = dbClient.collection(COLLECTION).deleteOne({
        _id: new ObjectId(taskId),
    })
    return deleteResult;
}