import moment from 'moment';
import { getTodos, createTodo } from '../api/api-handlers';

export const renderTodos = () => {
    getTodos()
        .then( todos => {
            const todosContainer = document.querySelector('.content__todo_todosMain');
            todosContainer.innerHTML = null;
            todos.forEach( item => {
                const todoDate = document.createElement('li');
                const todosUl = document.createElement('ul');
                const todoValue = document.createElement('li');
                const todoTime = document.createElement('span');
                const todoDelete = document.createElement('span');

                todoDate.className = 'todos_date';
                todosUl.className = 'todos';
                todoValue.className = 'todosValue';
                todoTime.className = 'todos-time';
                todoDelete.className = 'todos-deleteImg';

                todoDate.innerHTML = item.dateDMY;
                todoValue.innerHTML = item.todoValue;
                todoTime.innerHTML = item.dateTime;

                todosContainer.append(todoDate);
                todoDate.append(todosUl);
                todosUl.append(todoValue);
                todoValue.prepend(todoDelete);
                todoValue.append(todoTime);
            });
        });
};

export const todoHandler = () => {
    const todo_form = document.getElementById('content__todo_form');
    const formInput = document.getElementById('content__todo_form-input');

    const todo = {
        todoValue: null,
        date: moment().format(),
        dateTime:moment().format('LTS'),
        dateDMY:moment().format('LL')
    };

    todo_form.addEventListener('submit', event => {
        event.preventDefault();
        todo.todoValue = formInput.value;

        createTodo(todo)
            .then( () => renderTodos());

        formInput.value = null;
    });
};
