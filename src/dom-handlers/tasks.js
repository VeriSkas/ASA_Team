import { renderTodos, todoHandler } from "./todosRender";
import { setClickedPage, setTitleLS } from '../shared/ls-service';
import { onloadPage } from "./onloadPage";
import { pageNameInLS } from "../shared/textInLS";
import { innerTextTitle } from "../shared/constants/textFile";

export const tasks_render = () => {
    const allTodos = document.querySelector('#nav-links_allTasks');

    // todoHandler();    // возможно придется включить, чтоб при загрузке загружалось создание тасок

    allTodos.onclick = () => {
        const inputTodos = document.querySelector('.content__todo_form');
        const title = document.querySelector('.content__todo_title');
        const calendar = document.querySelector('.calendar__wrapper');
        const todoList = document.querySelector('.content__todo_todosMain');

        title.innerText = innerTextTitle.mainPageText;
        inputTodos.style.display = 'flex';
        calendar.style.display = 'none';
        todoList.style.display = 'block';

        setTitleLS(pageNameInLS.tasks);
        setClickedPage(pageNameInLS.tasks);
        renderTodos();
        onloadPage();
    }
}
