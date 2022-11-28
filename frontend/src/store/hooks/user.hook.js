import { useDispatch, useSelector } from "react-redux";
import { USER } from "../types";
import moment from "moment";
import { UserService } from "services";
import { LOCAL_STORAGE_KEY } from "consts";
import { toast } from "react-toastify";

const { TOKEN, USER_DATA } = LOCAL_STORAGE_KEY;

export const useUser = () => {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector(({ user }) => user);

    const getPortfolioData = async (value) => {
        try {
            let labels = [];
            let values = [];

            let startVal = new Date(moment(new Date()).subtract(1, 'week'));
            if (value === 1)
                startVal = new Date(moment(new Date()).subtract(1, 'month'));
            else if (value === 2)
                startVal = new Date(moment(new Date()).subtract(3, 'month'));
            else if (value === 3)
                startVal = new Date(moment(new Date()).subtract(1, 'year'));
            else if (value === 4)
                startVal = new Date('2017/01/01');

            for (let i = Date.parse(startVal); i <= Date.parse(new Date()); i += 1000 * 60 * 60 * 24) {
                labels.push(moment(i).format("YYYY/MM/DD"));
                let value = 0;
                if (values.length)
                    value = values[values.length - 1] + Math.round(510 + Math.random() * (-1000));
                else
                    value = 100;
                if (value < 0)
                    value += 1000;
                values.push(value);
            }
            dispatch({
                type: USER.SET_PORTFOLIO_DATA,
                payload: { labels: labels, values: values }
            });
            return true;
        } catch ({ response, message }) {
            return false;
        }
    }

    const login = async (payload) => {
        try {
            const result = await UserService.login(payload);
            dispatch({ type: USER.SET_TOKEN, payload: result.data.accessToken });
            dispatch({ type: USER.SET_USER_DATA, payload: result.data.user_data });
            localStorage.setItem(TOKEN, result.data.accessToken);
            localStorage.setItem(USER_DATA, JSON.stringify(result.data.user_data));
            toast.success('Successfully logged in!');
            return true;
        } catch ({ response, message }) {
            if (response)
                toast.error(response.data.message);
            return false;
        }
    }

    const signup = async (payload) => {
        try {
            const result = await UserService.signup(payload);
            dispatch({ type: USER.SET_TOKEN, payload: result.data.accessToken });
            dispatch({ type: USER.SET_USER_DATA, payload: result.data.user_data });
            localStorage.setItem(TOKEN, result.data.accessToken);
            localStorage.setItem(USER_DATA, JSON.stringify(result.data.user_data));
            toast.success('Successfully signed up!');
            return true;
        } catch ({ response, message }) {
            if (response)
                toast.error(response.data.message);
            return false;
        }
    }

    const logOut = async () => {
        try {
            await UserService.logout();
            dispatch({ type: USER.SET_TOKEN, payload: "" });
            dispatch({ type: USER.SET_USER_DATA, payload: {} });
            localStorage.setItem(TOKEN, "");
            localStorage.setItem(USER_DATA, JSON.stringify({ full_name: '' }));
            return true;
        } catch ({ response, message }) {
            localStorage.setItem(TOKEN, "");
            localStorage.setItem(USER_DATA, JSON.stringify({ full_name: '' }));
            return false;
        }
    }


    return {
        portfolioData,
        getPortfolioData,
        login,
        logOut,
        signup
    };
};
