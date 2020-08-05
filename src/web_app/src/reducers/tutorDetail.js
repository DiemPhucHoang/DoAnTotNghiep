import * as Types from './../constants/ActionTypes';
var initialState = {};

const tutorDetail = (state = initialState, action) => {
      switch(action.type) {
            case Types.FETCH_TUTOR_BY_ID_USER:
                  state = action.tutor.result;
                  return {...state};
            case Types.CHANGE_INFO_TUTOR:
                  state = action.tutor.result;
                  return {...state};
            case Types.CREATE_TUTOR:
                  state = action.tutor.result;
                  return {...state};
            default: return state; 
      }
};

export default tutorDetail;