import moment from 'moment';
import { getTodos, createTodo, deleteTodo, updateTodo } from '../api/api-handlers';
import { checkLengthTodo } from '../shared/validators';
import { errorText } from '../shared/constants/errorText';

export const renderTodos = () => {
    getTodos()
        .then( todos => {
            const todosContainer = document.querySelector('.content__todo_todosMain');
            todosContainer.innerHTML = null;

            if(todos) {
                todos.forEach( item => {
                    const { id, complited, important, date, dateDMY, dateTime, todoValue } = item;

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

                    todoValueLi.innerHTML = item.todoValue;
                    todoTime.innerHTML = item.dateTime;

                    if (item.todoValue.length > 50) {
                        todoValueLi.style.fontSize = '12px';
                    }

                    todoValueLi.oninput = () => {
                        checkLengthTodo(todoValueLi.value) ?
                        todoLiError.innerHTML = '' :
                        todoLiError.innerHTML = errorText.inputTodoErrorText;
                    }

                    todoValueLi.onblur = () => {
                        if ((todoValueLi.value !== item.todoValue) && checkLengthTodo(todoValueLi.value)) {
                            const date = moment().format();
                            const dateTime = moment().format('LTS');
                            const dateDMY = moment().format('LL');

                            updateTodo( id, complited, important, todoValueLi.value, date, dateDMY, dateTime )
                                .then(() => renderTodos());
                        } else {
                            todoLiError.innerHTML = '';
                            todoValueLi.value = item.todoValue;
                        }
                    }

                    todoDelete.onclick = () => {
                        deleteTodo(item)
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
                            updateTodo( id, complited, true, todoValue, date, dateDMY, dateTime );
                        } else {
                            todoImportant.removeAttribute('clicked');
                            todoImportant.innerHTML = '&#9734;';
                            updateTodo( id, complited, false, todoValue, date, dateDMY, dateTime );
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
                            updateTodo( id, true, important, todoValue, date, dateDMY, dateTime );
                        } else {
                            complitedTodo.removeAttribute('clicked');
                            complitedTodo.innerHTML = '&#x2610;';
                            updateTodo( id, false, important, todoValue, date, dateDMY, dateTime );
                        }
                    }

                    todosContainer.append(todoLi);
                    todosContainer.append(todoLiError);
                    todoLi.prepend(complitedTodo);
                    todoLi.append(todoValueLi);
                    todoLi.append(todoTime);
                    todoLi.append(todoDelete);
                    todoLi.append(todoImportant);
                });
            };
        });
};

export const todoHandler = () => {
    const todo_form = document.getElementById('content__todo_form');
    const formInput = document.getElementById('content__todo_form-input');
    const inputTodosError = document.querySelector('#inputTodosError');
    const todo = {
        todoValue: null,
        date: null,
        dateTime: null,
        dateDMY: null,
        complited: false,
        important: false,
    };

    formInput.oninput = () => {
        checkLengthTodo(formInput.value) ?
            inputTodosError.innerHTML = '' :
            inputTodosError.innerHTML = errorText.inputTodoErrorText;
    }

    todo_form.addEventListener('submit', event => {
        event.preventDefault();

        if (checkLengthTodo(formInput.value)) {
            todo.todoValue = formInput.value;
            todo.date = moment().format();
            todo.dateTime = moment().format('LTS');
            todo.dateDMY = moment().format('LL');

            createTodo(todo)
                .then( () => renderTodos());
        }

        formInput.value = null;
    });
};
