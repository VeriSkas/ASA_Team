import { getDeleteTodolist, getTodos } from '../api/api-handlers';
import { routes } from '../shared/constants/routes';
import { clearLS, getTitleLS, getUID } from '../shared/ls-service';

import { createList, renderTitleLists } from './createList';

export const showSidebar = () => {
    const sidebar = document.querySelector('.wrapper__content_sidebar');
    const arrow = document.querySelector('.arrow');
    const listsLi = document.querySelector('#nav-links_lists');
    const sidebarBtn = document.querySelector('.bx-menu');
    const logOutBtn = document.getElementById('logOut');

    sidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('close');
    });

    arrow.addEventListener('click', () => {
        listsLi.classList.toggle('showMenu');
    })

    logOutBtn.onclick = () => {
        window.location.href = routes.startPage;
        clearLS();
    };

    createList();
    renderTitleLists();
    counterTasksRender();
};

export const counterTasksRender = async () => {
    const counterImportantTasks = document.querySelector('#importantTasks_counter');
    const counterComplitedTasks = document.querySelector('#complitedTasks_counter');
    const counterDeletedTasks = document.querySelector('#deletedTasks_counter');
    const counterTasks = document.querySelector('#tasks_counter');
    const titleLS = getTitleLS();
    let counter = '';
    let counterComplited = '';
    let counterDeleted = '';
    let counterImportant = '';

    await getTodos()
        .then( todos => {
            if(todos) {
                todos.forEach( item => {
                    if ((getUID() === item.uuid)) {
                        counterTasks.innerHTML = counter;
                        counterImportantTasks.innerHTML = counterImportant;
                        counterComplitedTasks.innerHTML = counterComplited;

                        if (!item.complited && (item.title === 'tasks'))  {
                            counter++;
                            counterTasks.innerHTML = counter;
                        }

                        if (item.important && !item.complited) {
                            counterImportant++;
                            counterImportantTasks.innerHTML = counterImportant;
                        }

                        if (item.complited) {
                            counterComplited++;
                            counterComplitedTasks.innerHTML = counterComplited;
                        }
                    }
                })
            }
        })

    await getDeleteTodolist()
        .then( todos => {
            counterDeletedTasks.innerHTML = counterDeleted;

            if(todos) {
                todos.forEach( item => {
                    if (getUID() === item.uuid) {
                        counterDeleted++;
                        counterDeletedTasks.innerHTML = counterDeleted;
                    }
                })
            }
        })
}
