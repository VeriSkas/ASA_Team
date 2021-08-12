import moment from 'moment';
import { getTodos, createTodo, deleteTodo, updateTodo, createDeleteTodoList } from '../api/api-handlers';
import { checkLengthTodo } from '../shared/validators';
import { errorText } from '../shared/constants/errorText';
import { getTitleLS, getUID, setTodo, setTask } from '../shared/ls-service';
import { todoMenuSidebar } from './todoMenu.js';
import { counterTasksRender } from './sidebar';

export const renderTodos = async () => {
    const titleLS = getTitleLS();
    return getTodos()
        .then( todos => {
            const todosContainer = document.querySelector('.content__todo_todosMain');
            const taskMenu = document.querySelector('.content__todoMenu');
            const taskMenuTitle = document.querySelector('.content__todoMenu_subtask_title');
            taskMenu.classList.add('close');
            todosContainer.innerHTML = null;
            counterTasksRender();

            if(todos) {
                todos.forEach( item => {
                    const {
                        id,
                        uuid,
                        title,
                        todoValue,
                        comment,
                        complited,
                        important,
                        date,
                        dateDMY,
                        dateTime
                    } = item;

                    if ((getUID() === uuid) && (title === titleLS) && !complited ) {
                        const todoLi = document.createElement('li');
                        const todoLiError = document.createElement('p');
                        const todoValueLi = document.createElement('textarea');
                        const complitedTodo = document.createElement('span');
                        const todoTime = document.createElement('span');
                        const todoDelete = document.createElement('i');
                        const todoImportant = document.createElement('span');
                        const todoMenu = document.createElement('i');

                        todoLi.className = 'todoLi';
                        todoLiError.className = 'inputError';
                        todoLiError.id = 'todoLiError';
                        todoValueLi.className = 'todosValue';
                        todoTime.className = 'todos-time';
                        todoImportant.className = 'todo-important';
                        todoDelete.className = 'bx bxs-trash todos-deleteImg';
                        complitedTodo.className = 'todo-complited';
                        todoMenu.className = 'bx bx-notepad todoMenu';

                        todoDelete.setAttribute('title', 'Delete task');
                        todoImportant.setAttribute('title', 'Important task');
                        complitedTodo.setAttribute('title', 'Complited task');
                        todoMenu.setAttribute('title', 'Open task-menu');

                        todoValueLi.innerHTML = todoValue;
                        todoTime.innerHTML = dateTime;

                        todoMenu.onclick = () => {
                            taskMenu.classList.remove('close');
                            taskMenuTitle.innerHTML = todoValue;
                            setTodo(item);
                            item.oldID ? setTask(item.oldID) : setTask(item.id);
                            todoMenuSidebar();
                        };

                        todoValueLi.oninput = () => {
                            checkLengthTodo(todoValueLi.value) ?
                            todoLiError.innerHTML = '' :
                            todoLiError.innerHTML = errorText.inputTodoErrorText;
                        }

                        todoValueLi.onkeyup = event => {
                            if (event.key === 'Enter') {
                                if ((todoValueLi.value !== item.todoValue) && checkLengthTodo(todoValueLi.value)) {
                                    item.date = moment().format();
                                    item.dateTime = moment().format('LTS');
                                    item.dateDMY = moment().format('LL');
                                    item.todoValue = todoValueLi.value;

                                    updateTodo( item )
                                        .then(() => renderTodos());
                                } else {
                                    todoLiError.innerHTML = '';
                                    todoValueLi.value = item.todoValue;
                                }
                            }
                        }

                        todoValueLi.onblur = () => {
                            if ((todoValueLi.value !== item.todoValue) && checkLengthTodo(todoValueLi.value)) {
                                item.date = moment().format();
                                item.dateTime = moment().format('LTS');
                                item.dateDMY = moment().format('LL');
                                item.todoValue = todoValueLi.value;

                                updateTodo( item )
                                    .then(() => renderTodos());
                            } else {
                                todoLiError.innerHTML = '';
                                todoValueLi.value = item.todoValue;
                            }
                        }

                        todoDelete.onclick = async () => {
                            await createDeleteTodoList(item);
                            await deleteTodo(item)
                                .then(() => renderTodos());

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
                                updateTodo( item )
                                .then(() => counterTasksRender());
                            } else {
                                todoImportant.removeAttribute('clicked');
                                todoImportant.innerHTML = '&#9734;';
                                item.important = false;
                                updateTodo( item )
                                .then(() => counterTasksRender());
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
                                updateTodo( item )
                                    .then(() => renderTodos());
                            } else {
                                complitedTodo.removeAttribute('clicked');
                                complitedTodo.innerHTML = '&#x2610;';
                                item.complited = false;
                                updateTodo( item )
                                    .then(() => counterTasksRender());
                            }
                        }

                        if (comment) {
                            const todoInformationComment = document.createElement('i');
                            todoInformationComment.className = 'bx bx-message-rounded-check todoInformationComment';
                            todoLi.append(todoInformationComment);
                        }

                        todosContainer.prepend(todoLi);
                        todoLi.append(
                            complitedTodo,
                            todoValueLi,
                            todoTime,
                            todoDelete,
                            todoImportant,
                            todoMenu,
                            todoLiError
                        );
                    }
                });
            };
        });
};

export const todoHandler = () => {
    const todo_form = document.getElementById('content__todo_form');
    const formInput = document.getElementById('content__todo_form-input');
    const inputTodosError = document.querySelector('#inputTodosError');
    const todo = {
        title: null,
        todoValue: null,
        comment: null,
        dateOfComment: null,
        date: null,
        dateTime: null,
        dateDMY: null,
        complited: false,
        important: false,
        uuid: null,
    };

    formInput.oninput = () => {
        checkLengthTodo(formInput.value) ?
            inputTodosError.innerHTML = '' :
            inputTodosError.innerHTML = errorText.inputTodoErrorText;
    }

    todo_form.addEventListener('submit', event => {
        event.preventDefault();

        if (checkLengthTodo(formInput.value)) {
            todo.title = getTitleLS()
            todo.todoValue = formInput.value;
            todo.date = moment().format();
            todo.dateTime = moment().format('LTS');
            todo.dateDMY = moment().format('LL');
            todo.uuid = getUID();

            createTodo(todo)
                .then( () => renderTodos());
        }

        formInput.value = null;
    });
};
