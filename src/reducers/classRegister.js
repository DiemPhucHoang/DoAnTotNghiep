import * as Types from './../constants/ActionTypes';
var initialState = [];

const classRegister = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_CLASS_REGISTER:
            state = action.classRegister.result;
            return [...state];
      case Types.CHANGE_STATUS_CLASS_REGISTER:
        state.map(
            item => (item.idRegister === action.idRegister ? 
            Object.assign(item, { status: "Đã hủy" }) : item))
            return [...state];
        default: return [...state];
    }
};

export default classRegister;