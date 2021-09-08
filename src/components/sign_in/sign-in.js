import { signIn } from '../../api/api-handlers';
import { errorText } from '../../shared/constants/errorText';
import { checkValidPassword, checkValidEmail } from '../../shared/validators';
import { modal } from './recoverModal';

export const signInHandler = () => {
    const signIn_form = document.querySelector('.container__forms_signin-signup-form.sign-in-form');
    const authEmail = document.querySelector('#emailSignIn');
    const authPassword = document.querySelector('#passwordSignIn');
    const inputErrorEmailText = document.querySelector('#inputErrorEmail');
    const inputErrorPasswordText = document.querySelector('#inputErrorPassword');
    const authBtn = document.querySelector('#signIn');

    const authFormFields = {
        email: {
            isValid: false
        },
        password: {
            isValid: true
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
        if (authPassword.value.length > 25) {
            authPassword.style.fontSize = '15px';
        } else {
            authPassword.style.fontSize = '20px';
        }
    };

    authEmail.oninput = () => {
        if (checkValidEmail(authEmail.value)) {
            authFormFields.email.isValid = true;
            inputErrorEmailText.innerText = '';
        } else {
            authFormFields.email.isValid = false;
            inputErrorEmailText.innerText = errorText.validEmailText;
        }
        checkFormValid();
    };

    modal();
};
