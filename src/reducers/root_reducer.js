import { combineReducers } from 'redux';
// import TestA from './testA_reducer';
// import TestB from './testB_reducer';
import user from './user_reducer';

const root_reducer = combineReducers({
    // TestA,
    // TestB
    user
})

export default root_reducer;