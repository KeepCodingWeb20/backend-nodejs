import { countPendingTasks } from './tasksRepository.js';
// Vamos a encapsular todo el código relacionado con el render de páginas html

// TODO: Extrae la logica comun para escribir el contenido de html
// Una funcion que reciba titulo y contenido
// Devuelva el HTML con un pequeño menu de navegacion, el titulo y el contenido
export async function renderPage({ title, content }) {
    const pendingTasks = await countPendingTasks();
    return `
        <!doctype html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>${title}</title>
                </head>
                <body style="font-family: sans-serif; max-width: 48rem; margin: 2rem auto; padding: 0 1rem;">
                    <nav>
                        <a href="/">Inicio</a>
                        <a href="/tasks">Lista de tareas (${pendingTasks})</a>
                        <a href="/health">Estado de la aplicación</a>
                    </nav>
                    ${content}
                </body>
            </html>
    `;
}


