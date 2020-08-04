import * as Types from './../constants/ActionTypes';
var initialState = {};

const tutorRegisterClass = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_TUTOR_REGISTER_CLASS:
            state = action.tutorRegister.result;
            return { ...state };
        case Types.TUTOR_REGISTER_CLASS:
            state.content.push(action.registerInfo.result);
            return { ...state };
        case Types.FETCH_ALL_TUTOR_REGISTER_CLASSES:
            state = action.tutorRegisters.result;
            return { ...state };
        case Types.FETCH_TUTOR_REGISTER_BY_CLASS:
            state = action.tutorRegisters.result;
            return { ...state };
        default: return { ...state };
    }
};

export default tutorRegisterClass;