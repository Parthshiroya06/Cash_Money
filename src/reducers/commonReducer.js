import {redTypes} from '@constants';

export const manageUserData = (state = {isLoggedIn: false}, action) => {
  switch (action.type) {
    case redTypes.LOGIN_DATA:
      return {...state, ...action.params};
    default:
      return state;
  }
};
