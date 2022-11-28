import { LOCAL_STORAGE_KEY } from "../../consts";
import { USER } from "../types";

const { TOKEN, USER_DATA } = LOCAL_STORAGE_KEY;

// Initializer
export const initUserFromStorage = async (dispatch) => {
    const saved = localStorage.getItem(USER_DATA);
    const token = localStorage.getItem(TOKEN);
    if (token === '' || token === null) {
        return;
    }

    try {
        const parsed = JSON.parse(saved);
        dispatch({ type: USER.SET_USER_DATA, payload: parsed });
        dispatch({ type: USER.SET_TOKEN, payload: token });
    } catch { }
};
