import { combineReducers } from 'redux';
import global from './global.reducer';
import user from './user.reducer';
import token from './token.reducer';

export default combineReducers({
    global,
    token,
    user
});
