import moment from 'moment';
import { createGroup, deleteGroup, getGroups } from '../api/api-handlers';
import { innerTextTitle } from '../shared/constants/textFile';
import { getClickedPage, getGroupLS, getUID, setClickedPage, setGroupLS } from "../shared/ls-service";
import { pageNameInLS } from '../shared/textInLS';
import { onloadPage } from './onloadPage';

export const createGroupLink = () => {
    const createGorupForm = document.querySelector('.wrapper__content_sidebar-navLinks-link-a.groupCreate');
    const createGroupInput = document.querySelector('.wrapper__content_sidebar-navLinks-link-groupCreate-input');
    const createGroupBtn = document.querySelector('.createGroupBtn');
    const titlePage = document.querySelector('.content__todo_title');

    const group = {
        title: null,
        creatorUUID: getUID(),
        date: null
    }

    createGroupBtn.setAttribute('disabled', true);

    createGroupInput.oninput = () => {
        if (createGroupInput.value && createGroupInput.value.length < 20) {
            createGroupBtn.removeAttribute('disabled');
            createGroupBtn.style.opacity = '1';
        } else {
            createGroupBtn.setAttribute('disabled', true);
            createGroupBtn.style.opacity = '0';
        }
    }

    createGorupForm.onclick = event => {
        event.preventDefault();
        if (createGroupInput.value && createGroupInput.value.length < 20) {
            titlePage.innerText = `${innerTextTitle.groups} "${createGroupInput.value || ''}"`;
            group.title = createGroupInput.value;
            group.date = moment().format();
            setClickedPage(pageNameInLS.groups);
            setGroupLS(group);
            createGroup(group)
                .then(() => {
                    onloadPage();
                });
            createGroupInput.value = null;
        }
    }
}

export const renderGroups = () => {
    const groupsUl = document.querySelector('.wrapper__content_sidebar-navLinks-link-subMenu.groups');
    const titlePage = document.querySelector('.content__todo_title');
    const todosContainer = document.querySelector('.content__todo_todosMain');
    const todoInput = document.querySelector('.content__todo_form');

    groupsUl.innerHTML = null;
    todosContainer.innerHTML = null;

    getGroups()
        .then( groups => {
            if ( groups ) {
                groups.forEach( group => {
                    if (getUID() === group.creatorUUID) {
                        const groupLi = document.createElement('li');
                        const groupTitle = document.createElement('textarea');
                        const deleteGroupBtn = document.createElement('i');

                        groupsUl.style.visibility = 'visible';
                        groupLi.className = 'wrapper__content_sidebar-navLinks-link-subMenu-groupName';
                        deleteGroupBtn.className = 'bx bx-x';
                        groupTitle.value = group.title;

                        groupTitle.onclick = () => {
                            setGroupLS(group);
                            titlePage.innerText = `${innerTextTitle.groups} "${group.title || ''}"`;
                            setClickedPage(pageNameInLS.groups);
                            onloadPage();
                        }

                        deleteGroupBtn.onclick = () => {
                            deleteGroup(group.id)
                                .then(() => {
                                    if (getClickedPage() === pageNameInLS.groups
                                        && getGroupLS().id === group.id
                                    ) {
                                        console.log('check');
                                        setGroupLS(null);
                                        setClickedPage(pageNameInLS.tasks);
                                        onloadPage();
                                    } else {
                                        onloadPage();
                                    }
                                });
                        }

                        groupsUl.prepend(groupLi);
                        groupLi.append(groupTitle, deleteGroupBtn);
                    }
                })
            }
        })
}