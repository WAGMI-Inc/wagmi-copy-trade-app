// import delay from "../utils/delay";
import { apiUrls } from '../consts';
import { axiosService } from '.';

export const UserService = (function () {
    const login = async (payload) => {
        return axiosService.post(apiUrls.LOGIN, payload);
    };

    const signup = async (payload) => {
        return axiosService.post(apiUrls.SIGNUP, payload);
    };

    const logout = async () => {
        return axiosService.post(apiUrls.LOGOUT);
    };

    const changePassword = async (payload) => {
        // return axiosService.post(apiUrls.CHANGE_PASSWORD, payload);
    };

    const resendVerifyLink = async () => {
        return axiosService.post(apiUrls.RESEND_VERIFY_LINK);
    }

    const getUserInfo = async () => {
        return axiosService.get(apiUrls.GET_USER_INFO);
    }

    const sendResetEmail = async (payload) => {
        return axiosService.post(apiUrls.SEND_RESET_EMAIL, payload);
    }

    const resetAuthPassword = async (payload) => {
        return axiosService.post(apiUrls.RESET_AUTH_PASSWORD, payload);
    }

    const getDepositWallet = async () => {
        return axiosService.get(apiUrls.GET_DEPOSIT_WALLET);
    }

    const getUserTransactions = async () => {
        return axiosService.get(apiUrls.GET_USER_TRANSACTIONS);
    }

    const getUserAutoSchedule = async () => {
        return axiosService.get(apiUrls.GET_USER_AUTO_SCHEDULE);
    }

    const setAutoSchedule = async (amount) => {
        return axiosService.post(apiUrls.SET_AUTO_SCHEDULE, { amount: amount });
    }

    const removeAutoSchedule = async () => {
        return axiosService.get(apiUrls.REMOVE_AUTO_SCHEDULE);
    }

    return {
        login,
        signup,
        changePassword,
        logout,
        resendVerifyLink,
        getUserInfo,
        sendResetEmail,
        resetAuthPassword,
        getDepositWallet,
        getUserTransactions,
        getUserAutoSchedule,
        setAutoSchedule,
        removeAutoSchedule
    };
})();
