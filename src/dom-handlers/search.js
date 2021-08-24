import moment from 'moment';
import { deleteTodo, getSubtask, getTodos, updateTodo } from "../api/api-handlers";
import {
    getUID,
    setClickedPage,
    setTask,
    setSearchTodoLS,
    setTodo,
    getSearchTodoLS
} from "../shared/ls-service";
import { onloadPage } from "./onloadPage";
import { filterByTagMain, filterByTagUrgent, searchTaskFilter } from '../shared/filters';
import { sortTodoRender } from "./filtersClick";
import { todoMenuSidebar } from "./todoMenu";
import { checkLengthTodo } from "../shared/validators";
import { pageNameInLS, searchTagTextInLS } from '../shared/textInLS';

export const searchLink = () => {
    const searchLink = document.querySelector('#nav-links_searchTodos');
    const title = document.querySelector('.content__todo_title');
    const inputSearch = document.querySelector('.content__todo_formSearch-input');
    const searchBtn = document.querySelector('.content__todo_formSearch-searchTodoBtn');
    const tagMainSearch = document.querySelector('#content__todo-filter-filterTags-main');
    const tagUrgentSearch = document.querySelector('#content__todo-filter-filterTags-urgent');

    searchLink.onclick = () => {
        title.innerText = `Search (${getSearchTodoLS() || ''})`;
        setClickedPage(pageNameInLS.search);
        onloadPage();
    }

    searchBtn.onclick = event => {
        event.preventDefault();
        let searchValue = inputSearch.value;
        getSearchTask(searchValue);
        setSearchTodoLS(searchValue);
        inputSearch.value = '';
        title.innerText = `Search (${getSearchTodoLS() || ''})`;
    }

    tagMainSearch.onclick = () => {
        inputSearch.value = '';
        getSearchTask(searchTagTextInLS.tagMain);
        setSearchTodoLS(searchTagTextInLS.tagMain);
        title.innerText = `Search (${getSearchTodoLS() || ''})`;
    }

    tagUrgentSearch.onclick = () => {
        inputSearch.value = '';
        getSearchTask(searchTagTextInLS.tagUrgent);
        setSearchTodoLS(searchTagTextInLS.tagUrgent);
        title.innerText = `Search (${getSearchTodoLS() || ''})`;
    }
}

