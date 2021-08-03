import { routes } from '../shared/constants/routes';
import { clearLS } from '../shared/ls-service';

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
};
