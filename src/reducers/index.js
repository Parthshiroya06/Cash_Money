import {combineReducers} from 'redux';
import {manageUserData} from './commonReducer';

const rootReducer = combineReducers({userData: manageUserData});

export default rootReducer;
