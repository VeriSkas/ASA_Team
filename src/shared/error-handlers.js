import { errorText } from './constants/errorText';

export const showErrorNotification = error => {
    const notification = document.createElement('div');
    const body = document.getElementsByTagName('body')[0];

    if(error.response) {
        notification.innerText =`${errorText.notificationText}:
            ${error.response.data.error.message}`;
        notification.className = 'error_notification';
    } else if (error.message) {
        notification.innerText =`${error.message}`;
        notification.className = 'error_notification signUp';
    } else {
        notification.innerText =`${error}`;
        notification.className = 'error_notification';
    }

    body.append(notification);
    setTimeout(() => notification.style.display = 'none', 10000);
};
