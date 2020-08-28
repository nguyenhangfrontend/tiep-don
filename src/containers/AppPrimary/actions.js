import { createSingleAction } from 'utils/reduxActions';
import * as types from './constants';

// get token data
export const getTokenFromCodeStart = createSingleAction(
  types.GET_TOKEN_FROM_CODE_START,
);
export const getTokenFromCodeSuccess = createSingleAction(
  types.GET_TOKEN_FROM_CODE_SUCCESS,
);
export const getTokenFromCodeFailure = createSingleAction(
  types.GET_TOKEN_FROM_CODE_FAILURE,
);

// get userInfo data
export const getUserInfo = createSingleAction(
  types.GET_USER_INFO,
);
export const getUserInfoSuccess = createSingleAction(
  types.GET_USER_INFO_SUCCESS,
);
export const getUserInfoFailure = createSingleAction(
  types.GET_USER_INFO_FAILURE,
);
