import './styles/style.scss';
import { switchBetweenSignInAndSignUp } from './components/signIn_signUp/signIn-Up';
import { showSidebar } from './dom-handlers/sidebar';
import { routes, paths } from './shared/constants/routes';
import { getToken } from './shared/ls-service';
import { signInHandler } from './components/sign_in/sign-in';
import { signUpHandler } from './components/sign_up/sign-up';
import { startPageStyle } from './components/startPage/startPage';
import { profile_modal } from './components/profile/profile_modal';
import { onloadPage } from './dom-handlers/onloadPage';
import { userProfile } from './dom-handlers/userInfo';
import { hideSpiner, showSpiner } from './dom-handlers/spiner';

showSpiner();

window.onload = async () => {
    const body = document.querySelector('body');
    const pathName = Object.values(paths).find( path => path === window.location.pathname);
    body.style.display = 'block';

    hideSpiner();

    switch (pathName) {
        case paths.home:
            const token = getToken();

            if(!token) {
                window.location.href = routes.startPage;
            }

            await userProfile();
            showSidebar();
            profile_modal();
            await onloadPage();
            break;

        case paths.signIn_Up:
            switchBetweenSignInAndSignUp();
            signInHandler();
            signUpHandler();
            break;

        case paths.startPage:
            startPageStyle()
            break;

        default:
            break;
    }
};
