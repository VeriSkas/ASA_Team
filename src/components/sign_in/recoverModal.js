import { passwordRecovery } from '../../api/api-handlers';
import { errorText } from '../../shared/constants/errorText';
import { checkValidEmail } from '../../shared/validators';

export const modal = () => {
    const modalRecoverPassword = document.querySelector('.modalRecoverPassword');
    const closeModalBtn = document.querySelector('.closeModal');
    const forgotPasswordBtn = document.querySelector('.forgotPassword');
    const inputRecoverEmail = document.querySelector('.modalRecoverPassword_wrapper_main_content-input');
    const recoverEmailBtn = document.querySelector('.modalRecoverPassword_wrapper_main_footer-btn');
    const inputErrorEmailText = document.querySelector('#inputErrorRecoverEmail');

    forgotPasswordBtn.onclick = () => {
        modalRecoverPassword.classList.add('open');
    }

    closeModalBtn.onclick = () => {
        inputRecoverEmail.value = null;
        modalRecoverPassword.classList.remove('open');
    }

    recoverEmailBtn.setAttribute('disabled', true);

    inputRecoverEmail.oninput = () => {
        if (checkValidEmail(inputRecoverEmail.value)) {
            inputErrorEmailText.innerText = '';
            recoverEmailBtn.removeAttribute('disabled');
        } else {
            inputErrorEmailText.innerText = errorText.validEmailText;
            recoverEmailBtn.setAttribute('disabled', true);
        };
    }

    recoverEmailBtn.onclick = () => {
        passwordRecovery(inputRecoverEmail.value);
    }
};
