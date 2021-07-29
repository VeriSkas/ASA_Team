import moment from 'moment';
import { getTodos, createTodo, deleteTodo, updateTodo, createDeleteTodoList } from '../api/api-handlers';
import { checkLengthTodo } from '../shared/validators';
import { errorText } from '../shared/constants/errorText';
import { getTitleLS, getUID } from '../shared/ls-service';

export const renderTodos = () => {
    getTodos(getTitleLS())
        .then( todos => {
            const todosContainer = document.querySelector('.content__todo_todosMain');
            todosContainer.innerHTML = null;

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

                    if ((getUID() === uuid) && !complited) {
                        const todoLi = document.createElement('li');
                        const todoLiError = document.createElement('p');
                        const todoValueLi = document.createElement('textarea');
                        const complitedTodo = document.createElement('span');
                        const todoTime = document.createElement('span');
                        const todoDelete = document.createElement('div');
                        const todoImportant = document.createElement('span');

                        todoLi.className = 'todoLi';
                        todoLiError.className = 'inputError';
                        todoLiError.id = 'todoLiError';
                        todoValueLi.className = 'todosValue';
                        todoTime.className = 'todos-time';
                        todoImportant.className = 'todo-important';
                        todoDelete.className = 'todos-deleteImg';
                        complitedTodo.className = 'todo-complited';

                        todoDelete.setAttribute('title', 'Delete task');
                        todoImportant.setAttribute('title', 'Important task');
                        complitedTodo.setAttribute('title', 'Complited task');

                        todoValueLi.innerHTML = item.todoValue;
                        todoTime.innerHTML = item.dateTime;

                        todoValueLi.oninput = () => {
                            checkLengthTodo(todoValueLi.value) ?
                            todoLiError.innerHTML = '' :
                            todoLiError.innerHTML = errorText.inputTodoErrorText;
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
                                .then(() => renderTodos())
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
                                updateTodo( item )
                                    .then(() => renderTodos());
                            } else {
                                complitedTodo.removeAttribute('clicked');
                                complitedTodo.innerHTML = '&#x2610;';
                                item.complited = false;
                                updateTodo( item );
                            }
                        }

                        todosContainer.prepend(todoLi);
                        todoLi.append(todoLiError);
                        todoLi.prepend(complitedTodo);
                        todoLi.append(todoValueLi);
                        todoLi.append(todoTime);
                        todoLi.append(todoDelete);
                        todoLi.append(todoImportant);
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
