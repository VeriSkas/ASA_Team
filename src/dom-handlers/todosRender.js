import moment from 'moment';
import { getTodos, createTodo, deleteTodo } from '../api/api-handlers';

export const renderTodos = () => {
    getTodos()
        .then( todos => {
            const todosContainer = document.querySelector('.content__todo_todosMain');
            todosContainer.innerHTML = null;
            if(todos) {
                todos.forEach( item => {
                    const todoValue = document.createElement('li');
                    const complitedTodo =document.createElement('span');
                    const todoTime = document.createElement('span');
                    const todoDelete = document.createElement('div');
                    const todoImportant = document.createElement('span');

                    todoValue.className = 'todosValue';
                    todoTime.className = 'todos-time';
                    todoImportant.className = 'todo-important';
                    todoDelete.className = 'todos-deleteImg';
                    complitedTodo.className = 'todo-complited';

                    todoValue.innerHTML = item.todoValue;
                    todoTime.innerHTML = item.dateTime;
                    todoImportant.innerHTML = '&#9734;';
                    complitedTodo.innerHTML = '&#x2610;';

                    todoDelete.onclick = () => {
                        deleteTodo(item)
                            .then(() => renderTodos())
                    }

                    todosContainer.append(todoValue);
                    todoValue.prepend(complitedTodo);
                    todoValue.append(todoTime);
                    todoValue.append(todoDelete);
                    todoValue.append(todoImportant);
                });
            };
        });
};

export const todoHandler = () => {
    const todo_form = document.getElementById('content__todo_form');
    const formInput = document.getElementById('content__todo_form-input');
    const todo = {
        todoValue: null,
        date: moment().format(),
        dateTime:moment().format('LTS'),
        dateDMY:moment().format('LL'),
    };

    todo_form.addEventListener('submit', event => {
        event.preventDefault();
        todo.todoValue = formInput.value;

        createTodo(todo)
            .then( () => renderTodos());

        formInput.value = null;
    });
};
