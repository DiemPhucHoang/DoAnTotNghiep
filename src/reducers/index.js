import { combineReducers } from 'redux';
import tutor from './tutor';
import search from './search';
import chooseTutor from './chooseTutor';

const appReducers = combineReducers ({
      tutor,
      search,
      chooseTutor
      
});

export default appReducers;