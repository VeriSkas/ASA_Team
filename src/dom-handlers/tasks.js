import { renderTodos, todoHandler } from "./todosRender";
import { setClickedPage, setTitleLS } from '../shared/ls-service';
import { onloadPage } from "./onloadPage";
import { pageNameInLS } from "../shared/textInLS";

export const tasks_render = () => {
    const allTodos = document.querySelector('#nav-links_allTasks');

    todoHandler();

    allTodos.onclick = () => {
        const inputTodos = document.querySelector('.content__todo_form');
        const title = document.querySelector('.content__todo_title');
        const calendar = document.querySelector('.calendar__wrapper');
        const todoList = document.querySelector('.content__todo_todosMain');

        title.innerText = 'My To-Do List';
        inputTodos.style.display = 'flex';
        calendar.style.display = 'none';
        todoList.style.display = 'block';

        setTitleLS(pageNameInLS.tasks);
        setClickedPage(pageNameInLS.tasks);
        renderTodos();
        onloadPage();
    }
}
