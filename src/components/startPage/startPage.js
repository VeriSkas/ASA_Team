import { routes } from '../../shared/constants/routes';

export const startPageStyle = () => {
    const bgImg = document.getElementById('bg');
    const typewriter = document.querySelector('#typewriter');
    const openBook = document.querySelector('#openBook');
    const book = document.querySelector('#book');
    const eraser = document.querySelector('#eraser');
    const glasses = document.querySelector('#glasses');
    const coffie = document.querySelector('#coffie');
    const bottomImg = document.querySelector('#bottomImg');
    const textTitle = document.querySelector('.main_startPage_header-text');
    const startPageBtn = document.querySelector('.startPageBtn');

    window.addEventListener('scroll', () => {
        let value = window.scrollY;

        bgImg.style.top = `${value*0.15}px`;
        typewriter.style.top = `-${value*0.8}px`;
        openBook.style.left = `${value*0.8}px`;
        book.style.left = `-${value*0.8}px`;
        glasses.style.top = `${value*0.8}px`;
        glasses.style.left = `${value*0.5}px`;
        eraser.style.top = `${value*0.5}px`;
        coffie.style.top = `${value*0.8}px`;
        coffie.style.left = `-${value*0.15}px`;
        bottomImg.style.top = `${value*0.15}px`;
        textTitle.style.top = `${value*0.8}px`;
    });

    startPageBtn.onclick = () => {
        window.location.href = routes.signIn_Up;
    }
}
