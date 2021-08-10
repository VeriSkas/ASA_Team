import { getPersonalData, getUID, setPersonalData } from '../shared/ls-service';
import { getUser } from '../api/api-handlers';

export const userProfile = () => {
    return getUser()
        .then( users => {
            if (users) {
                users.forEach( user => {
                    const { id, uuid, loginName, email } = user;
                    const userLogin = document.querySelector('.profile-name');
                    const userEmail = document.querySelector('.profile-email');
                    const userPhoto = document.querySelector('.wrapper__content_sidebar-navLinks-link_profile-photo');

                    if( getUID() === uuid ) {
                        setPersonalData(user);
                        userLogin.innerText = loginName;
                        userEmail.innerText = email;
                        getPersonalData().photo ?
                        userPhoto.style.backgroundImage = `url("${getPersonalData().photo}")` :
                        userPhoto.style.backgroundImage = 'url("/src/img/User-Default.jpg")';
                    }
                })
            }
        })
}
