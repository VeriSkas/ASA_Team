import { getTodos, deleteTodo, updateTodo, createDeleteTodoList } from '../api/api-handlers';
import { getUID } from '../shared/ls-service';
import { counterTasksRender } from './sidebar';

export const getCompletedTasks = () => {
    getTodos()
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

                    if ((getUID() === uuid) && item.complited) {
                        const todoLi = document.createElement('li');
                        const todoLiError = document.createElement('p');
                        const todoValueLi = document.createElement('textarea');
                        const complitedTodo = document.createElement('span');
                        const todoTime = document.createElement('span');
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

                        todoDelete.setAttribute('title', 'Delete task');
                        todoImportant.setAttribute('title', 'Important task');
                        complitedTodo.setAttribute('title', 'Complited task');

                        todoValueLi.innerHTML = item.todoValue;
                        todoTime.innerHTML = item.dateTime;
                        titleListTodo.innerText = `list: ${item.title}`;

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

                        // ПУСТЬ ПОКА ПОВИСИТ
                        // todoImportant.onclick = () => {
                        //     let isClicked = todoImportant.getAttribute('clicked');

                        //     if (!isClicked) {
                        //         todoImportant.setAttribute('clicked', true);
                        //         todoImportant.innerHTML = '&#10029;';
                        //         item.important = true;
                        //         updateTodo( item );
                        //     } else {
                        //         todoImportant.removeAttribute('clicked');
                        //         todoImportant.innerHTML = '&#9734;';
                        //         item.important = false;
                        //         updateTodo( item );
                        //     }
                        // }

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

    completedTodos.addEventListener('click', event => {
        event.preventDefault();
        const title = document.querySelector('.content__todo_title');
        const inputTodos = document.querySelector('.content__todo_form');

        title.innerText = 'Completed tasks';
        inputTodos.style.display = 'none';

        getCompletedTasks();
    })
}
