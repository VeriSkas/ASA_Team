import moment from 'moment';

import { getTodos, deleteTodo, updateTodo, createDeleteTodoList } from '../api/api-handlers';
import { innerTextTitle, tooltips } from '../shared/constants/textFile';
import { getUID, setClickedPage } from '../shared/ls-service';
import { pageNameInLS } from '../shared/textInLS';
import { checkLengthTodo } from '../shared/validators';
import { sortTodoRender } from './filtersClick';
import { onloadPage } from './onloadPage';
import { counterTasksRender } from './sidebar';

export const getCompletedTasks = () => {
    return getTodos()
        .then( todos => {
            const todosContainer = document.querySelector('.content__todo_todosMain');
            todosContainer.innerHTML = null;

            counterTasksRender();

            if(todos) {
                todos = sortTodoRender(todos);

                todos.forEach( item => {
                    const {
                        uuid,
                        todoValue,
                        complited,
                        important,
                        date,
                    } = item;

                    if ((getUID() === uuid) && item.complited) {
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

                        todoLi.className = 'todoLi';
                        todoLiError.className = 'inputError';
                        titleListTodo.className = 'titleListTodo';
                        todoLiError.id = 'todoLiError';
                        todoValueLi.className = 'todosValue';
                        todoTime.className = 'todos-time';
                        todoImportant.className = 'todo-important';
                        todoDelete.className = 'bx bxs-trash todos-deleteImg';
                        complitedTodo.className = 'todo-complited';

                        todoDelete.setAttribute('title', tooltips.deleteTask);
                        todoImportant.setAttribute('title', tooltips.importantTask);
                        complitedTodo.setAttribute('title', tooltips.complitedTask);

                        todoValueLi.innerHTML = item.todoValue;
                        todoTimeTime.innerHTML = `${moment(date).format('LT')}`;
                        todoTimeDay.innerHTML = `${moment(date).format('DD/MM/YY')} `;
                        todoTime.append(todoTimeTime, todoTimeDay);
                        titleListTodo.innerText = `list: ${item.title}`;

                        if (todoValue.length > 150) {
                            todoValueLi.style.fontSize = '12px';
                            todoValueLi.style.height = '45px';
                        } else if (todoValue.length < 50) {
                            todoValueLi.style.height = '15px';
                        }

                        todoValueLi.oninput = () => {
                            checkLengthTodo(todoValueLi.value.trim()) ?
                            todoLiError.innerHTML = '' :
                            todoLiError.innerHTML = errorText.inputTodoErrorText;
                        }

                        todoValueLi.onblur = () => {
                            if ((todoValueLi.value !== item.todoValue) && checkLengthTodo(todoValueLi.value)) {
                                item.date = moment().format();
                                item.todoValue = todoValueLi.value;

                                updateTodo( item )
                                    .then(() => getCompletedTasks());
                            } else {
                                todoLiError.innerHTML = '';
                                todoValueLi.value = item.todoValue;
                            }
                        }

                        todoDelete.onclick = async () => {
                            await createDeleteTodoList(item)
                            await deleteTodo(item)
                                .then(() => getCompletedTasks());
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
                                updateTodo( item )
                                    .then(() => getCompletedTasks());
                            }
                        }

                        todosContainer.prepend(todoLi);
                        todoLi.append(
                            complitedTodo,
                            todoValueLi,
                            todoTime,
                            todoDelete,
                            todoImportant,
                            titleListTodo,
                            todoLiError
                        )
                    }
                })
            }
        })
}

export const completedTasks_render = () => {
    const completedTodos = document.querySelector('#nav-links_completedTodos');
    const calendar = document.querySelector('.calendar__wrapper');
    const todoList = document.querySelector('.content__todo_todosMain');

    completedTodos.onclick = () => {
        const title = document.querySelector('.content__todo_title');
        const inputTodos = document.querySelector('.content__todo_form');

        title.innerText = innerTextTitle.complitedTasks;
        calendar.style.display = 'none';
        inputTodos.style.display = 'none';
        todoList.style.display = 'block';

        getCompletedTasks();
        setClickedPage(pageNameInLS.complitedTasks);
        onloadPage()
    }
}
