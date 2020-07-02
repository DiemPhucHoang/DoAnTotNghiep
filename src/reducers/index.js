import { combineReducers } from 'redux';
import tutor from './tutor';
import searchTutor from './searchTutor';
import chooseTutor from './chooseTutor';
import classes from './classes';
import searchClass from './searchClass';
import auth from './auth';
import tutorRegisterClass from './tutorRegisterClass';

const appReducers = combineReducers ({
      auth,
      tutor,
      searchTutor,
      chooseTutor,
      classes,
      searchClass,
      tutorRegisterClass
});

export default appReducers;