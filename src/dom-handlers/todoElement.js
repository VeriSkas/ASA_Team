import moment from 'moment';

const todoAddPlus = document.querySelector('.content__todo_form-todoAddPlus');
const todoInput = document.querySelector('.content__todo_form-input');
const todayDate = document.querySelector('.todayDate');

export const todosElementHandler = () => {
    todayDate.innerHTML = moment().format('LL');
    todoInput.onfocus = () => {
        todoAddPlus.innerHTML = '&#x2610;';
    };

    todoInput.onblur = () => {
        todoAddPlus.innerHTML = '&#10133;';
    };
};
