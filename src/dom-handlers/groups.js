import moment from 'moment';
import { createGroup, deleteGroup, getGroups } from '../api/api-handlers';
import { innerTextTitle } from '../shared/constants/textFile';
import {
    getClickedPage,
    getGroupLS,
    getPersonalData,
    getUID,
    setClickedPage,
    setGroupLS
} from "../shared/ls-service";
import { pageNameInLS } from '../shared/textInLS';
import { onloadPage } from './onloadPage';

export const createGroupLink = () => {
    const createGroupForm = document.querySelector('.wrapper__content_sidebar-navLinks-link-a.groupCreate');
    const createGroupInput = document.querySelector('.wrapper__content_sidebar-navLinks-link-groupCreate-input');
    const createGroupBtn = document.querySelector('.createGroupBtn');
    const titlePage = document.querySelector('.content__todo_title');

    const group = {
        title: null,
        creatorUUID: getUID(),
        date: null,
        participant: [getPersonalData()],
        todosGroup: null,
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

    createGroupForm.onclick = event => {
        event.preventDefault();
        if (createGroupInput.value && createGroupInput.value.length < 20) {
            titlePage.innerText = `${innerTextTitle.groups} "${createGroupInput.value || ''}"`;
            group.title = createGroupInput.value;
            group.date = moment().format();
            group.todosGroup = [];
            setClickedPage(pageNameInLS.groups);
            createGroup(group)
                .then(result => group.id = result.name)
                .then(() => setGroupLS(group))
                .then(() => onloadPage())
                .then(() => renderGroups());
            createGroupInput.value = null;
        }
    }
}

export const renderGroups = () => {
    const groupsUl = document.querySelector('.wrapper__content_sidebar-navLinks-link-subMenu.groups');
    const titlePage = document.querySelector('.content__todo_title');
    const todosContainer = document.querySelector('.content__todo_todosMain');

    groupsUl.innerHTML = null;
    todosContainer.innerHTML = null;

    getGroups()
        .then( groups => {
            if ( groups ) {
                groups.forEach( group => {
                    const userGroupParticipant = group.participant.filter(user => user.uuid === getUID());
                    if (getUID() === group.creatorUUID || userGroupParticipant.length) {
                        const groupLi = document.createElement('li');
                        const groupTitle = document.createElement('textarea');
                        const deleteGroupBtn = document.createElement('i');

                        groupsUl.style.visibility = 'visible';
                        groupLi.className = 'wrapper__content_sidebar-navLinks-link-subMenu-groupName';
                        deleteGroupBtn.className = 'bx bx-x';
                        groupTitle.value = group.title;

                        if (getUID() !== group.creatorUUID) {
                            groupTitle.style.color = 'red';
                        }

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
                                        setGroupLS(null);
                                        setClickedPage(pageNameInLS.tasks);
                                        renderGroups();
                                        onloadPage();
                                    } else {
                                        renderGroups();
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
