
import { readFile, writeFile } from 'node:fs/promises';

export async function getTasks() {
    const fileUrl = new URL('./tasks.json', import.meta.url);
    const fileContents = await readFile(fileUrl);
    return JSON.parse(fileContents);
}

export async function countPendingTasks() {
    const tasks = await getTasks();
    return tasks.filter(task => task.done === false).length;
}

export async function addNewTask(task) {
    // { title: 'Crear la funcion new task', done: false }
    // Obtener el fichero
    const tasks = await getTasks();
    // Crear una nueva tarea (dar id)
    const lastId = tasks.sort((a, b) => a - b )[tasks.length - 1].id;
    const newTask = { id: lastId+1, ...task };
    // Guardar ese fichero
    const fileUrl = new URL('./tasks.json', import.meta.url);
    // Añadir esa nueva tarea a la lista
    tasks.push(newTask);
    await writeFile(fileUrl, JSON.stringify(tasks));
    // Devolver el objeto creado
    // { id: 5, title: 'Crear la funcion new task', done: false }
    return newTask;
}

export async function updateTask(taskId, newTask) {
    // Obtener el fichero
    const tasks = await getTasks();

    const taskIdx = tasks.findIndex(i => i.id === taskId);
    if (taskIdx === -1) {
        return;
    }

    tasks[taskIdx] = newTask;

    const fileUrl = new URL('./tasks.json', import.meta.url);
    await writeFile(fileUrl, JSON.stringify(tasks));
    return newTask;
}

export async function deleteTask(taskId) {
    // Obtener el fichero
    const tasks = await getTasks();

    const taskIdx = tasks.findIndex(i => i.id === taskId);
    if (taskIdx === -1) {
        return;
    };

    const newTasks = tasks.splice(taskIdx, 1);
    const fileUrl = new URL('./tasks.json', import.meta.url);
    await writeFile(fileUrl, JSON.stringify(tasks));
    return tasks;
}