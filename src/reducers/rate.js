import * as Types from './../constants/ActionTypes';
var initialState = [];

const rate = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_RATE:
            state = action.rates.result;
            return [...state];
        default: return [...state];
    }
};

export default rate;