import * as Types from '../constants/ActionTypes';
var initialState = {};

const searchClass = (state = initialState, action) => {
    switch(action.type){
        case Types.SEARCH_INPUT_CLASS:
           state = action.searchInput;
            return {...state};
        default: return state;
    }
};

export default searchClass;