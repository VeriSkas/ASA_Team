import moment from "moment";

import { getGroups, updateGroup } from "../api/api-handlers";
import { errorText } from "../shared/constants/errorText";
import { tooltips } from "../shared/constants/textFile";
import { getGroupLS, getUID, setGroupLS } from "../shared/ls-service";
import { checkLengthTodo } from "../shared/validators";
import { sortTodoRender } from "./filtersClick";

export const createGroupTodos = () => {
    const todo_form = document.getElementById('content__todo_form');
    const formInput = document.getElementById('content__todo_form-input');
    const inputTodosError = document.querySelector('#inputTodosError');
    const todo = {
        todoValue: null,
        date: null,
        complited: false,
        important: false,
        uuid: null,
    };

    formInput.oninput = () => {
        checkLengthTodo(formInput.value.trim()) ?
        inputTodosError.innerHTML = '' :
        inputTodosError.innerHTML = errorText.inputTodoErrorText;
    }

    todo_form.addEventListener('submit', event => {
        event.preventDefault();
        const groupLS = getGroupLS();

        if (checkLengthTodo(formInput.value.trim())) {
            todo.todoValue = formInput.value;
            todo.date = moment().format();
            todo.uuid = getUID();
            groupLS.todosGroup ?
                groupLS.todosGroup.push(todo) :
                groupLS.todosGroup = [todo];

            updateGroup(groupLS)
                .then(() => setGroupLS(groupLS))
                .then(() => renderGroupTodos())
        }

        formInput.value = null;
    });
};

