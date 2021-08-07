import moment from 'moment';
import { getTodo, getUID, getTask } from '../shared/ls-service';
import { createSubtask, getSubtask, deleteSubTask } from '../api/api-handlers';
import { checkValidSubtask } from '../shared/validators';

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
                    const { id, uuid, subTask, idTodo } = subtask;

                    if(uuid === getUID() && idTodo === getTask()) {
                        const subtaskValue = document.createElement('li');
                        const deleteSubtask = document.createElement('i');

                        subtaskValue.innerText = subTask;
                        subtaskValue.className = 'content__todoMenu_subtask-list-li';
                        deleteSubtask.className = 'bx bx-x';
                        deleteSubtask.setAttribute('title', 'Delete subTask');

                        deleteSubtask.onclick = () => {
                            deleteSubTask(subtask)
                                .then(() => renderSubtask())
                        }

                        listSubtask.prepend(subtaskValue);
                        subtaskValue.prepend(deleteSubtask);
                    }
                })
            }
        })
}

export const subtaskHandler = () => {
    const subtaskForm = document.getElementById('subtask-form');
    const subtaskInput = document.querySelector('.content__todoMenu_subtask-form-input');
    const subtaskInputBtn = document.querySelector('.subtaskInputBtn');
    const subtask = {
        title: null,
        task: null,
        subTask: null,
        date: null,
        idTodo: null,
        uuid: null,
    }

    subtaskInputBtn.setAttribute('disabled', true);
    subtaskInputBtn.style.opacity = '0';

    subtaskInput.oninput = () => {
        if (checkValidSubtask(subtaskInput.value)) {
            subtaskInputBtn.removeAttribute('disabled');
            subtaskInputBtn.style.opacity = '1';
        } else {
            subtaskInputBtn.setAttribute('disabled', true);
            subtaskInputBtn.style.opacity = '0';
        }
    }

    subtaskForm.addEventListener('submit', event => {
        event.preventDefault();
        if (checkValidSubtask(subtaskInput.value)) {
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
