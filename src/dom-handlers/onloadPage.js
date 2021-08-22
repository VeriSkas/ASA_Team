import { getClickedPage, removeSortBtn, setClickedPage, setTitleLS } from "../shared/ls-service"
import { calendarLink, renderCalendar } from "./calendar";
import { completedTasks_render, getCompletedTasks } from "./completed_todos";
import { deletedTasks_render, getDeletedTasks } from "./deleted_todos";
import { filtersClick } from "./filtersClick";
import { getImportantTasks, importantTasks_render } from "./important_todos";
import { tasks_render } from "./tasks";
import { todosElementHandler } from "./todoElement";
import { renderTodos, todoHandler } from "./todosRender";

export const onloadPage = async () => {
    const inputTodos = document.querySelector('.content__todo_form');
    const title = document.querySelector('.content__todo_title');
    const todoList = document.querySelector('.content__todo_todosMain');
    const calendar = document.querySelector('.calendar__wrapper');
    const sortBtn = document.querySelector('.content__todo-filter-sort');
    const taskMenu = document.querySelector('.content__todoMenu');
    const page = getClickedPage();

    taskMenu.classList.add('close');
    tasks_render();
    importantTasks_render();
    completedTasks_render();
    deletedTasks_render();
    calendarLink();
    filtersClick();

    if (page === 'tasks') {
        todosElementHandler();
        calendar.style.display = 'none';
        todoList.style.display = 'block';
        title.innerText = 'My To-Do List';
        inputTodos.style.display = 'flex';
        sortBtn.style.visibility = 'visible';
        setTitleLS('tasks');
        todoHandler();
        await renderTodos();
        removeSortBtn();
    } else if (page === 'importantTasks') {
        calendar.style.display = 'none';
        todoList.style.display = 'block';
        title.innerText = 'Important tasks';
        inputTodos.style.display = 'none';
        sortBtn.style.visibility = 'visible';
        await getImportantTasks();
        removeSortBtn();
    } else if (page === 'complitedTasks') {
        calendar.style.display = 'none';
        todoList.style.display = 'block';
        title.innerText = 'Completed tasks';
        inputTodos.style.display = 'none';
        sortBtn.style.visibility = 'visible';
        await getCompletedTasks();
        removeSortBtn();
    } else if (page === 'deletedTasks') {
        calendar.style.display = 'none';
        todoList.style.display = 'block';
        title.innerText = 'Deleted tasks';
        inputTodos.style.display = 'none';
        sortBtn.style.visibility = 'visible';
        await getDeletedTasks();
        removeSortBtn();
    } else if (page === 'calendar') {
        title.innerText = 'Calendar';
        inputTodos.style.display = 'none';
        todoList.style.display = 'none';
        sortBtn.style.visibility = 'hidden';
        renderCalendar();
    } else if (page) {
        calendar.style.display = 'none';
        todoList.style.display = 'block';
        todosElementHandler();
        title.innerText = page;
        inputTodos.style.display = 'flex';
        sortBtn.style.visibility = 'visible';
        setTitleLS(page);
        todoHandler();
        await renderTodos();
        removeSortBtn();
    } else if (!page) {
        calendar.style.display = 'none';
        todoList.style.display = 'block';
        sortBtn.style.visibility = 'visible';
        todosElementHandler();
        setTitleLS('tasks');
        setClickedPage('tasks');
        await renderTodos();
        removeSortBtn();
    }

}
