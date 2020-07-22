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

export default appReducers;