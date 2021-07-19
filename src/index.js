import './styles/style.scss';
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
        // case paths.sign_in:
        //     signInHandler();
        //     break;
        // case paths.sign_up:
        //     signUpHandler();
        //     break;
        // default:
        //     break;
    }
};
