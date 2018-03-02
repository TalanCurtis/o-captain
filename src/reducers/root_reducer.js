import { combineReducers } from 'redux';
// import TestA from './testA_reducer';
// import TestB from './testB_reducer';
import user from './user_reducer';
// import classes from './classes_reducer';

const root_reducer = combineReducers({
    // TestA,
    // TestB
    user
    // classes
})

export default root_reducer;