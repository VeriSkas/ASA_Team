
export const profile_modal = () => {
    const openModalBtn = document.querySelector('.wrapper__content_sidebar-navLinks-link_profile-photo');
    const profileModal = document.querySelector('.modal');
    const closeModalBtn = document.querySelector('.closeModal');

    openModalBtn.onclick = () => {
        profileModal.classList.add('open');
    }

    closeModalBtn.onclick = () => {
        profileModal.classList.remove('open');
    }
};
