import { readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';

// TMP
// import { setTimeout as wait } from 'node:timers/promises'

// TODO 
export async function getTasks() {
    // await wait(5000);
    const fileUrl = new URL('./tasks.json', import.meta.url);
    const fileContents = await readFile(fileUrl);
    // const fileContents = await readFileSync(fileUrl);
    return JSON.parse(fileContents);
}

// Crear una funcion que devuelva las tareas pendientes
export async function countPendingTasks() {
    const tasks = await getTasks();
    return tasks.filter(task => task.done === false).length;
}