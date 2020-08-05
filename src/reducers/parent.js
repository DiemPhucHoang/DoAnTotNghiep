import * as Types from '../constants/ActionTypes';
var initialState = {};

const parent = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_PARENT_CLASS:
            state = action.parent.result;
            return { ...state };
        
        
        default: return state;
    }
};

export default parent;