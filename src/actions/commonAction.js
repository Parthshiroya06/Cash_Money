import {redTypes} from '@constants';

export const saveUserData = param => {
  return {
    type: redTypes.LOGIN_DATA,
    params: param,
  };
};
