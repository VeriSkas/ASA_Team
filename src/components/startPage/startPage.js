import { routes } from '../../shared/constants/routes';

export const startPageStyle = () => {
    const bgImg = document.getElementById('bg');
    const moonImg = document.getElementById('moon');
    const montainImg = document.getElementById('montain');
    const roadImg = document.getElementById('road');
    const textTitle = document.querySelector('.main_startPage_header-text');
    const startPageBtn = document.querySelector('.startPageBtn');

    window.addEventListener('scroll', () => {
        let value = window.scrollY;

        bgImg.style.top = `${value*0.5}px`;
        moonImg.style.top = `${-value*0.5}px`;
        montainImg.style.top = `${-value*0.15}px`;
        roadImg.style.top = `${value*0.15}px`;
        textTitle.style.top = `${value}px`;
    });

    startPageBtn.onclick = () => {
        window.location.href = routes.signIn_Up;
    }
}