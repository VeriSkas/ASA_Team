import { getClickedPage, setClickedPage, setTitleLS } from "../shared/ls-service"
import { calendarLink, renderCalendar } from "./calendar";
import { completedTasks_render, getCompletedTasks } from "./completed_todos";
import { deletedTasks_render, getDeletedTasks } from "./deleted_todos";
import { getImportantTasks, importantTasks_render } from "./important_todos";
import { tasks_render } from "./tasks";
import { todosElementHandler } from "./todoElement";
import { renderTodos, todoHandler } from "./todosRender";

export const onloadPage = async () => {
    const inputTodos = document.querySelector('.content__todo_form');
    const title = document.querySelector('.content__todo_title');
    const todoList = document.querySelector('.content__todo_todosMain');
    const calendar = document.querySelector('.calendar__wrapper');
    const page = getClickedPage();

    tasks_render();
    importantTasks_render();
    completedTasks_render();
    deletedTasks_render();
    calendarLink();

    if (page === 'tasks') {
        todosElementHandler();
        calendar.style.display = 'none';
        todoList.style.display = 'block';
        title.innerText = 'My To-Do List';
        inputTodos.style.display = 'flex';
        setTitleLS('tasks');
        todoHandler();
        await renderTodos();
    } else if (page === 'importantTasks') {
        calendar.style.display = 'none';
        todoList.style.display = 'block';
        title.innerText = 'Important tasks';
        inputTodos.style.display = 'none';
        getImportantTasks();
    } else if (page === 'complitedTasks') {
        calendar.style.display = 'none';
        todoList.style.display = 'block';
        title.innerText = 'Completed tasks';
        inputTodos.style.display = 'none';
        getCompletedTasks();
    } else if (page === 'deletedTasks') {
        calendar.style.display = 'none';
        todoList.style.display = 'block';
        title.innerText = 'Deleted tasks';
        inputTodos.style.display = 'none';
        getDeletedTasks();
    } else if (page === 'calendar') {
        title.innerText = 'Calendar';
        inputTodos.style.display = 'none';
        todoList.style.display = 'none';
        renderCalendar();
    } else if (page) {
        calendar.style.display = 'none';
        todoList.style.display = 'block';
        todosElementHandler();
        title.innerText = page;
        inputTodos.style.display = 'flex';
        setTitleLS(page);
        todoHandler();
        await renderTodos();
    } else if (!page) {
        console.log('not');
        calendar.style.display = 'none';
        todoList.style.display = 'block';
        todosElementHandler();
        setTitleLS('tasks');
        setClickedPage('tasks');
        await renderTodos();
    }
}
