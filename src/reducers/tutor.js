import * as Types from './../constants/ActionTypes';
var initialState = {};

const tutor = (state = initialState, action) => {
      switch(action.type) {
            case Types.FETCH_TUTORS:
                  state = action.tutors.result;
                  return {...state};
            case Types.SEARCH_TUTOR:
                  state = action.tutors.result;
                  return { ...state};
            case Types.FETCH_TUTOR_DETAIL:
                  state = action.tutor.result;
                  return {...state};
            
            default: return state; 
      }
};

export default tutor;