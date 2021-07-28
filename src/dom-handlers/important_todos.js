import { getAllTodos, deleteTodo, updateTodo, createDeleteTodoList } from '../api/api-handlers';

export const getImportantTasks = () => {
    getAllTodos()
        .then( todos => {
            const todosContainer = document.querySelector('.content__todo_todosMain');
            todosContainer.innerHTML = null;

            if(todos) {
                todos.forEach( list => {
                    list.forEach(item => {
                        const { title, id, complited, important, date, dateDMY, dateTime, todoValue } = item;

                        if (item.important && !item.complited) {
                            const todoLi = document.createElement('li');
                            const todoLiError = document.createElement('p');
                            const todoValueLi = document.createElement('textarea');
                            const complitedTodo = document.createElement('span');
                            const todoTime = document.createElement('span');
                            const todoDelete = document.createElement('div');
                            const todoImportant = document.createElement('span');
                            const titleListTodo = document.createElement('p');

                            todoLi.className = 'todoLi';
                            todoLiError.className = 'inputError';
                            titleListTodo.className = 'titleListTodo';
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
                            titleListTodo.innerText = `list: ${item.title}`;

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
                                        .then(() => getImportantTasks());
                                } else {
                                    todoLiError.innerHTML = '';
                                    todoValueLi.value = item.todoValue;
                                }
                            }

                            todoDelete.onclick = async () => {
                                await createDeleteTodoList(item)
                                await deleteTodo(item)
                                    .then(() => getImportantTasks())
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
                                    updateTodo( title, id, complited, false, todoValue, date, dateDMY, dateTime )
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
                                    updateTodo( title, id, true, important, todoValue, date, dateDMY, dateTime )
                                        .then(() => getImportantTasks());
                                } else {
                                    complitedTodo.removeAttribute('clicked');
                                    complitedTodo.innerHTML = '&#x2610;';
                                    updateTodo( title, id, false, important, todoValue, date, dateDMY, dateTime );
                                }
                            }

                            todosContainer.append(todoLi);
                            todosContainer.append(todoLiError);
                            todoLi.prepend(complitedTodo);
                            todoLi.append(todoValueLi);
                            todoLi.append(todoTime);
                            todoLi.append(todoDelete);
                            todoLi.append(todoImportant);
                            todoLi.append(titleListTodo);
                        }
                    });
                })
            }
        })
}

export const importantTasks_render = () => {
    const importantTodos = document.querySelector('#nav-links_importantTodos');

    importantTodos.addEventListener('click', event => {
        event.preventDefault();
        const title = document.querySelector('.content__todo_title');
        const inputTodos = document.querySelector('.content__todo_form');

        title.innerText = 'Important tasks';
        inputTodos.style.display = 'none';

        getImportantTasks();
    })
}
