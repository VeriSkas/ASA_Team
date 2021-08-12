export const checkMediaQuery = () => {
    const sidebar = document.querySelector('.wrapper__content_sidebar');

    if (window.innerWidth < 1300) {
        sidebar.classList.add('close');
    } else {
        sidebar.classList.remove('close');
    }
}

