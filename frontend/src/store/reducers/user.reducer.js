import { USER } from '../types';

const initialState = {
    portfolioData: {
        labels: [],
        values: []
    },
    user: {},
};

export default function userReducer(state = initialState, { type, payload }) {
    switch (type) {
        case USER.SET_PORTFOLIO_DATA:
            return {
                ...state,
                portfolioData: payload,
            };
        case USER.SET_USER_DATA:
            return {
                ...state,
                user: payload
            }
        default:
            return state;
    }
}
