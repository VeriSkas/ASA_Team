import { errorText } from './constants/errorText';

export const showErrorNotification = error => {
    const notification = document.createElement('div');
    const body = document.getElementsByTagName('body')[0];
    notification.innerText =`${errorText.notificationText}:
        ${error.response.data.error.message}`;
    notification.className = 'error_notification';
    body.append(notification);
    setTimeout(() => notification.style.display = 'none', 5000);
};
