import * as Types from './../constants/ActionTypes';
var initialState = [];

const tutorRegisterClass = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_TUTOR_REGISTER_CLASS:
            state = action.tutorRegister.result;
            return [...state];
        case Types.TUTOR_REGISTER_CLASS:
            state.push(action.registerInfo.result);
            return [...state];
        default: return [...state];
    }
};

export default tutorRegisterClass;