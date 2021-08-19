import moment from 'moment';
import { getDeleteTodolist, finalDeleteTodo, createRecoverTodo } from '../api/api-handlers';
import { getUID, setClickedPage } from '../shared/ls-service';
import { counterTasksRender } from './sidebar';

export const getDeletedTasks = () => {
    getDeleteTodolist()
        .then( todos => {
            const todosContainer = document.querySelector('.content__todo_todosMain');
            const taskMenu = document.querySelector('.content__todoMenu');
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

                    if (getUID() === uuid) {
                        const todoLi = document.createElement('li');
                        const todoLiError = document.createElement('p');
                        const todoValueLi = document.createElement('textarea');
                        const complitedTodo = document.createElement('span');
                        const todoTime = document.createElement('span');
                        const todoRecoverFromDeleted = document.createElement('i');
                        const todoDelete = document.createElement('i');
                        const todoImportant = document.createElement('span');

                        todoLi.className = 'todoLi';
                        todoLiError.className = 'inputError';
                        todoLiError.id = 'todoLiError';
                        todoValueLi.className = 'todosValue';
                        todoTime.className = 'todos-time';
                        todoImportant.className = 'todo-important';
                        todoDelete.className = 'bx bxs-trash todos-deleteImg';
                        complitedTodo.className = 'todo-complited';
                        todoRecoverFromDeleted.className = 'bx bx-reset todoRecover';

                        todoDelete.setAttribute('title', 'Delete task');
                        todoRecoverFromDeleted.setAttribute('title', 'Restore task');
                        complitedTodo.style.cursor = 'default';
                        todoImportant.style.cursor = 'default';

                        todoValueLi.innerHTML = item.todoValue;

                        todoValueLi.setAttribute('readonly', true);

                        if (todoValue.length > 150) {
                            todoValueLi.style.fontSize = '12px';
                            todoValueLi.style.height = '40px';
                        } else if (todoValue.length < 50) {
                            todoValueLi.style.height = '15px';
                        }

                        todoRecoverFromDeleted.onclick = async() => {
                            item.date = moment().format();
                            item.dateTime = moment().format('LTS');
                            item.dateDMY = moment().format('LL');
                            await createRecoverTodo(item);
                            await finalDeleteTodo(item)
                                .then(() => getDeletedTasks());
                        }

                        todoDelete.onclick = () => {
                            finalDeleteTodo(item)
                                .then(() => getDeletedTasks());
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

                        todosContainer.prepend(todoLi);
                        todoLi.append(
                            complitedTodo,
                            todoValueLi,
                            todoTime,
                            todoImportant,
                            todoRecoverFromDeleted,
                            todoDelete,
                            todoLiError
                        )
                    }
                })
            }
        })
}

export const deletedTasks_render = () => {
    const deletedTodos = document.querySelector('#nav-links_deletedTodos');
    const calendar = document.querySelector('.calendar__wrapper');
    const todoList = document.querySelector('.content__todo_todosMain');

    deletedTodos.addEventListener('click', event => {
        event.preventDefault();
        const title = document.querySelector('.content__todo_title');
        const inputTodos = document.querySelector('.content__todo_form');

        title.innerText = 'Deleted tasks';
        inputTodos.style.display = 'none';
        calendar.style.display = 'none';
        todoList.style.display = 'block';

        getDeletedTasks();
        setClickedPage('deletedTasks');
    })
}
