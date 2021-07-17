import { signIn } from '../../api/api-handlers';
import { errorText } from '../../shared/constants/errorText';
import { checkValidPassword, checkValidEmail } from '../../shared/validators';
import { setToken } from '../../shared/ls-service';
import { routes } from '../../shared/constants/routes';

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
        signIn(email, password)
            .then( result => {
                if(result) {
                    const token = result.idToken;
                    setToken(token);
                    window.location.href = routes.home;
                    return token;
                }
            })
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
            inputErrorPasswordText.innerText = errorText.validPasswordText;
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
            inputErrorEmailText.innerText = errorText.validEmailText;
        }
        checkFormValid();
    };

    authEmail.onblur = () => {
        inputErrorEmailText.innerText = '';
    };

};
