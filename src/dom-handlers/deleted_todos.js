import moment from 'moment';

import { createTodo, getDeleteTodolist, finalDeleteTodo } from '../api/api-handlers';

export const getDeletedTasks = () => {
    getDeleteTodolist()
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
                    const todoRecoverFromDeleted = document.createElement('span');
                    const todoDelete = document.createElement('div');
                    const todoImportant = document.createElement('span');

                    todoLi.className = 'todoLi';
                    todoLiError.className = 'inputError';
                    todoLiError.id = 'todoLiError';
                    todoValueLi.className = 'todosValue';
                    todoRecoverFromDeleted.className = 'todos-time';
                    todoImportant.className = 'todo-important';
                    todoDelete.className = 'todos-deleteImg';
                    complitedTodo.className = 'todo-complited';

                    todoValueLi.innerHTML = item.todoValue;
                    todoRecoverFromDeleted.innerHTML = '<i class="bx bx-reset"></i>';

                    todoValueLi.setAttribute('readonly', true);

                    todoRecoverFromDeleted.onclick = async() => {
                        item.date = moment().format();
                        item.dateTime = moment().format('LTS');
                        item.dateDMY = moment().format('LL');
                        await createTodo(item);
                        await finalDeleteTodo(item)
                            .then(() => getDeletedTasks())
                    }

                    todoDelete.onclick = () => {
                        finalDeleteTodo(item)
                            .then(() => getDeletedTasks())
                    }

                    if (important) {
                        todoImportant.innerHTML = '&#10029;';
                        todoImportant.setAttribute('clicked', true);
                    } else {
                        todoImportant.innerHTML = '&#9734;';
                        todoImportant.removeAttribute('clicked');
                    }

                    if (complited) {
                        complitedTodo.innerHTML = '&#9746;';
                        complitedTodo.setAttribute('clicked', true);
                    } else {
                        complitedTodo.innerHTML = '&#x2610;';
                        complitedTodo.removeAttribute('clicked');
                    }

                    todosContainer.append(todoLi);
                    todosContainer.append(todoLiError);
                    todoLi.prepend(complitedTodo);
                    todoLi.append(todoValueLi);
                    todoLi.append(todoRecoverFromDeleted);
                    todoLi.append(todoDelete);
                    todoLi.append(todoImportant);
                })
            }
        })
}

export const deletedTasks_render = () => {
    const deletedTodos = document.querySelector('.nav-links_deletedTodos');

    deletedTodos.addEventListener('click', event => {
        event.preventDefault();
        const title = document.querySelector('.content__todo_title');
        const inputTodos = document.querySelector('.content__todo_form');

        title.innerText = 'Deleted tasks';
        inputTodos.style.display = 'none';

        getDeletedTasks();
    })
}
