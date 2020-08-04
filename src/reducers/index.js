import { combineReducers } from 'redux';
import tutor from './tutor';
import searchTutor from './searchTutor';
import chooseTutor from './chooseTutor';
import classes from './classes';
import searchClass from './searchClass';
import auth from './auth';
import tutorRegisterClass from './tutorRegisterClass';
import classRegister from './classRegister';
import tutorDetail from './tutorDetail';
import rate from './rate';
import { DESTROY_SESSION } from "../constants/ActionTypes";

const appReducers = combineReducers ({
      auth,
      tutor,
      tutorDetail,
      searchTutor,
      chooseTutor,
      classes,
      searchClass,
      tutorRegisterClass,
      classRegister,
      rate
});

const rootReducer = (state, action) => {   
      // Clear all data in redux store to initial.
      if(action.type === DESTROY_SESSION)
         state = undefined;
      
      return appReducers(state, action);
};

export default rootReducer;