export const renderGroupTodos = async () => {
    return getGroups()
        .then( groups => {
            const todosContainer = document.querySelector('.content__todo_todosMain');
            todosContainer.innerHTML = null;
            if (groups) {
                const groupLS = getGroupLS();

                groups.forEach( group => {
                    if(groupLS.id === group.id) {
                        if (group.todosGroup) {

                            group.todosGroup = sortTodoRender(group.todosGroup);

                            group.todosGroup.forEach(( todo, ind ) => {
                                const { todoValue, date, important, complited, uuid } = todo;

                                const todoLi = document.createElement('li');
                                const todoLiError = document.createElement('p');
                                const todoValueLi = document.createElement('textarea');
                                const complitedTodo = document.createElement('span');
                                const todoTime = document.createElement('div');
                                const todoTimeTime = document.createElement('p');
                                const todoTimeDay = document.createElement('p');
                                const todoDelete = document.createElement('i');
                                const todoImportant = document.createElement('span');
                                const userAuthor = document.createElement('span');
                                const userNameAuthor = group.participant
                                    .filter(user => user.uuid === uuid)[0].loginName;

                                todoLi.className = 'todoLi';
                                todoLiError.className = 'inputError';
                                todoLiError.id = 'todoLiError';
                                todoValueLi.className = 'todosValue';
                                todoTime.className = 'todos-time';
                                todoImportant.className = 'todo-important';
                                todoDelete.className = 'bx bxs-trash todos-deleteImg';
                                complitedTodo.className = 'todo-complited';
                                userAuthor.className = 'todo-author';

                                todoDelete.setAttribute('title', tooltips.deleteTask);
                                todoImportant.setAttribute('title', tooltips.importantTask);
                                complitedTodo.setAttribute('title', tooltips.complitedTask);

                                todoValueLi.innerHTML = todoValue;
                                todoTimeTime.innerHTML = `${moment(date).format('LT')}`;
                                todoTimeDay.innerHTML = `${moment(date).format('DD/MM/YY')} `;
                                userAuthor.innerHTML = ` Author: ${userNameAuthor}`;
                                todoTime.append(todoTimeTime, todoTimeDay);

                                if (todoValue.length > 150) {
                                    todoValueLi.style.fontSize = '12px';
                                    todoValueLi.style.height = '45px';
                                } else if (todoValue.length < 50) {
                                    todoValueLi.style.height = '15px';
                                }

                                getUID() === uuid ?
                                    todoLi.style.background = '#cfbaf7' :
                                    todoLi.append(userAuthor);

                                todoValueLi.oninput = () => {
                                    checkLengthTodo(todoValueLi.value.trim()) ?
                                        todoLiError.innerHTML = '' :
                                        todoLiError.innerHTML = errorText.inputTodoErrorText;
                                }

                                todoValueLi.onkeyup = event => {
                                    if (event.key === 'Enter') {
                                        todoValueLi.value = todoValueLi.value.replace(/\n$/, '');

                                        if ((todoValueLi.value !== todoValue) && checkLengthTodo(todoValueLi.value)) {
                                            todo.date = moment().format();
                                            todo.todoValue = todoValueLi.value;

                                            updateGroup(group)
                                                .then(() => setGroupLS(group))
                                                .then(() => renderGroupTodos())
                                        } else {
                                            todoLiError.innerHTML = '';
                                            todoValueLi.value = todo.todoValue;
                                        }
                                    }
                                }

                                todoValueLi.onblur = () => {
                                    if ((todoValueLi.value !== todoValue) && checkLengthTodo(todoValueLi.value)) {
                                        todo.date = moment().format();
                                        todo.todoValue = todoValueLi.value;

                                        updateGroup(group)
                                            .then(() => setGroupLS(group))
                                            .then(() => renderGroupTodos())
                                    } else {
                                        todoLiError.innerHTML = '';
                                        todoValueLi.value = todo.todoValue;
                                    }
                                }

                                todoDelete.onclick = () => {
                                    const deleteQuestion = confirm(`Delete todo: ' ${todoValue} '?`);
                                    if (deleteQuestion) {
                                        group.todosGroup.splice(ind, 1);

                                        updateGroup(group)
                                            .then(() => setGroupLS(group))
                                            .then(() => renderGroupTodos())
                                    }
                                }

                                if (important) {
                                    todoImportant.innerHTML = '&#10029;';
                                    todoImportant.setAttribute('clicked', true);
                                    todoValueLi.style.color = 'red';
                                } else {
                                    todoImportant.innerHTML = '&#9734;';
                                    todoImportant.removeAttribute('clicked');
                                }

                                todoImportant.onclick = () => {
                                    let isClicked = todoImportant.getAttribute('clicked');

                                    if (!isClicked) {
                                        todoImportant.setAttribute('clicked', true);
                                        todoImportant.innerHTML = '&#10029;';
                                        todoValueLi.style.color = 'red';
                                        todo.important = true;
                                        updateGroup(group)
                                            .then(() => setGroupLS(group))
                                            .then(() => renderGroupTodos())
                                    } else {
                                        todoImportant.removeAttribute('clicked');
                                        todoImportant.innerHTML = '&#9734;';
                                        todo.important = false;
                                        updateGroup(group)
                                            .then(() => setGroupLS(group))
                                            .then(() => renderGroupTodos())
                                    }
                                }

                                if (complited) {
                                    complitedTodo.innerHTML = '&#9746;';
                                    complitedTodo.setAttribute('clicked', true);
                                    todoValueLi.style.textDecoration = 'line-through';
                                    todoLi.style.opacity = '0.5';
                                } else {
                                    complitedTodo.innerHTML = '&#x2610;';
                                    complitedTodo.removeAttribute('clicked');
                                }

                                complitedTodo.onclick = () => {
                                    let isClicked = complitedTodo.getAttribute('clicked');

                                    if (!isClicked) {
                                        complitedTodo.setAttribute('clicked', true);
                                        complitedTodo.innerHTML = '&#9746;';
                                        todoValueLi.style.textDecoration = 'line-through';
                                        todoLi.style.opacity = '0.5';
                                        todo.complited = true;
                                    } else {
                                        complitedTodo.removeAttribute('clicked');
                                        complitedTodo.innerHTML = '&#x2610;';
                                        todo.complited = false;
                                    }

                                    updateGroup(group)
                                        .then(() => setGroupLS(group))
                                        .then(() => renderGroupTodos())
                                }

                                todosContainer.prepend(todoLi);
                                todoLi.append(
                                    complitedTodo,
                                    todoValueLi,
                                    todoTime,
                                    todoDelete,
                                    todoImportant,
                                    todoLiError,
                                );
                            })
                        }
                    }
                })
            }
        })
};
