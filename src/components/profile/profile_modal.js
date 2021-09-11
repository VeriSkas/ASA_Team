import { updateUser, uploadPhoto } from "../../api/api-handlers";
import { errorText, textConfirm } from "../../shared/constants/errorText";
import { textInner } from "../../shared/constants/textFile";
import { getPersonalData, setPersonalData } from "../../shared/ls-service";
import { checkValidName, checkValidPhotoFormat } from "../../shared/validators";

export const profile_modal = () => {
    const openModalBtn = document.querySelector('.wrapper__content_sidebar-navLinks-link_profile-photo');
    const profileModal = document.querySelector('.modal');
    const closeModalBtn = document.querySelector('.closeModal');
    const photoInput = document.querySelector('#input__file');
    const photoInputInner = document.querySelector('.input__file-label-text');
    const saveUpdateBtn = document.querySelector('.modalProfile_wrapper_main_footer-btn')
    const loginUpdateInput = document.querySelector('.modalProfile_wrapper_main_content-input');
    const errorLoginText = document.querySelector('#inputLoginUpdateErrorText');
    const errorImgInput = document.querySelector('#inputImgUpdateErrorText');
    const userInfo = getPersonalData();

    loginUpdateInput.value = userInfo.loginName;
    photoInputInner.innerText = textInner.changePhoto;
    photoInput.value = null;

    saveUpdateBtn.setAttribute('disabled', true);

    openModalBtn.onclick = () => {
        profileModal.classList.add('open');
    }

    closeModalBtn.onclick = () => {
        profileModal.classList.remove('open');
    }

    loginUpdateInput.oninput = () => {
        if (checkValidName(loginUpdateInput.value)) {
            errorLoginText.innerText = '';
            saveUpdateBtn.removeAttribute('disabled');
        } else {
            errorLoginText.innerText = errorText.validLoginText;
            saveUpdateBtn.setAttribute('disabled', true);
        }
    }

    saveUpdateBtn.onclick = () => {
        const warming = confirm(textConfirm.updateProfile);
        if (warming) {
            if (loginUpdateInput.value) {
                userInfo.loginName = loginUpdateInput.value;
                setPersonalData(userInfo);
                updateUser(userInfo);
            }
        } else {
            loginUpdateInput.value = userInfo.loginName;
        }

        saveUpdateBtn.setAttribute('disabled', true);
    }

    photoInput.oninput = event => {
        const minSize = 20000;
        const maxSize = 5000000;
        const sizePhoto = event.target.files[0].size;
        const namePhoto = event.target.files[0].name;
        let imgName = null;
        photoInputInner.innerText = photoInput.value;

        if (sizePhoto > maxSize || sizePhoto < minSize) {
            errorImgInput.innerText = errorText.validSizePhoto;
        } else if ( !checkValidPhotoFormat(namePhoto)) {
            errorImgInput.innerText = errorText.validFormatsPhoto;
        } else {
            imgName = photoInput.value;
            errorImgInput.innerText = '';
            saveUpdateBtn.removeAttribute('disabled');
        }

        saveUpdateBtn.onclick = () => {
            const warming = confirm(textConfirm.updateProfile);

            if (warming) {
                if (loginUpdateInput.value && imgName) {
                    userInfo.loginName = loginUpdateInput.value;
                    setPersonalData(userInfo);
                    uploadPhoto(event, imgName);
                } else if (imgName) {
                    uploadPhoto(event, imgName);
                }
            } else {
                loginUpdateInput.value = userInfo.loginName;
            }

            photoInputInner.innerText = textInner.changePhoto;
            saveUpdateBtn.setAttribute('disabled', true);
        }
    }

    refreshPhoto();
};

export const refreshPhoto = () => {
    const modalPhotoBlock = document.querySelector('.modalProfile_wrapper_main_header-photo');
    const userPhotoUrl = getPersonalData().photo;

    userPhotoUrl ? modalPhotoBlock.style.backgroundImage = `url("${userPhotoUrl}")` :
        modalPhotoBlock.style.backgroundImage = 'url("/src/img/User-Default.jpg")';
};
