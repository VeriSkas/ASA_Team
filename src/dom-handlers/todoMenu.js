import moment from 'moment';
import { getTodo, getUID, getTask } from '../shared/ls-service';
import { createSubtask, getSubtask, deleteSubTask, updateSubtask } from '../api/api-handlers';
import { checkValidSubtask } from '../shared/validators';
import { errorText } from '../shared/constants/errorText';
import { handlerComment, renderComment } from './createComment';

export const todoMenuSidebar = () => {
    const taskMenuCloseBtn = document.querySelector('.content__todoMenu_closeBtn');
    const taskMenu = document.querySelector('.content__todoMenu');

    taskMenuCloseBtn.onclick = () => {
        taskMenu.classList.add('close');
    };

    subtaskHandler();
    renderSubtask();
    renderComment();
    handlerComment();
}

export const renderSubtask = () => {
    getSubtask()
        .then( subtasks => {
            const listSubtask = document.querySelector('.content__todoMenu_subtask-list');
            listSubtask.innerHTML = null;

            if(subtasks) {
                subtasks.forEach( subtask => {
                    const { id, uuid, subTask, idTodo, complited } = subtask;

                    if(uuid === getUID() && idTodo === getTask()) {
                        const subtaskLi = document.createElement('li');
                        const deleteSubtask = document.createElement('i');
                        const subtaskValue = document.createElement('textarea');
                        const checkbox = document.createElement('i');

                        subtaskValue.innerText = subTask;
                        subtaskValue.className = 'content__todoMenu_subtask-list-li-value';
                        subtaskLi.className = 'content__todoMenu_subtask-list-li';
                        deleteSubtask.className = 'bx bx-x';
                        deleteSubtask.setAttribute('title', 'Delete subTask');
                        checkbox.setAttribute('title', 'Complited subTask');
                        subtaskValue.setAttribute('title', errorText.inputTodoErrorText);

                        deleteSubtask.onclick = () => {
                            deleteSubTask(subtask)
                                .then(() => renderSubtask())
                        }

                        if (complited) {
                            checkbox.className = 'bx bxs-check-circle';
                            subtaskValue.style.textDecoration = 'line-through';
                        } else {
                            checkbox.className = 'bx bx-check-circle';
                            subtaskValue.style.textDecoration = 'none';
                        }

                        checkbox.onclick = () => {
                            if(complited) {
                                subtask.complited = false;
                                updateSubtask(subtask)
                                    .then(() => renderSubtask());
                            } else {
                                subtask.complited = true;
                                updateSubtask(subtask)
                                    .then(() => renderSubtask());
                            }
                        }

                        subtaskValue.onkeyup = event => {
                            if (event.key === 'Enter') {
                                if ((subtaskValue.value !== subtask.subTask) && checkValidSubtask(subtaskValue.value)) {
                                    subtask.date = moment().format();
                                    subtask.subTask = subtaskValue.value;

                                    updateSubtask(subtask)
                                        .then(() => renderSubtask());
                                } else {
                                    subtaskValue.value = subtask.subTask;
                                }
                            }
                        }

                        subtaskValue.onblur = () => {
                            if ((subtaskValue.value !== subtask.subTask) && checkValidSubtask(subtaskValue.value)) {
                                subtask.date = moment().format();
                                subtask.subTask = subtaskValue.value;

                                updateSubtask(subtask)
                                    .then(() => renderSubtask());
                            } else {
                                subtaskValue.value = subtask.subTask;
                            }
                        }

                        listSubtask.prepend(subtaskLi);
                        subtaskLi.prepend( checkbox, subtaskValue, deleteSubtask);
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
        complited: false,
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
            const todo = getTodo();

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
