import { getClickedPage, setTitleLS } from "../shared/ls-service"
import { completedTasks_render, getCompletedTasks } from "./completed_todos";
import { deletedTasks_render, getDeletedTasks } from "./deleted_todos";
import { getImportantTasks, importantTasks_render } from "./important_todos";
import { tasks_render } from "./tasks";
import { todosElementHandler } from "./todoElement";
import { renderTodos, todoHandler } from "./todosRender";

export const onloadPage = async () => {
    const inputTodos = document.querySelector('.content__todo_form');
    const title = document.querySelector('.content__todo_title');
    const page = getClickedPage();

    tasks_render();
    importantTasks_render();
    completedTasks_render();
    deletedTasks_render();

    if (page === 'tasks') {
        todosElementHandler();
        title.innerText = 'My To-Do List';
        inputTodos.style.display = 'flex';
        setTitleLS('tasks');
        todoHandler();
        await renderTodos();
    } else if (page === 'importantTasks') {
        title.innerText = 'Important tasks';
        inputTodos.style.display = 'none';
        getImportantTasks();
    } else if (page === 'complitedTasks') {
        title.innerText = 'Completed tasks';
        inputTodos.style.display = 'none';
        getCompletedTasks();
    } else if (page === 'deletedTasks') {
        title.innerText = 'Deleted tasks';
        inputTodos.style.display = 'none';
        getDeletedTasks();
    } else if (page) {
        todosElementHandler();
        title.innerText = page;
        inputTodos.style.display = 'flex';
        setTitleLS(page);
        todoHandler();
        await renderTodos();
    } else if (!page) {
        todosElementHandler();
        setTitleLS('tasks');
        await renderTodos();
    }
}
