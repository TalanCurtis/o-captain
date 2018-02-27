import { combineReducers } from 'redux';
import TestA from './testA_reducer';
import TestB from './testB_reducer';

const root_reducer = combineReducers({
    TestA,
    TestB
})

export default root_reducer;