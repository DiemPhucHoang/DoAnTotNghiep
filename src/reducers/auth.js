import * as Types from './../constants/ActionTypes';
import isEmpty from 'lodash/isEmpty';

const initialState = {
    isAuthenticated: false,
    user: {}
}

const auth = (state = initialState, action = {}) => {
    switch (action.type) {
        case Types.SET_CURRENT_USER:
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user.result
            };
        default:
            return state;
    }
};
export default auth;