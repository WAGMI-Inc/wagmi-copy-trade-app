import { USER } from '../types';

const initialState = {
    portfolioData: {
        labels: [],
        values: []
    },
    user: {},
    userWallet: { balance: 0, address: '' },
    userTransactions: [],
    autoScheduleAmount: 0
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
        case USER.SET_WALLET_INFO:
            return {
                ...state,
                userWallet: payload
            }
        case USER.SET_USER_TRANSACTIONS:
            return {
                ...state,
                userTransactions: payload,
            }
        case USER.SET_AUTO_SCHEDULE:
            return {
                ...state,
                autoScheduleAmount: payload
            }
        default:
            return state;
    }
}
