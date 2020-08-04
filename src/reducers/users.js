import * as Types from '../constants/ActionTypes';
var initialState = {};


const users = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_USERS:
            state = action.users.result;
            return { ...state };
        case Types.FETCH_USER:
            state = action.users.result;
            return { ...state };
        case Types.SEARCH_USER:
            state = action.users.result;
            return { ...state };
        
        default: return state;
    }
};

export default users;