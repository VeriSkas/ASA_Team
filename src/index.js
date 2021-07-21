import './styles/style.scss';
import { switchBetweenSignInAndSignUp } from './components/signIn_signUp/signIn-Up';
import { showSidebar } from './dom-handlers/sidebar';
import { routes, paths } from './shared/constants/routes';
import { getToken } from './shared/ls-service';
import { renderTodos, todoHandler } from './dom-handlers/todosRender';
import { signInHandler } from './components/sign_in/sign-in';
import { signUpHandler } from './components/sign_up/sign-up';
import { todosElementHandler } from './dom-handlers/todoElement';

window.onload = () => {
    const pathName = Object.values(paths).find( path => (path === window.location.pathname));

    switch (pathName) {
        case paths.home:
            const token = getToken();
            if(!token) {
                window.location.href = routes.signIn_Up;
            }

            renderTodos();
            todoHandler();
            todosElementHandler();
            showSidebar();
            break;
        case paths.signIn_Up:
            switchBetweenSignInAndSignUp();
            signInHandler();
            signUpHandler();
            break;
        default:
            break;
    }
};
