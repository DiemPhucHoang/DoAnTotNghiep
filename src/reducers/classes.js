import * as Types from './../constants/ActionTypes';
var initialState = {};

const classes = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_CLASSES:
            state = action.classes.result;
            return { ...state };
        case Types.SEARCH_CLASS:
            state = action.classes.result;
            return { ...state };
        case Types.FETCH_CLASS_DETAIL:
            state = action.classes.result;
            return {...state};
        //   case Types.CREATE_CLASS:
        //         let state2 = action.classes.result.content;
        //         state2.push(action.classes.result);
        //         return {...state};

        default: return state;
    }
};

export default classes;