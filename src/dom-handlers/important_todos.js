import moment from 'moment';

import { getTodos, deleteTodo, updateTodo, createDeleteTodoList, getSubtask } from '../api/api-handlers';
import { innerTextTitle, tooltips } from '../shared/constants/textFile';
import { getUID, setTodo, setTask, setClickedPage } from '../shared/ls-service';
import { pageNameInLS } from '../shared/textInLS';
import { sortTodoRender } from './filtersClick';
import { onloadPage } from './onloadPage';
import { counterTasksRender } from './sidebar';
import { todoMenuSidebar } from './todoMenu.js';

export const getImportantTasks = () => {
    return getTodos()
        .then( todos => {
            const todosContainer = document.querySelector('.content__todo_todosMain');
            const taskMenu = document.querySelector('.content__todoMenu');
            const taskMenuTitle = document.querySelector('.content__todoMenu_subtask_title');
            todosContainer.innerHTML = null;

            counterTasksRender();

            if(todos) {
                todos = sortTodoRender(todos);

                todos.forEach(item => {
                    const {
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

                    if ((getUID() === uuid) && item.important && !item.complited) {
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
                        titleListTodo.className = 'titleListTodo';
                        todoLiError.id = 'todoLiError';
                        todoValueLi.className = 'todosValue';
                        todoTime.className = 'todos-time';
                        todoImportant.className = 'todo-important';
                        todoDelete.className = 'bx bxs-trash todos-deleteImg';
                        complitedTodo.className = 'todo-complited';
                        todoMenu.className = 'bx bx-notepad todoMenu';
                        todoSubtask.className = 'todoSubtask';

                        todoDelete.setAttribute('title', tooltips.deleteTask);
                        todoImportant.setAttribute('title', tooltips.importantTask);
                        complitedTodo.setAttribute('title', tooltips.complitedTask);
                        todoMenu.setAttribute('title', tooltips.taskMenu);

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
                                        .then(() => getImportantTasks());
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
                                    .then(() => getImportantTasks());
                            } else {
                                todoLiError.innerHTML = '';
                                todoValueLi.value = item.todoValue;
                            }
                        }

                        todoDelete.onclick = async () => {
                            await createDeleteTodoList(item)
                            await deleteTodo(item)
                                .then(() => getImportantTasks());

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
                                updateTodo( item )
                                    .then(() => getImportantTasks());
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
                                    .then(() => getImportantTasks());
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
                            todoInformationComment.setAttribute('title', tooltips.comment);
                            todoLi.append(todoInformationComment);
                        }

                        if (tagUrgent) {
                            const tagNameUrgent = document.createElement('i');
                            tagNameUrgent.className = 'bx bxs-circle urgent';
                            tagNameUrgent.setAttribute('title', tooltips.tagUrgent);
                            todoLi.append(tagNameUrgent);
                        }

                        if (tagMain) {
                            const tagNameMain = document.createElement('i');
                            tagNameMain.className = 'bx bxs-circle main';
                            tagNameMain.setAttribute('title', tooltips.tagMain);
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
                })
            }
        })
}

export const importantTasks_render = () => {
    const importantTodos = document.querySelector('#nav-links_importantTodos');
    const calendar = document.querySelector('.calendar__wrapper');

    importantTodos.onclick = () => {
        const title = document.querySelector('.content__todo_title');
        const inputTodos = document.querySelector('.content__todo_form');
        const todoList = document.querySelector('.content__todo_todosMain');

        title.innerText = innerTextTitle.importantTasks;
        inputTodos.style.display = 'none';
        calendar.style.display = 'none';
        todoList.style.display = 'block';

        getImportantTasks();
        setClickedPage(pageNameInLS.importantTasks);
        onloadPage();
    }
}