export const getSearchTask = async value => {
    return getTodos()
        .then( todos => {
            const todosContainer = document.querySelector('.content__todo_todosMain');
            const taskMenu = document.querySelector('.content__todoMenu');
            const taskMenuTitle = document.querySelector('.content__todoMenu_subtask_title');
            todosContainer.innerHTML = null;

            if (todos) {
                todos = sortTodoRender(todos);

                switch (value) {
                    case searchTagTextInLS.tagMain:
                        todos = filterByTagMain(todos);
                        break;
                    case searchTagTextInLS.tagUrgent:
                        todos = filterByTagUrgent(todos);
                        break;
                    case value:
                        todos = searchTaskFilter(todos, value);
                        break;
                    default:
                        break;
                }

                todos.forEach( item => {
                    const {
                        id,
                        uuid,
                        title,
                        todoValue,
                        comment,
                        tagUrgent,
                        tagMain,
                        subtask,
                        complited,
                        important,
                        date,
                    } = item;

                    if ((getUID() === uuid)) {
                        const todoLi = document.createElement('li');
                        const todoLiError = document.createElement('p');
                        const todoValueLi = document.createElement('textarea');
                        const complitedTodo = document.createElement('span');
                        const todoTime = document.createElement('div');
                        const todoTimeTime = document.createElement('p');
                        const todoTimeDay = document.createElement('p');
                        const todoDelete = document.createElement('i');
                        const todoImportant = document.createElement('span');
                        const titleListTodo = document.createElement('p');
                        const todoMenu = document.createElement('i');
                        const todoSubtask = document.createElement('span');

                        todoLi.className = 'todoLi';
                        todoLiError.className = 'inputError';
                        todoLiError.id = 'todoLiError';
                        todoValueLi.className = 'todosValue';
                        todoTime.className = 'todos-time';
                        todoImportant.className = 'todo-important';
                        todoDelete.className = 'bx bxs-trash todos-deleteImg';
                        complitedTodo.className = 'todo-complited';
                        todoMenu.className = 'bx bx-notepad todoMenu';
                        todoSubtask.className = 'todoSubtask';
                        titleListTodo.className = 'titleListTodo';

                        todoDelete.setAttribute('title', 'Delete task');
                        todoImportant.setAttribute('title', 'Important task');
                        complitedTodo.setAttribute('title', 'Complited task');
                        todoMenu.setAttribute('title', 'Open task-menu');

                        todoValueLi.innerHTML = todoValue;
                        todoTimeTime.innerHTML = `${moment(date).format('LT')}`;
                        todoTimeDay.innerHTML = `${moment(date).format('DD/MM/YY')} `;
                        todoTime.append(todoTimeTime, todoTimeDay);
                        titleListTodo.innerText = `list: ${title}`;

                        if (todoValue.length > 150) {
                            todoValueLi.style.fontSize = '12px';
                            todoValueLi.style.height = '45px';
                        } else if (todoValue.length < 50) {
                            todoValueLi.style.height = '15px';
                        }

                        todoMenu.onclick = () => {
                            taskMenu.classList.remove('close');
                            taskMenuTitle.innerHTML = todoValue;
                            setTodo(item);
                            item.oldID ? setTask(item.oldID) : setTask(item.id);
                            todoMenuSidebar();
                        };

                        todoValueLi.oninput = () => {
                            checkLengthTodo(todoValueLi.value.trim()) ?
                            todoLiError.innerHTML = '' :
                            todoLiError.innerHTML = errorText.inputTodoErrorText;
                        }

                        todoValueLi.onkeyup = event => {
                            if (event.key === 'Enter') {
                                todoValueLi.value = todoValueLi.value.replace(/\n$/, '');

                                if ((todoValueLi.value !== item.todoValue) && checkLengthTodo(todoValueLi.value)) {
                                    item.date = moment().format();
                                    item.todoValue = todoValueLi.value;

                                    updateTodo( item )
                                        .then(() => getSearchTask());
                                } else {
                                    todoLiError.innerHTML = '';
                                    todoValueLi.value = item.todoValue;
                                }
                            }
                        }

                        todoValueLi.onblur = () => {
                            if ((todoValueLi.value !== item.todoValue) && checkLengthTodo(todoValueLi.value)) {
                                item.date = moment().format();
                                item.todoValue = todoValueLi.value;

                                updateTodo( item )
                                .then(() => getSearchTask());
                            } else {
                                todoLiError.innerHTML = '';
                                todoValueLi.value = item.todoValue;
                            }
                        }

                        todoDelete.onclick = async () => {
                            await createDeleteTodoList(item);
                            await deleteTodo(item)
                                .then(() => getSearchTask());

                            taskMenu.classList.add('close');
                        }

                        if (important) {
                            todoImportant.innerHTML = '&#10029;';
                            todoImportant.setAttribute('clicked', true);
                        } else {
                            todoImportant.innerHTML = '&#9734;';
                            todoImportant.removeAttribute('clicked');
                        }

                        todoImportant.onclick = () => {
                            let isClicked = todoImportant.getAttribute('clicked');

                            if (!isClicked) {
                                todoImportant.setAttribute('clicked', true);
                                todoImportant.innerHTML = '&#10029;';
                                item.important = true;
                                updateTodo( item );
                            } else {
                                todoImportant.removeAttribute('clicked');
                                todoImportant.innerHTML = '&#9734;';
                                item.important = false;
                                updateTodo( item );
                            }
                        }

                        if (complited) {
                            complitedTodo.innerHTML = '&#9746;';
                            complitedTodo.setAttribute('clicked', true);
                        } else {
                            complitedTodo.innerHTML = '&#x2610;';
                            complitedTodo.removeAttribute('clicked');
                        }

                        complitedTodo.onclick = () => {
                            let isClicked = complitedTodo.getAttribute('clicked');

                            if (!isClicked) {
                                complitedTodo.setAttribute('clicked', true);
                                complitedTodo.innerHTML = '&#9746;';
                                item.complited = true;
                                updateTodo( item );
                            } else {
                                complitedTodo.removeAttribute('clicked');
                                complitedTodo.innerHTML = '&#x2610;';
                                item.complited = false;
                                updateTodo( item );
                            }
                        }

                        if (comment) {
                            const todoInformationComment = document.createElement('i');
                            todoInformationComment.className = 'bx bx-message-rounded-check todoInformationComment';
                            todoInformationComment.setAttribute('title', 'Task has a comment');
                            todoLi.append(todoInformationComment);
                        }

                        if (tagUrgent) {
                            const tagNameUrgent = document.createElement('i');
                            tagNameUrgent.className = 'bx bxs-circle urgent';
                            tagNameUrgent.setAttribute('title', 'Task is urgent');
                            todoLi.append(tagNameUrgent);
                        }

                        if (tagMain) {
                            const tagNameMain = document.createElement('i');
                            tagNameMain.className = 'bx bxs-circle main';
                            tagNameMain.setAttribute('title', 'Task is main');
                            todoLi.append(tagNameMain);
                        }

                        if (subtask) {
                            let activeSubtask = 0;
                            getSubtask(item)
                                .then(subtasks => {
                                    subtasks.forEach( subTask => {
                                        if (!subTask.complited) {
                                            activeSubtask++;
                                        }
                                    })

                                    todoSubtask.innerText = `${activeSubtask} of ${subtasks.length} subTasks`;
                                    todoLi.append(todoSubtask);
                                })
                        }

                        todosContainer.prepend(todoLi);
                        todoLi.append(
                            complitedTodo,
                            todoValueLi,
                            todoTime,
                            todoDelete,
                            todoImportant,
                            todoMenu,
                            titleListTodo,
                            todoLiError
                        );
                    }
                });
            };
        });
}
