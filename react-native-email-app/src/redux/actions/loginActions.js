import * as types from '../types';

export const setUserData = data => ({
  type: types.SET_USER_DATA,
  payload: data,
});
