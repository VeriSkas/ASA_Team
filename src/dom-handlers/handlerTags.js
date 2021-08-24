import { getTodos, updateTodo } from "../api/api-handlers";
import {  getTask, getTodo, getUID, setTodo } from "../shared/ls-service";
import { renderTodosAfterUpdate } from "./onloadPage";

export const createTagTask = () => {
    const tagNameMain = document.querySelector('#tagName_main');
    const tagNameUrgent = document.querySelector('#tagName_urgent');
    const deleteTagUrgent = document.querySelector('.bx-x.urgent');
    const deleteTagMain = document.querySelector('.bx-x.main');

    tagNameMain.onclick = () => {
        const task = getTodo();
        const clicked = tagNameMain.getAttribute('clicked');

        if (task.tagMain) {
            if (clicked) {
                task.tagMain = false;
                tagNameMain.removeAttribute('clicked');
            } else {
                task.tagMain = true;
                tagNameMain.setAttribute('clicked', true);
            }
        } else {
            task.tagMain = true;
            tagNameMain.setAttribute('clicked', true);
        }

        setTodo(task);
        updateTodo(task)
            .then(() => renderTags())
            .then( () => renderTodosAfterUpdate());
    }

    tagNameUrgent.onclick = () => {
        const task = getTodo();
        const clicked = tagNameUrgent.getAttribute('clicked');

        if (task.tagUrgent) {
            if (clicked) {
                task.tagUrgent = false;
                tagNameUrgent.removeAttribute('clicked');
            } else {
                task.tagUrgent = true;
                tagNameUrgent.setAttribute('clicked', true);
            }
        } else {
            task.tagUrgent = true;
            tagNameUrgent.setAttribute('clicked', true);
        }

        setTodo(task);
        updateTodo(task)
            .then(() => renderTags())
            .then( () => renderTodosAfterUpdate());
    }

    deleteTagUrgent.onclick = () => {
        const task = getTodo();
        task.tagUrgent = false;
        setTodo(task);
        updateTodo(task)
            .then(() => renderTags())
            .then( () => renderTodosAfterUpdate());
    }

    deleteTagMain.onclick = () => {
        const task = getTodo();
        task.tagMain = false;
        setTodo(task);
        updateTodo(task)
            .then(() => renderTags())
            .then( () => renderTodosAfterUpdate());
    }
};

export const renderTags = () => {
    const activeTagMain = document.querySelector('#activeTags_main');
    const activeTagUrgent = document.querySelector('#activeTags_urgent');
    const checkMain = document.querySelector('.bx-check.main');
    const checkUrgent = document.querySelector('.bx-check.urgent');

    getTodos()
        .then( todos => {

            if(todos) {
                todos.forEach( item => {
                    const {
                        id,
                        uuid,
                        tagUrgent,
                        tagMain,
                    } = item;

                    if ((getUID() === uuid) && (id === getTask())) {
                        if (tagUrgent) {
                            activeTagUrgent.style.display = 'block';
                            checkUrgent.style.visibility = 'visible';
                        } else {
                            activeTagUrgent.style.display = 'none';
                            checkUrgent.style.visibility = 'hidden';
                        }

                        if (tagMain) {
                            activeTagMain.style.display = 'block';
                            checkMain.style.visibility = 'visible';
                        } else {
                            activeTagMain.style.display = 'none';
                            checkMain.style.visibility = 'hidden';
                        }
                    }
                })
            }
        })
}