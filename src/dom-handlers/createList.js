import { getUID, setTitleLS, getTitleLS, setClickedPage, getClickedPage } from '../shared/ls-service';
import {
    createTitleLists,
    getTitleLists,
    deleteTitleLists,
    updateTitleList,
    getTodos,
    updateTodo,
    deleteTodo,
    getSubtask,
    deleteSubTask
} from '../api/api-handlers';
import { todoHandler, renderTodos } from './todosRender';
import { checkValidListName } from '../shared/validators';
import { errorText } from '../shared/constants/errorText';
import { showErrorNotification } from '../shared/error-handlers';
import { onloadPage } from './onloadPage';

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

    createListBtn.setAttribute('disabled', true);

    createListInput.oninput = () => {
        if (checkValidListName(createListInput.value)) {
            createListBtn.removeAttribute('disabled');
            createListBtn.style.opacity = '1';
        } else {
            createListBtn.setAttribute('disabled', true);
            createListBtn.style.opacity = '0';
        }
    }

    createListForm.addEventListener('submit', event => {
        event.preventDefault();
        getTitleLists()
            .then(titleLists => {
                console.log(titleLists);
                if (titleLists) {
                    const arrTitles = titleLists
                        .filter(titleList => titleList.uuid === getUID())
                        .map(titleList => titleList.firstTitle)
                        .find(title => title === createListInput.value);

                    if (arrTitles) {
                        showErrorNotification(errorText.sameListError);
                    } else {
                        if (checkValidListName(createListInput.value)) {
                            titleList.title = createListInput.value;
                            titleList.firstTitle = createListInput.value;
                            titlePage.innerHTML = createListInput.value;
                            createTitleLists(titleList)
                                .then(renderTitleLists);
                            setTitleLS(createListInput.value);
                            createListInput.value = null;
                            todoInput.style.display = 'flex';
                        }
                    }
                } else {
                    if (checkValidListName(createListInput.value)) {
                        titleList.title = createListInput.value;
                        titleList.firstTitle = createListInput.value;
                        titlePage.innerHTML = createListInput.value;
                        createTitleLists(titleList)
                            .then(renderTitleLists);
                        setTitleLS(createListInput.value);
                        createListInput.value = null;
                        todoInput.style.display = 'flex';
                    }
                }
            })
    })
}

export const renderTitleLists = () => {
    getTitleLists()
        .then( titleGroup => {
            const subMenuLists = document.querySelector('.lists');
            const titlePage = document.querySelector('.content__todo_title');
            const todosContainer = document.querySelector('.content__todo_todosMain');
            const todoInput = document.querySelector('.content__todo_form');
            const calendar = document.querySelector('.calendar__wrapper');

            subMenuLists.innerHTML = null;
            todosContainer.innerHTML = null;
            subMenuLists.style.visibility = 'hidden';

            if ( titleGroup ) {
                titleGroup.forEach( item => {
                    if (getUID() === item.uuid) {
                        const titleLi = document.createElement('li');
                        const titleA = document.createElement('textarea');
                        const deleteTitleBtn = document.createElement('a');
                        const changeListNameBtn = document.createElement('a');

                        subMenuLists.style.visibility = 'visible';
                        titleLi.className = 'wrapper__content_sidebar-navLinks-link-subMenu-listName';
                        deleteTitleBtn.innerHTML = '<i class="bx bx-x"></i>';
                        deleteTitleBtn.setAttribute('title', 'Delete List');
                        changeListNameBtn.innerHTML = '<i class="bx bx-cog" ></i>';
                        changeListNameBtn.setAttribute('title', 'Change ListName');
                        titleA.setAttribute('title', 'ListName can contain letters and numbers up to 20 characters');
                        titleA.value = item.title;

                        titleA.onclick = () => {
                            titlePage.innerHTML = item.title;
                            todoInput.style.display = 'flex';
                            calendar.style.display = 'none';
                            setTitleLS(item.title);
                            setClickedPage(item.title);
                            todoHandler();
                            renderTodos();
                        }

                        deleteTitleBtn.onclick = async () => {
                            console.log(item);
                            await getTodos()
                                .then(todos => {
                                    if(todos) {
                                        todos.forEach(todo => {
                                            if((getUID() === todo.uuid) && (item.title === todo.title)) {
                                                deleteTodo(todo);
                                            }
                                        })
                                    }
                                })

                            await getSubtask()
                                .then(subtasks => {
                                    if(subtasks) {
                                        subtasks.forEach(subtask => {
                                            if((getUID() === subtask.uuid) && (item.firstTitle === subtask.title)) {
                                                deleteSubTask(subtask);
                                            }
                                        })
                                    }
                                })

                            await deleteTitleLists(item)
                                .then(() => renderTitleLists())
                                .then(() => {
                                    if (getClickedPage() === item.title) {
                                        setClickedPage('tasks');
                                        onloadPage();
                                    }
                                })
                        }

                        changeListNameBtn.onclick = () => {
                            if ((item.title !== titleA.value) && checkValidListName(titleA.value)) {
                                titlePage.innerHTML = titleA.value;
                                getTodos()
                                    .then(todos => {
                                        if (todos) {
                                            todos.forEach(todo => {
                                                if(todo.title === getTitleLS()) {
                                                    todo.title = titleA.value;
                                                    updateTodo(todo);
                                                }
                                            })
                                        }
                                    })
                                    .then(() => {
                                        item.title = titleA.value;
                                        updateTitleList(item);
                                    })
                            } else {
                                titleA.value = item.title;
                            }
                        }

                        subMenuLists.prepend(titleLi);
                        titleLi.append(
                            changeListNameBtn,
                            titleA,
                            deleteTitleBtn,
                        );
                    }
                })
            }
        });
}
