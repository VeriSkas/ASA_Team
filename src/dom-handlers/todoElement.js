import moment from 'moment';

export const todosElementHandler = () => {
    const titlePage = document.querySelector('.content__todo_title');
    const todoAddPlus = document.querySelector('.content__todo_form-todoAddPlus');
    const todoInput = document.querySelector('.content__todo_form-input');
    const todayDate = document.querySelector('.content__todo_todayDate');

    titlePage.innerHTML = 'My To-Do List';
    todayDate.innerHTML = moment().format('LL');
    todoInput.onfocus = () => {
        todoAddPlus.innerHTML = '&#x2610;';
    };

    todoInput.onblur = () => {
        todoAddPlus.innerHTML = '&#10133;';
    };
};
