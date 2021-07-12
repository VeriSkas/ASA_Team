import { signIn } from '../../api/api-handlers';
import { checkValidPassword, checkValidEmail } from '../../shared/validators';

export const signInHandler = () => {
    const signIn_form = document.querySelector('.components__wrapper_auth-form');
    const authEmail = document.querySelector('.inputEmail_input');
    const authPassword = document.querySelector('.inputPassword_input');
    const inputErrorEmailText = document.querySelector('#inputErrorEmail');
    const inputErrorPasswordText = document.querySelector('#inputErrorPassword');
    const authBtn = document.querySelector('.auth-form-Btn');

    const authFormFields = {
        email: {
            isValid: false
        },
        password: {
            isValid: false
        }
    }

    authBtn.setAttribute('disabled', true);

    signIn_form.addEventListener('submit', event => {
        const email = authEmail.value;
        const password = authPassword.value;
        event.preventDefault();
        signIn(email, password);
    });

    const checkFormValid = () => {
        const isFormValid = Object.values(authFormFields).every(value => value.isValid );
        isFormValid ? authBtn.removeAttribute('disabled') : authBtn.setAttribute('disabled', true);
    };

    authPassword.oninput = () => {
        if (checkValidPassword(authPassword.value)) {
            authFormFields.password.isValid = true;
            inputErrorPasswordText.innerText = '';
        } else {
            authFormFields.password.isValid = false;
            inputErrorPasswordText.innerText = 'Password must be at least 6 characters';
        }
        checkFormValid();
    };

    authPassword.onblur = () => {
        inputErrorPasswordText.innerText = '';
    };

    authEmail.oninput = () => {
        if (checkValidEmail(authEmail.value)) {
            authFormFields.email.isValid = true;
            inputErrorEmailText.innerText = '';
        } else {
            authFormFields.email.isValid = false;
            inputErrorEmailText.innerText = 'Invalid email entered';
        }
        checkFormValid();
    };

    authEmail.onblur = () => {
        inputErrorEmailText.innerText = '';
    };

};
