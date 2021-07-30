import { getUID, setTitleLS } from '../shared/ls-service';
import { createTitleLists, getTitleLists } from '../api/api-handlers';
import { todoHandler, renderTodos } from './todosRender';

export const createList = () => {
    const createListBtn = document.querySelector('.createListBtn');
    const createListInput = document.querySelector('.wrapper__content_sidebar-navLinks-link-inputList-input');
    const titlePage = document.querySelector('.content__todo_title');
    const todoInput = document.querySelector('.content__todo_form');

    const titleList = {
        title: null,
        uuid: getUID()
    }

    createListBtn.onclick = () => {
        titleList.title = createListInput.value;
        titlePage.innerHTML = createListInput.value;
        createTitleLists(titleList)
            .then(renderTitleLists);
        setTitleLS(createListInput.value);
        createListInput.value = null;
        todoInput.style.display = 'flex';
    }
}

export const renderTitleLists = () => {
    getTitleLists()
        .then( titleGroup => {
            const subMenuLists = document.querySelector('.lists');
            const titlePage = document.querySelector('.content__todo_title');
            const todosContainer = document.querySelector('.content__todo_todosMain');
            const todoInput = document.querySelector('.content__todo_form');

            subMenuLists.innerHTML = null;
            todosContainer.innerHTML = null;

            if ( titleGroup ) {
                titleGroup.forEach( item => {
                    if (getUID() === item.uuid) {
                        const titleLi = document.createElement('li');
                        const titleA = document.createElement('a');

                        titleA.innerHTML = item.title;

                        titleA.onclick = () => {
                            titlePage.innerHTML = item.title;
                            todoInput.style.display = 'flex';
                            setTitleLS(item.title);
                            todoHandler();
                            renderTodos();
                        }

                        subMenuLists.append(titleLi);
                        titleLi.append(titleA);
                    }
                })
            }
        });

}