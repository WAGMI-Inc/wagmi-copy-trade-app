import { useDispatch, useSelector } from "react-redux";
import { TOKEN } from "../types";
import { TokenService } from "services/token.service";

export const useToken = () => {
    const dispatch = useDispatch();
    const { tokens, tokenOptions, selectedAnalytic } = useSelector(({ token }) => token);

    const getAllTokens = async () => {
        try {
            const result = await TokenService.getAllTokens();
            dispatch({ type: TOKEN.SET_TOKENS, payload: result.data });
            return true;
        } catch ({ response, message }) {
            return false;
        }
    }

    const getTokenOptions = async () => {
        try {
            const result = await TokenService.getAllTokens();
            dispatch({ type: TOKEN.SET_TOKENS, payload: result.data });
            let options = [];
            result.data.forEach(item => {
                options.push({ value: item.token_id, label: item.name, image: item.image });
            });
            dispatch({ type: TOKEN.SET_TOKEN_OPTIONS, payload: options });
            dispatch({ type: TOKEN.SET_SELECTED_ANALYTIC, payload: result.data[0] });
            return true;
        } catch ({ response, message }) {
            return false;
        }
    }

    const getSelectedAnalytic = async (tokenId) => {
        try {
            const result = await TokenService.getTokenById({ token_id: tokenId });
            console.log(result.data);
            dispatch({ type: TOKEN.SET_SELECTED_ANALYTIC, payload: result.data });
            return true;
        } catch ({ response, message }) {
            return false;
        }
    }

    return {
        tokens,
        tokenOptions,
        selectedAnalytic,
        getAllTokens,
        getTokenOptions,
        getSelectedAnalytic
    };
};
