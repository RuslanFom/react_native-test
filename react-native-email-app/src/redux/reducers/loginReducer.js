import * as types from '../types';

const initialState = {
  user: {},
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_DATA:
      return {...state};
    default:
      return state;
  }
};
