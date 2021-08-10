import { signUp } from '../../api/api-handlers';
import { checkValidName, checkValidPassword, checkValidEmail } from '../../shared/validators';
import { errorText } from '../../shared/constants/errorText';

export const signUpHandler = () => {
    const signUpForm = document.querySelector('.container__forms_signin-signup-form.sign-up-form');
    const nameInput = document.getElementById('usernameSignUp');
    const emailInput = document.getElementById('emailSignUp');
    const password1Input = document.getElementById('passwordSignUp_1');
    const password2Input = document.getElementById('passwordSignUp_2');
    const signUpBtn = document.querySelector('#signUp');
    const inputErrorNameText = document.getElementById('inputErrorName');
    const inputErrorEmailText = document.getElementById('inputErrorEmailSignUp');
    const inputErrorPassword1Text = document.getElementById('inputErrorPassword1');
    const inputErrorPassword2Text = document.getElementById('inputErrorPassword2');
    const signUpFormFields = {
        loginName: {
            isValid: false
        },
        email: {
            isValid: false
        },
        password1: {
            isValid: false
        },
        password2: {
            isValid: false
        },
    }

    signUpBtn.setAttribute('disabled', true);

    signUpForm.addEventListener('submit', event => {
        event.preventDefault();

        const user = {
            loginName: nameInput.value,
            email: emailInput.value,
            password: password1Input.value
        }

        signUp( user )
        signUpForm.reset();
    });

    const checkFormValid = () => {
        const isFormValid = Object.values(signUpFormFields).every(value => value.isValid );
        isFormValid ? signUpBtn.removeAttribute('disabled') : signUpBtn.setAttribute('disabled', true);
    };

    nameInput.oninput = () => {
        if (checkValidName(nameInput.value)) {
            signUpFormFields.loginName.isValid = true;
            inputErrorNameText.innerText = '';
        } else {
            signUpFormFields.loginName.isValid = false;
            inputErrorNameText.innerText = errorText.validLoginText;
        }

        checkFormValid();
    };

    password1Input.oninput = () => {
        if (checkValidPassword(password1Input.value)) {
            if ( password2Input.value && (password1Input.value !== password2Input.value)) {
                signUpFormFields.password2.isValid = false;
                inputErrorPassword2Text.innerText = errorText.repeatPasswordText;
            } else {
                signUpFormFields.password1.isValid = true;
                inputErrorPassword1Text.innerText = '';
            }
        } else {
            signUpFormFields.password1.isValid = false;
            inputErrorPassword1Text.innerText = errorText.validPasswordText;
        }

        checkFormValid();

        if (password1Input.value.length > 25) {
            password1Input.style.fontSize = '15px';
        } else {
            password1Input.style.fontSize = '20px';
        }
    };

    password2Input.oninput = () => {
        if (password1Input.value === password2Input.value) {
            signUpFormFields.password2.isValid = true;
            inputErrorPassword2Text.innerText = '';
        } else {
            signUpFormFields.password2.isValid = false;
            inputErrorPassword2Text.innerText = errorText.repeatPasswordText;
        }

        checkFormValid();

        if (password2Input.value.length > 25) {
            password2Input.style.fontSize = '15px';
        } else {
            password2Input.style.fontSize = '20px';
        }
    };

    emailInput.oninput = () => {
        if (checkValidEmail(emailInput.value)) {
            signUpFormFields.email.isValid = true;
            inputErrorEmailText.innerText = '';
        } else {
            signUpFormFields.email.isValid = false;
            inputErrorEmailText.innerText = errorText.validEmailText;
        }

        checkFormValid();
    };
};
