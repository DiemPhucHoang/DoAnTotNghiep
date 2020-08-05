import * as Types from '../constants/ActionTypes';
var initialState = {};

const parentRegisterTutor = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_ALL_PARENT_REGISTER_TUTOR:
            state = action.parentRegisters.result;
            return { ...state };
        case Types.FETCH_TUTOR_DETAIL_BY_CLASS:
            state = action.parentRegisters.result;
            return { ...state };
        default: return { ...state };
    }
};

export default parentRegisterTutor;