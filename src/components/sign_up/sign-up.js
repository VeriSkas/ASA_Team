import { signUp } from '../../api/api-handlers';
import { checkValidName, checkValidPassword, checkValidEmail } from '../../shared/validators';
import { errorText } from '../../shared/constants/errorText';

export const signUpHandler = () => {
    const signUpForm = document.querySelector('.components__wrapper_signUp-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const password1Input = document.getElementById('password1');
    const password2Input = document.getElementById('password2');
    const signUpBtn = document.querySelector('.signUpBtn');
    const inputErrorNameText = document.getElementById('inputErrorName');
    const inputErrorEmailText = document.getElementById('inputErrorEmail');
    const inputErrorPassword1Text = document.getElementById('inputErrorPassword1');
    const inputErrorPassword2Text = document.getElementById('inputErrorPassword2');
    const signUpFormFields = {
        name: {
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
        const name = nameInput.value;
        const email = emailInput.value;
        const password1 = password1Input.value;
        event.preventDefault();
        signUp(name, email, password1);
    });

    const checkFormValid = () => {
        const isFormValid = Object.values(signUpFormFields).every(value => value.isValid );
        isFormValid ? signUpBtn.removeAttribute('disabled') : signUpBtn.setAttribute('disabled', true);
    };

    nameInput.oninput = () => {
        if (checkValidName(nameInput.value)) {
            signUpFormFields.name.isValid = true;
            inputErrorNameText.innerText = '';
        } else {
            signUpFormFields.name.isValid = false;
            inputErrorNameText.innerText = errorText.validLoginText;
        }

        checkFormValid();
    };

    password1Input.oninput = () => {
        if (checkValidPassword(password1Input.value)) {
            signUpFormFields.password1.isValid = true;
            inputErrorPassword1Text.innerText = '';
        } else {
            signUpFormFields.password1.isValid = false;
            inputErrorPassword1Text.innerText = errorText.validPasswordText;
        }

        checkFormValid();
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
