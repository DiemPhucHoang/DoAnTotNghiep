import * as Types from '../constants/ActionTypes';
var initialState = {};

const searchTutor = (state = initialState, action) => {
    switch(action.type){
        case Types.SEARCH_INPUT:
           state = action.searchInput;
            return {...state};
        case Types.DELETE_SEARCH_INPUT_TUTOR:
            state = {};
            return state;
        default: return state;
    }
};

export default searchTutor;