export const switchBetweenSignInAndSignUp = () => {
    const signIn_btn = document.querySelector('#sign-in-btn');
    const signUp_btn = document.querySelector('#sign-up-btn');
    const container = document.querySelector('.container');
    const watchPasswordBtn = document.querySelectorAll('.bx-show-alt');
    const inputPassword = document.querySelectorAll('input[type=password]');

    signUp_btn.addEventListener('click', () => {
    	container.classList.add("sign-up-mode");
    });

    signIn_btn.addEventListener('click', () => {
      	container.classList.remove("sign-up-mode");
	});

    for (let i = 0, j = 0; i < watchPasswordBtn.length, j < inputPassword.length ; i++, j++) {
        watchPasswordBtn[i].onclick = () => {
            let clicked = watchPasswordBtn[i].getAttribute('clicked');
            watchPasswordBtn[i].setAttribute('clicked', false);
            if (!clicked) {
                inputPassword[j].setAttribute('type', 'text');
                watchPasswordBtn[i].setAttribute('clicked', true);
            } else {
                inputPassword[j].setAttribute('type', 'password');
                watchPasswordBtn[i].removeAttribute('clicked');
            }
        }
    }
};
