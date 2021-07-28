import './styles/style.scss';
import { switchBetweenSignInAndSignUp } from './components/signIn_signUp/signIn-Up';
import { showSidebar } from './dom-handlers/sidebar';
import { routes, paths } from './shared/constants/routes';
import { getToken, setTitleLS } from './shared/ls-service';
import { renderTodos, todoHandler } from './dom-handlers/todosRender';
import { importantTasks_render } from './dom-handlers/important_todos';
import { completedTasks_render } from './dom-handlers/completed_todos';
import { deletedTasks_render } from './dom-handlers/deleted_todos';
import { tasks_render } from './dom-handlers/tasks';
import { signInHandler } from './components/sign_in/sign-in';
import { signUpHandler } from './components/sign_up/sign-up';
import { todosElementHandler } from './dom-handlers/todoElement';
import { getAllTodos, getTodos } from './api/api-handlers';

window.onload = () => {
    const pathName = Object.values(paths).find( path => (path === window.location.pathname));

    switch (pathName) {
        case paths.home:
            const token = getToken();

            if(!token) {
                window.location.href = routes.signIn_Up;
            }
            getAllTodos();
            // getTodos('tasks');
            tasks_render();
            importantTasks_render();
            completedTasks_render();
            deletedTasks_render();
            showSidebar();
            todosElementHandler();
            setTitleLS('tasks');
            renderTodos();
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
