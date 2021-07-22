import { routes } from '../shared/constants/routes';
import { removeToken } from '../shared/ls-service';

export const showSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarBtn = document.querySelector('.bx-menu');
    const logOutBtn = document.getElementById('logOut');

    sidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('close');
    });

    logOutBtn.addEventListener('click', () => {
        window.location.href = routes.signIn_Up;
        removeToken();
    })
};

