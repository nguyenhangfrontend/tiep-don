import produce from 'immer';
import * as types from './constants';

export const initialState = {
  loading: false,
  error: null,
  token: '',
  userInfo: {},
};

const homeReducer = (state = initialState, action) =>
  produce(state, draftState => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case types.GET_TOKEN_FROM_CODE_START:
        draftState.loading = true;
        break;

      case types.GET_TOKEN_FROM_CODE_SUCCESS:
        draftState.token = action.payload;
        draftState.loading = false;
        break;

      case types.GET_USER_INFO_SUCCESS:
        draftState.userInfo = action.payload;
        draftState.loading = false;
        break;

      case types.GET_TOKEN_FROM_CODE_FAILURE:
        draftState.error = action.error;
        draftState.loading = false;
        break;

      default:
        return state;
    }
  });

export default homeReducer;
