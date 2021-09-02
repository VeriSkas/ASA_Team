import { innerTextTitle } from "../shared/constants/textFile";
import {
    getClickedPage,
    removeSortBtn,
    setClickedPage,
    setTitleLS,
    getSearchTodoLS,
    getGroupLS
} from "../shared/ls-service"
import { pageNameInLS } from "../shared/textInLS";
import { calendarLink, renderCalendar } from "./calendar";
import { completedTasks_render, getCompletedTasks } from "./completed_todos";
import { deletedTasks_render, getDeletedTasks } from "./deleted_todos";
import { filtersClick } from "./filtersClick";
import { createGroupLink, renderGroups } from "./groups";
import { getImportantTasks, importantTasks_render } from "./important_todos";
import { getSearchTask, searchLink } from "./search";
import { renderParticipants, userGroupBtn } from "./searchUsers";
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
    renderGroups();

    switch (page) {
        case null:
            inputSearch.style.display = 'none';
            calendar.style.display = 'none';
            inputSearchGroup.style.display = 'none';
            todoList.style.display = 'block';
            sortBtn.style.visibility = 'visible';
            searchTagsBtn.style.visibility = 'hidden';
            title.innerText = innerTextTitle.mainPageText;
            setTitleLS(pageNameInLS.tasks);
            todosElementHandler();
            setClickedPage(pageNameInLS.tasks);
            await renderTodos();
            removeSortBtn();
            break;
        case pageNameInLS.tasks:
            todosElementHandler();
            inputSearch.style.display = 'none';
            calendar.style.display = 'none';
            inputSearchGroup.style.display = 'none';
            todoList.style.display = 'block';
            title.innerText = innerTextTitle.mainPageText;
            inputTodos.style.display = 'flex';
            sortBtn.style.visibility = 'visible';
            searchTagsBtn.style.visibility = 'hidden';
            setTitleLS(pageNameInLS.tasks);
            todoHandler();
            await renderTodos();
            removeSortBtn();
            break;
        case pageNameInLS.importantTasks:
            inputSearch.style.display = 'none';
            calendar.style.display = 'none';
            inputSearchGroup.style.display = 'none';
            todoList.style.display = 'block';
            title.innerText = innerTextTitle.importantTasks;
            inputTodos.style.display = 'none';
            sortBtn.style.visibility = 'visible';
            searchTagsBtn.style.visibility = 'hidden';
            await getImportantTasks();
            removeSortBtn();
            break;
        case pageNameInLS.complitedTasks:
            inputSearch.style.display = 'none';
            calendar.style.display = 'none';
            inputSearchGroup.style.display = 'none';
            todoList.style.display = 'block';
            title.innerText = innerTextTitle.complitedTasks;
            inputTodos.style.display = 'none';
            sortBtn.style.visibility = 'visible';
            searchTagsBtn.style.visibility = 'hidden';
            await getCompletedTasks();
            removeSortBtn();
            break;
        case pageNameInLS.deletedTasks:
            inputSearch.style.display = 'none';
            calendar.style.display = 'none';
            inputSearchGroup.style.display = 'none';
            todoList.style.display = 'block';
            title.innerText = innerTextTitle.deletedTasks;
            inputTodos.style.display = 'none';
            sortBtn.style.visibility = 'visible';
            searchTagsBtn.style.visibility = 'hidden';
            await getDeletedTasks();
            removeSortBtn();
            break;
        case pageNameInLS.calendar:
            inputSearch.style.display = 'none';
            title.innerText = innerTextTitle.calendar;
            inputTodos.style.display = 'none';
            inputSearchGroup.style.display = 'none';
            todoList.style.display = 'none';
            sortBtn.style.visibility = 'hidden';
            searchTagsBtn.style.visibility = 'hidden';
            renderCalendar();
            break;
        case pageNameInLS.search:
            inputSearch.style.display = 'block';
            calendar.style.display = 'none';
            inputSearchGroup.style.display = 'none';
            title.innerText = `${innerTextTitle.search} "${getSearchTodoLS() || ''}"`;
            sortBtn.style.visibility = 'visible';
            searchTagsBtn.style.visibility = 'visible';
            todoList.style.display = 'block';
            inputTodos.style.display = 'none';
            getSearchTodoLS() ? getSearchTask(getSearchTodoLS()) :
                todoList.innerHTML = null;
            break;
        case pageNameInLS.groups:
            const group = getGroupLS();
            group ?
                title.innerText = `${innerTextTitle.groups} "${group.title}"`:
                title.innerText = `${innerTextTitle.groups} ""`;
            inputSearch.style.display = 'none';
            inputSearchGroup.style.display = 'flex';
            inputTodos.style.display = 'flex';
            calendar.style.display = 'none';
            sortBtn.style.visibility = 'visible';
            searchTagsBtn.style.visibility = 'hidden';
            userGroupBtn();
            renderParticipants();
            break;
        case page:
            inputSearch.style.display = 'none';
            calendar.style.display = 'none';
            inputSearchGroup.style.display = 'none';
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
        case clickedPage:
            renderTodos();
            break;
        default:
            break;
    }
}
