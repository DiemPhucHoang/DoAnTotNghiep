import * as Types from './../constants/ActionTypes';
var initialState = [];

var findIndex = (tutor, id) => {
    var result = -1;
    tutor.forEach((tutor, index) => {
          if(tutor.id  === id) {
                result = index;
          }
    });
    return result;
}
const chooseTutor = (state = initialState, action) => {
    var index = -1;
      var {id} = action;
    switch(action.type){
        case Types.CHOOSE_TUTOR:
           state.push(action.tutor.result);
            const arr = [...state];
            const filteredArr = arr.reduce((acc, current) => {
                const x = acc.find(item => item.tutorInfoVO.id === current.tutorInfoVO.id);
                if (!x) {
                  return acc.concat([current]);
                } else {
                  return acc;
                }
              }, []);
              return filteredArr;
        case Types.DELETE_CHOOSE_TUTOR:
            index = findIndex(state, id);
            state.splice(index, 1);
            return [...state];
        case Types.DELETE_ALL_CHOOSE_TUTOR:
            state.splice(0, state.length)
            return state;
        default: return [...state];
    }
};

export default chooseTutor;