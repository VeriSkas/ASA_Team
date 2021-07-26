import moment from 'moment';
import { createTodo, getTodos } from '../api/api-handlers';
import { checkLengthTodo } from '../shared/validators';
import { errorText } from '../shared/constants/errorText';

export const createList = () => {
    const todosContainer = document.querySelector('.content__todo_todosMain');
    const titlePage = document.querySelector('.content__todo_title');
    const todo_form = document.getElementById('content__todo_form');
    const formInput = document.getElementById('content__todo_form-input');
    const inputTodosError = document.querySelector('#inputTodosError');
    const createListBtn = document.querySelector('.createListBtn');
    const createListInput = document.querySelector('.wrapper__content_sidebar-navLinks-link-inputList-input');
    const listsUl = document.querySelector('.lists');
    const listLi = document.createElement('li');
    const listA = document.createElement('a');
    const todo = {
        title: null,
        todoValue: null,
        date: null,
        dateTime: null,
        dateDMY: null,
        complited: false,
        important: false,
    };

    createListBtn.onclick = () => {
        todosContainer.innerHTML = null;
        listA.innerHTML = createListInput.value;
        titlePage.innerHTML = createListInput.value;
        todo.title = createListInput.value;

        listsUl.append(listLi);
        listLi.append(listA);
        createListInput.value = null;
    }

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
                .then( () => renderListTodo(todo.title));
        }

        formInput.value = null;
    });
}

export const renderListTodo = title => {
    getTodos(title)
        .then( todos => {
            const todosContainer = document.querySelector('.content__todo_todosMain');
            todosContainer.innerHTML = null;

            if(todos) {
                todos.forEach( item => {
                    const { title, id, complited, important, date, dateDMY, dateTime, todoValue } = item;

                    if (!complited) {
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

                                updateTodo( title, id, complited, important, todoValueLi.value, date, dateDMY, dateTime )
                                    .then(() => renderTodos());
                            } else {
                                todoLiError.innerHTML = '';
                                todoValueLi.value = item.todoValue;
                            }
                        }

                        todoDelete.onclick = async () => {
                            await createDeleteTodoList(item);
                            await deleteTodo(item)
                                .then(() => renderListTodo(todo.title))
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
                                updateTodo( title, id, complited, true, todoValue, date, dateDMY, dateTime );
                            } else {
                                todoImportant.removeAttribute('clicked');
                                todoImportant.innerHTML = '&#9734;';
                                updateTodo( title, id, complited, false, todoValue, date, dateDMY, dateTime );
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
                                updateTodo( title, id, true, important, todoValue, date, dateDMY, dateTime )
                                    .then(() => renderTodos());
                            } else {
                                complitedTodo.removeAttribute('clicked');
                                complitedTodo.innerHTML = '&#x2610;';
                                updateTodo( title, id, false, important, todoValue, date, dateDMY, dateTime );
                            }
                        }

                        todosContainer.append(todoLi);
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
