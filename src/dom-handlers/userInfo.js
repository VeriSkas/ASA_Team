import { getUID } from '../shared/ls-service';
import { getUser } from '../api/api-handlers';

export const userProfile = () => {
    getUser()
        .then( users => {
            if (users) {
                users.forEach( user => {
                    const { id, uuid, loginName, email } = user;
                    const userLogin = document.querySelector('.profile-name');
                    const userEmail = document.querySelector('.profile-email');

                    if( getUID() === uuid ) {
                        userLogin.innerText = loginName;
                        userEmail.innerText = email;
                    }
                })
            }
        })
}