import {
    getClickedPage,
    removeSortBtn,
    setClickedPage,
    setTitleLS,
    getSearchTodoLS
} from "../shared/ls-service"
import { calendarLink, renderCalendar } from "./calendar";
import { completedTasks_render, getCompletedTasks } from "./completed_todos";
import { deletedTasks_render, getDeletedTasks } from "./deleted_todos";
import { filtersClick } from "./filtersClick";
import { getImportantTasks, importantTasks_render } from "./important_todos";
import { getSearchTask, searchLink } from "./search";
import { tasks_render } from "./tasks";
import { todosElementHandler } from "./todoElement";
import { renderTodos, todoHandler } from "./todosRender";

export const onloadPage = async () => {
    const inputSearch = document.querySelector('.content__todo_formSearch');
    const searchTagsBtn = document.querySelector('.content__todo-filter-filterTags');
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
    searchLink();

    switch (page) {
        case 'tasks':
            todosElementHandler();
            inputSearch.style.display = 'none';
            calendar.style.display = 'none';
            todoList.style.display = 'block';
            title.innerText = 'My To-Do List';
            inputTodos.style.display = 'flex';
            sortBtn.style.visibility = 'visible';
            searchTagsBtn.style.visibility = 'hidden';
            setTitleLS('tasks');
            todoHandler();
            await renderTodos();
            removeSortBtn();
            break;
        case 'importantTasks':
            inputSearch.style.display = 'none';
            calendar.style.display = 'none';
            todoList.style.display = 'block';
            title.innerText = 'Important tasks';
            inputTodos.style.display = 'none';
            sortBtn.style.visibility = 'visible';
            searchTagsBtn.style.visibility = 'hidden';
            await getImportantTasks();
            removeSortBtn();
            break;
        case 'complitedTasks':
            inputSearch.style.display = 'none';
            calendar.style.display = 'none';
            todoList.style.display = 'block';
            title.innerText = 'Completed tasks';
            inputTodos.style.display = 'none';
            sortBtn.style.visibility = 'visible';
            searchTagsBtn.style.visibility = 'hidden';
            await getCompletedTasks();
            removeSortBtn();
            break;
        case 'deletedTasks':
            inputSearch.style.display = 'none';
            calendar.style.display = 'none';
            todoList.style.display = 'block';
            title.innerText = 'Deleted tasks';
            inputTodos.style.display = 'none';
            sortBtn.style.visibility = 'visible';
            searchTagsBtn.style.visibility = 'hidden';
            await getDeletedTasks();
            removeSortBtn();
            break;
        case 'calendar':
            inputSearch.style.display = 'none';
            title.innerText = 'Calendar';
            inputTodos.style.display = 'none';
            todoList.style.display = 'none';
            sortBtn.style.visibility = 'hidden';
            searchTagsBtn.style.visibility = 'hidden';
            renderCalendar();
            break;
        case 'search':
            inputSearch.style.display = 'block';
            calendar.style.display = 'none';
            title.innerText = `Search (${getSearchTodoLS() || ''})`;
            sortBtn.style.visibility = 'visible';
            searchTagsBtn.style.visibility = 'visible';
            todoList.style.display = 'block';
            inputTodos.style.display = 'none';
            getSearchTodoLS() ? getSearchTask(getSearchTodoLS()) :
                todoList.innerHTML = null;
            break;
        case page:
            inputSearch.style.display = 'none';
            calendar.style.display = 'none';
            todoList.style.display = 'block';
            todosElementHandler();
            title.innerText = page;
            inputTodos.style.display = 'flex';
            sortBtn.style.visibility = 'visible';
            searchTagsBtn.style.visibility = 'hidden';
            setTitleLS(page);
            todoHandler();
            await renderTodos();
            removeSortBtn();
            break;
        case !page:
            inputSearch.style.display = 'none';
            calendar.style.display = 'none';
            todoList.style.display = 'block';
            sortBtn.style.visibility = 'visible';
            searchTagsBtn.style.visibility = 'hidden';
            todosElementHandler();
            setTitleLS('tasks');
            setClickedPage('tasks');
            await renderTodos();
            removeSortBtn();
            break;
        default:
            break;
    }
}

export const renderTodosAfterUpdate = () => {
    const clickedPage = getClickedPage();
    switch (clickedPage) {
        case 'tasks':
            renderTodos();
            break;
        case 'importantTasks':
            getImportantTasks();
            break;
        case 'search':
            getSearchTask();
            break;
        case clickedPage:
            renderTodos();
            break;
        default:
            break;
    }
}
