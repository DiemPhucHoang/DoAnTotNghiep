import * as Types from '../constants/ActionTypes';
var initialState = {};

const invoices = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_ALL_INVOICE:
            state = action.invoices.result;
            return { ...state };
        
        default: return state;
    }
};

export default invoices;