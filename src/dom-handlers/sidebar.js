import { routes } from '../shared/constants/routes';
import { clearLS, setTitleLS } from '../shared/ls-service';
import { getTitleLists } from '../api/api-handlers';
import { todoHandler, renderTodos } from './todosRender';

export const showSidebar = () => {
    const sidebar = document.querySelector('.wrapper__content_sidebar');
    const arrow = document.querySelector('.arrow');
    const listsLi = document.querySelector('#nav-links_lists');
    const listsUl = document.querySelector('.lists');
    const sidebarBtn = document.querySelector('.bx-menu');
    const createListInput = document.querySelector('.wrapper__content_sidebar-navLinks-link-inputList-input');
    const createListBtn = document.querySelector('.createListBtn');
    const logOutBtn = document.getElementById('logOut');
    const todosContainer = document.querySelector('.content__todo_todosMain');
    const inputTodos = document.querySelector('.content__todo_form');
    const titlePage = document.querySelector('.content__todo_title');

    sidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('close');
    });

    arrow.addEventListener('click', () => {
        listsLi.classList.toggle('showMenu');
    })

    logOutBtn.addEventListener('click', () => {
        window.location.href = routes.signIn_Up;
        clearLS();
    })

    createListBtn.onclick = () => {
        const listLi = document.createElement('li');
        const listA = document.createElement('a');

        todosContainer.innerHTML = null;
        listA.innerHTML = createListInput.value;
        titlePage.innerHTML = createListInput.value;
        setTitleLS(createListInput.value);

        listsUl.append(listLi);
        listLi.append(listA);
        createListInput.value = null;
        inputTodos.style.display = 'flex';
        todoHandler();
    }

    getTitleLists()
        .then( titleGroup => {
            const subMenuLists = document.querySelector('.lists');
            subMenuLists.innerHTML = null;

            if (titleGroup) {
                titleGroup.forEach( item => {
                    const titleLi = document.createElement('li');
                    const titleA = document.createElement('a');

                    titleA.innerHTML = item;
                    titleA.onclick = () => {
                        titlePage.innerHTML = item;
                        setTitleLS(item);
                        todoHandler();
                        renderTodos();
                    }

                    subMenuLists.append(titleLi);
                    titleLi.append(titleA);
                })
            }
        });


};
