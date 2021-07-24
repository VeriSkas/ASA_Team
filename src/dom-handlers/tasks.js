import { renderTodos } from "./todosRender";

export const tasks_render = () => {
    const allTodos = document.querySelector('.nav-links_allTasks');

    allTodos.addEventListener('click', event => {
        const inputTodos = document.querySelector('.content__todo_form');
        const title = document.querySelector('.content__todo_title');

        title.innerText = 'My To-Do List';
        inputTodos.style.display = 'flex';
        event.preventDefault();
        renderTodos();
    })
}
