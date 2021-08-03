import { getUID, setTitleLS } from '../shared/ls-service';
import { createTitleLists, getTitleLists, deleteTitleLists, deleteList, updateTitleList, getTodos, updateTodo } from '../api/api-handlers';
import { todoHandler, renderTodos } from './todosRender';
import { checkValidListName } from '../shared/validators';

export const createList = () => {
    const createListBtn = document.querySelector('.createListBtn');
    const createListInput = document.querySelector('.wrapper__content_sidebar-navLinks-link-inputList-input');
    const createListForm = document.querySelector('.wrapper__content_sidebar-navLinks-link-inputList');
    const titlePage = document.querySelector('.content__todo_title');
    const todoInput = document.querySelector('.content__todo_form');

    const titleList = {
        title: null,
        firstTitle: null,
        uuid: getUID()
    }

    createListForm.addEventListener('submit', event => {
        event.preventDefault();
        if(checkValidListName(createListInput.value)) {
            titleList.title = createListInput.value;
            titleList.firstTitle = createListInput.value;
            titlePage.innerHTML = createListInput.value;
            createTitleLists(titleList)
                .then(renderTitleLists);
            setTitleLS(createListInput.value);
            createListInput.value = null;
            todoInput.style.display = 'flex';
        }
    });
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
                        const titleA = document.createElement('textarea');
                        const deleteTitleBtn = document.createElement('a');
                        const changeListNameBtn = document.createElement('a');

                        titleLi.className = 'wrapper__content_sidebar-navLinks-link-subMenu-listName';
                        deleteTitleBtn.innerHTML = '<i class="bx bx-x"></i>';
                        deleteTitleBtn.setAttribute('title', 'Delete List');
                        changeListNameBtn.innerHTML = '<i class="bx bx-cog" ></i>';
                        changeListNameBtn.setAttribute('title', 'Change ListName');
                        titleA.value = item.title;

                        titleA.onclick = () => {
                            titlePage.innerHTML = item.title;
                            todoInput.style.display = 'flex';
                            setTitleLS(item.title);
                            todoHandler();
                            renderTodos();
                        }

                        deleteTitleBtn.onclick = () => {
                            deleteTitleLists(item)
                                .then(() => deleteList(item.title))
                                .then(() => renderTitleLists())
                        }

                        changeListNameBtn.onclick = () => {
                            if ((item.title !== titleA.value) && checkValidListName(titleA.value)) {
                                titlePage.innerHTML = titleA.value;
                                getTodos(item.title)
                                    .then(todos => {
                                        if (todos) {
                                            todos.forEach(todo => {
                                                todo.title = titleA.value;
                                                updateTodo(todo);
                                            })
                                        }
                                    })
                                    .then(() => deleteList(item.title))
                                    .then(() => {
                                        item.title = titleA.value;
                                        updateTitleList(item);
                                    })
                            }
                        }

                        subMenuLists.append(titleLi);
                        titleLi.append(changeListNameBtn);
                        titleLi.append(titleA);
                        titleLi.append(deleteTitleBtn);
                    }
                })
            }
        });

}