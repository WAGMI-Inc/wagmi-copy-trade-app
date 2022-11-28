// import delay from "../utils/delay";
import { apiUrls } from '../consts';
import { axiosService } from '.';

export const TokenService = (function () {
    const getAllTokens = async (payload) => {
        return axiosService.get(apiUrls.GET_ALL_TOKENS, payload);
    };

    const getTokenById = async (payload) => {
        return axiosService.post(apiUrls.GET_TOKEY_BY_ID, payload);
    }

    return {
        getAllTokens,
        getTokenById
    };
})();
