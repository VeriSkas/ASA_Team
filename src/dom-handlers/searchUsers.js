
import { getGroups, getUser, updateGroup } from "../api/api-handlers";
import { errorText } from "../shared/constants/errorText";
import { textInner, tooltips } from "../shared/constants/textFile";
import { searchUser } from "../shared/filters";
import { getGroupLS, getUID, setGroupLS } from "../shared/ls-service";
import { checkValidEmail } from "../shared/validators";

export const userGroupBtn = () => {
    const usersGroupBtn = document.querySelector('.bxs-user-account.usersGroup');
    const usersList = document.querySelector('.content__todo_formSearchGroup-usersBtn-users');

    usersGroupBtn.onclick = () => usersList.classList.toggle('close');
    searchUsersInput();
}

export const searchUsersInput = () => {
    const searchForm = document.querySelector('#content__todo_formSearchGroup');
    const searchInput = document.querySelector('.content__todo_formSearchGroup-input');
    const searchError = document.querySelector('#inputSearchUsersError');


    searchInput.oninput = () => {
        checkValidEmail(searchInput.value) ?
            searchError.innerText = '' :
            searchError.innerText = errorText.validEmailText;
    }

    searchForm.addEventListener('submit', event => {
        event.preventDefault();
        const searchUserEmail = searchInput.value;
        searchUserOnBD(searchUserEmail);
        searchInput.value = null;
    })
}

export const searchUserOnBD = async user => {
    return getUser()
        .then( users => {

            if (users) {
                const searchUserEmail = searchUser(users, user);

                if (searchUserEmail[0]) {
                    const group = getGroupLS();
                    if (searchUserEmail[0].uuid !== group.creatorUUID) {
                        const repeatedItem = group.participant.filter(item => item.uuid === searchUserEmail[0].uuid);
                        if (!repeatedItem.length) {
                            group.participant = group.participant.concat(searchUserEmail);
                        }

                        updateGroup(group)
                            .then(() => setGroupLS(group))
                            .then(() => renderParticipants());
                    }

                }
            }
        })
    }

export const renderParticipants = () => {
    getGroups()
        .then( groups => {
            const usersList = document.querySelector('.content__todo_formSearchGroup-usersBtn-users');
            const usersGroupIcon = document.querySelector('.bxs-user-account.usersGroup');
            usersList.innerHTML = null;

            if (groups) {
                const groupLS = getGroupLS();

                groups.forEach( group => {
                    if(groupLS.id === group.id) {
                        const userGroupParticipant = group.participant.filter(user => user.uuid !== getUID());
                        console.log(groups);
                        if(userGroupParticipant.length) {
                            usersGroupIcon.style.color = 'red';
                            group.participant.forEach((participant, i) => {
                                const userEmail = document.createElement('li');
                                const userDelete = document.createElement('i');

                                userEmail.className = 'content__todo_formSearchGroup-usersBtn-users-user';
                                userDelete.className = 'bx bx-x';
                                userDelete.setAttribute('title', tooltips.deleteUser);

                                userEmail.innerText = participant.email;

                                userDelete.onclick = () => {
                                    group.participant.splice(i, 1);
                                    updateGroup(group)
                                        .then(() => setGroupLS(group))
                                        .then(() => renderParticipants());
                                }

                                usersList.append(userEmail);
                                if (participant.uuid !== getUID()) {
                                    userEmail.append(userDelete);
                                }
                            })
                        } else {
                            const userEmail = document.createElement('li');
                            userEmail.className = 'content__todo_formSearchGroup-usersBtn-users-user';
                            userEmail.innerText = textInner.notUsersInGroup;
                            usersGroupIcon.style.color = 'black';
                            usersList.append(userEmail);
                        }
                    }
                })
            }
        })
}
