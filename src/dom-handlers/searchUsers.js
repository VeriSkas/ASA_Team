import { getGroups, getUser, updateGroup } from "../api/api-handlers";
import { errorText } from "../shared/constants/errorText";
import { tooltips } from "../shared/constants/textFile";
import { searchUser } from "../shared/filters";
import { getGroupLS, setGroupLS } from "../shared/ls-service";
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
                const group = getGroupLS();

                if (searchUserEmail) {
                    if (searchUserEmail[0].uuid !== group.creatorUUID) {
                       if (group.participant) {
                           const repeatedItem = group.participant.filter(item => item.uuid === searchUserEmail[0].uuid);
                           if (!repeatedItem) {
                               group.participant = group.participant.concat(searchUserEmail);
                           }
                       } else {
                           group.participant = searchUserEmail;
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
                        if(group.participant) {
                            group.participant.forEach(participant => {
                                const userEmail = document.createElement('li');
                                const userDelete = document.createElement('i');

                                userEmail.className = 'content__todo_formSearchGroup-usersBtn-users-user';
                                userDelete.className = 'bx bx-x';
                                userDelete.setAttribute('title', tooltips.deleteUser);

                                userEmail.innerText = participant.email;

                                usersList.append(userEmail);
                                userEmail.append(userDelete);

                            })
                        }
                    }
                })

            }

        })

}