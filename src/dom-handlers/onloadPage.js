import { innerTextTitle } from "../shared/constants/textFile";
import {
    getClickedPage,
    removeSortBtn,
    setClickedPage,
    setTitleLS,
    getSearchTodoLS,
    getGroupLS,
    removeTitleLS
} from "../shared/ls-service"
import { pageNameInLS } from "../shared/textInLS";
import { calendarLink, renderCalendar } from "./calendar";
import { completedTasks_render, getCompletedTasks } from "./completed_todos";
import { deletedTasks_render, getDeletedTasks } from "./deleted_todos";
import { filtersClick } from "./filtersClick";
import { createGroupLink } from "./groups";
import { getImportantTasks, importantTasks_render } from "./important_todos";
import { getSearchTask, searchLink } from "./search";
import { renderParticipants, userGroupBtn } from "./searchUsers";
import { createGroupTodos, renderGroupTodos } from './groupTodos';
import { tasks_render } from "./tasks";
import { todosElementHandler } from "./todoElement";
import { renderTodos, todoHandler } from "./todosRender";

export const onloadPage = async () => {
    const inputSearch = document.querySelector('.content__todo_formSearch');
    const searchTagsBtn = document.querySelector('.content__todo-filter-filterTags');
    const inputTodos = document.querySelector('.content__todo_form');
    const inputSearchGroup = document.querySelector('.content__todo_formSearchGroup');
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
    createGroupLink();
    inputSearch.style.display = 'none';
    calendar.style.display = 'none';
    inputSearchGroup.style.display = 'none';
    todoList.style.display = 'none';
    inputTodos.style.display = 'none';
    sortBtn.style.visibility = 'hidden';
    searchTagsBtn.style.visibility = 'hidden';

    switch (page) {
        case null:
            setClickedPage(pageNameInLS.tasks);
            onloadPage();
            break;
        case pageNameInLS.tasks:
            todoList.style.display = 'block';
            inputTodos.style.display = 'flex';
            sortBtn.style.visibility = 'visible';
            title.innerText = innerTextTitle.mainPageText;
            todosElementHandler();
            setTitleLS(pageNameInLS.tasks);
            todoHandler();
            await renderTodos();
            removeSortBtn();
            break;
        case pageNameInLS.importantTasks:
            title.innerText = innerTextTitle.importantTasks;
            todoList.style.display = 'block';
            sortBtn.style.visibility = 'visible';
            await getImportantTasks();
            removeSortBtn();
            break;
        case pageNameInLS.complitedTasks:
            title.innerText = innerTextTitle.complitedTasks;
            todoList.style.display = 'block';
            sortBtn.style.visibility = 'visible';
            await getCompletedTasks();
            removeSortBtn();
            break;
        case pageNameInLS.deletedTasks:
            title.innerText = innerTextTitle.deletedTasks;
            todoList.style.display = 'block';
            sortBtn.style.visibility = 'visible';
            await getDeletedTasks();
            removeSortBtn();
            break;
        case pageNameInLS.calendar:
            calendar.style.display = 'grid';
            title.innerText = innerTextTitle.calendar;
            renderCalendar();
            break;
        case pageNameInLS.search:
            title.innerText = `${innerTextTitle.search} "${getSearchTodoLS() || ''}"`;
            inputSearch.style.display = 'block';
            sortBtn.style.visibility = 'visible';
            searchTagsBtn.style.visibility = 'visible';
            todoList.style.display = 'block';
            getSearchTodoLS() ? getSearchTask(getSearchTodoLS()) :
                todoList.innerHTML = null;
            break;
        case pageNameInLS.groups:
            const group = getGroupLS();
            group ?
                title.innerText = `${innerTextTitle.groups} "${group.title}"`:
                title.innerText = `${innerTextTitle.groups} ""`;
            inputSearchGroup.style.display = 'flex';
            inputTodos.style.display = 'flex';
            sortBtn.style.visibility = 'visible';
            removeTitleLS();
            userGroupBtn();
            renderParticipants();
            createGroupTodos();
            renderGroupTodos();
            break;
        case page:
            todoList.style.display = 'block';
            title.innerText = page;
            inputTodos.style.display = 'flex';
            sortBtn.style.visibility = 'visible';
            todosElementHandler();
            setTitleLS(page);
            todoHandler();
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
        case pageNameInLS.tasks:
            renderTodos();
            break;
        case pageNameInLS.importantTasks:
            getImportantTasks();
            break;
        case pageNameInLS.search:
            getSearchTask(getSearchTodoLS());
            break;
        case pageNameInLS.groups:
            break;
        case clickedPage:
            renderTodos();
            break;
        default:
            break;
    }
}
