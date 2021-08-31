import moment from 'moment';
import { createGroup, getGroups } from '../api/api-handlers';
import { getUID } from "../shared/ls-service";

export const createGroupLink = () => {
    const createGorupForm = document.querySelector('.wrapper__content_sidebar-navLinks-link-a.groupCreate');
    const createGroupInput = document.querySelector('.wrapper__content_sidebar-navLinks-link-groupCreate-input');
    const groupsLink = document.querySelector('#nav-links_groups');
    const groupsUl = document.querySelector('.wrapper__content_sidebar-navLinks-link-subMenu groups');
    const createGroupBtn = document.querySelector('.createGroupBtn');

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
            group.title = createGroupInput.value;
            group.date = moment().format();
            console.log(group);
            createGroup(group);
            createGroupInput.value = null;
        }
    }
}

export const renderGroups = () => {
    const groupsLink = document.querySelector('#nav-links_groups');
    const groupsUl = document.querySelector('.wrapper__content_sidebar-navLinks-link-subMenu.groups');
    const titlePage = document.querySelector('.content__todo_title');
    const todosContainer = document.querySelector('.content__todo_todosMain');
    const todoInput = document.querySelector('.content__todo_form');
    const calendar = document.querySelector('.calendar__wrapper');

    groupsUl.innerHTML = null;
    todosContainer.innerHTML = null;
    groupsUl.style.visibility = 'hidden';

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

                        groupsUl.prepend(groupLi);
                        groupLi.append(groupTitle, deleteGroupBtn);
                    }
                })
            }
        })
}