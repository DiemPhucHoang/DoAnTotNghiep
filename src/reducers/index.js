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
import parentRegisterTutor from './parentRegisterTutor';
import parent from './parent';
import users from './users';
import searchUser from './searchUser';
import invoices from './invoices';

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
      rate,

      parent,
      users,
      searchUser,
      invoices,
      parentRegisterTutor

});

export default appReducers;