import { ref } from 'vue';

export function useAlert() {
    const showAlert = ref(false);
    const alertType = ref('');
    const alertMessage = ref('');

    function showAlertMessage(type, message) {
        alertType.value = type;
        alertMessage.value = message;
        showAlert.value = true;
        hideAlertAfterDelay();
    }

    function dismissAlert() {
        showAlert.value = false;
    }

    const hideAlertAfterDelay = () => {
        setTimeout(() => {
            dismissAlert();
        }, 3000); // 3s
    };


    return {
        showAlert,
        alertType,
        alertMessage,
        showAlertMessage,
        dismissAlert
    };
}