export const showSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarBtn = document.querySelector('.bx-menu');

    sidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('close');
    });
};
