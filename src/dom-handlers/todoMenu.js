import moment from 'moment';
import { getTodo, getUID, getTask } from '../shared/ls-service';
import { createSubtask, getSubtask } from '../api/api-handlers';

export const todoMenuSidebar = () => {
    const taskMenuCloseBtn = document.querySelector('.content__todoMenu_closeBtn');
    const taskMenu = document.querySelector('.content__todoMenu');

    taskMenuCloseBtn.onclick = () => {
        taskMenu.classList.add('close');
    };

    subtaskHandler();
    renderSubtask();
}

export const renderSubtask = () => {
    getSubtask()
        .then( subtasks => {
            const listSubtask = document.querySelector('.content__todoMenu_subtask-list');
            listSubtask.innerHTML = null;

            if(subtasks) {
                subtasks.forEach( subtask => {
                    const { uuid, subTask, idTodo } = subtask;

                    if(uuid === getUID() && idTodo === getTask()) {
                        const subtaskValue = document.createElement('li');
                        subtaskValue.innerText = subTask;
                        subtaskValue.className = 'content__todoMenu_subtask-list-li';
                        listSubtask.append(subtaskValue);
                    }
                })
            }
        })
}

export const subtaskHandler = () => {
    const subtaskForm = document.getElementById('subtask-form');
    const subtaskInput = document.querySelector('.content__todoMenu_subtask-form-input');
    const subtask = {
        title: null,
        task: null,
        subTask: null,
        date: null,
        idTodo: null,
        uuid: null,
    }

    subtaskForm.addEventListener('submit', event => {
        event.preventDefault();
        if (subtaskInput.value) {
            const todo = JSON.parse(getTodo());

            subtask.title = todo.title;
            subtask.task = todo.todoValue;
            subtask.subTask = subtaskInput.value;
            subtask.date = moment().format();
            subtask.idTodo = todo.id;
            subtask.uuid = todo.uuid;

            createSubtask(subtask)
                .then(() => renderSubtask());
            subtaskInput.value = null;
        }
    })
}
