import * as Types from '../constants/ActionTypes';
var initialState = {};

const searchUser = (state = initialState, action) => {
    switch(action.type){
        case Types.SEARCH_INPUT_USER:
            state = action.searchInput;
            return { ...state };
        default: return state;
    }
};

export default searchUser;