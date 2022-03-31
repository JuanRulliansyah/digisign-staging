import {NotificationManager} from "react-notifications";

export const alertNotification = (type, message, title, timeout, className) => {
    const cName = className || 'filled';
    switch (type) {
        case 'info':
            NotificationManager.info(message, title, timeout, null, null, cName);
            break;
        case 'success':
            NotificationManager.success(message, title, timeout, null, null, cName);
            break;
        case 'warning':
            NotificationManager.warning(message, title, timeout, null, null, cName);
            break;
        case 'error':
            NotificationManager.error(message, title, timeout, null, null, cName);
            break;
        default:
            NotificationManager.info(message, title, timeout, null, null, cName);
            break;
    }
};

export const alertAPIError = () => {
    NotificationManager.error(
        'Could not connect to API',
        'Error Occurred',
        5000,
        null,
        null,
        'filled');
}