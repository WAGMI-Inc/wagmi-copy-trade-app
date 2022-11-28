import { TOKEN } from '../types';

const initialState = {
    tokens: [],
    tokenOptions: [],
    selectedAnalytic: {}
};

export default function tokenReducer(state = initialState, { type, payload }) {
    switch (type) {
        case TOKEN.SET_TOKENS:
            return {
                ...state,
                tokens: payload,
            };
        case TOKEN.SET_TOKEN_OPTIONS:
            return {
                ...state,
                tokenOptions: payload
            }
        case TOKEN.SET_SELECTED_ANALYTIC:
            return {
                ...state,
                selectedAnalytic: payload
            }
        default:
            return state;
    }
}
