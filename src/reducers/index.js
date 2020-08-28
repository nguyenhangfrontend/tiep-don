import produce from 'immer';
import constants from 'resources/strings';
import clientUtils from 'utils/client-utils';
import { GET_USER_INFO_SUCCESS } from 'containers/AppPrimary/constants';
export const initialState = {
  userApp: {
    currentUser: {},
    isLogin: false,
    role: '',
    department: {},
    username: '',
    isSaveAcc: '',
    loginToken: '',
    tokenRole: '',
    counter_id: {
      counter: {
        value: 0,
      },
      isOpenCounter: false,
    },
  },
  last_time: null,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.action.action_user_chose_role:
        draft.userApp.role = action.value;
        break;
      case constants.action.action_select_counter:
        draft.userApp.counter_id = action.value;
        break;
      case constants.action.action_user_department:
        draft.userApp.department = action.value;
        break;
      case constants.action.action_current_userName:
        draft.userApp.username = action.value;
        break;
      case constants.action.action_current_isSaveAcc:
        draft.userApp.isSaveAcc = action.value;
        break;
      case constants.action.action_last_time:
        draft.last_time = action.value;
        break;
      // case constants.action.action_user_login:
      //   try {
      //     draft.userApp.currentUser = action.value || {};
      //     if (action.value) {
      //       let expiresIn = new Date(
      //         draft.userApp.currentUser.authentication.expiresIn,
      //       );
      //       draft.userApp.isLogin =
      //         draft.userApp.currentUser &&
      //         draft.userApp.currentUser.authentication.accessToken &&
      //         new Date() < expiresIn;
      //       draft.userApp.loginToken = draft.userApp.tokenRole
      //         ? draft.userApp.tokenRole
      //         : draft.userApp.currentUser
      //         ? draft.userApp.currentUser.authentication.accessToken
      //         : '';
      //       clientUtils.auth = draft.userApp.loginToken;
      //       draft.userApp.unReadNotificationCount = 0;
      //       // break
      //     }
      //   } catch (error) {}
      //   break;
      case GET_USER_INFO_SUCCESS:
        draft.userApp.currentUser = action.payload;
        draft.userApp.isLogin = true;
        break;
      case constants.action.action_get_token_role:
        if (draft.userApp.currentUser.authentication) {
          draft.userApp.tokenRole = action.value;
          if (action.value) {
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            let expiresIn = draft.userApp.currentUser.authentication
              ? new Date(draft.userApp.currentUser.authentication.expiresIn)
              : tomorrow;
            draft.userApp.isLogin =
              draft.userApp.currentUser &&
              draft.userApp.currentUser.authentication.accessToken &&
              new Date() < expiresIn;
            draft.userApp.loginToken = draft.userApp.tokenRole
              ? draft.userApp.tokenRole
              : draft.userApp.currentUser
              ? draft.userApp.currentUser.authentication.accessToken
              : '';
            clientUtils.auth = draft.userApp.tokenRole;
            draft.userApp.unReadNotificationCount = 0;
          }
        } else {
          if (action.value) {
            draft.userApp.tokenRole = action.value;
            draft.userApp.loginToken = action.value;
            draft.userApp.isLogin = true;
            draft.userApp.role = action.value;
            let date = new Date();
            date = date.setDate(date.getDate() + 1);
            draft.userApp.currentUser = {
              authentication: { expiresIn: date },
              role: action.value,
            };
          }
        }
        break;

      case constants.action.action_user_logout:
        draft.userApp.unReadNotificationCount = 0;
        draft.userApp.currentUser = {};
        draft.userApp.isLogin = false;
        draft.counter_id = '';
        draft.last_time = null;
        draft.userApp.loginToken = '';
        clientUtils.auth = '';
        break;

      case constants.action.action_change_is_addded_save:
        draft.isAddedPatient = !state.isAddedPatient;
        break;
      case constants.action.action_save_data_job:
        draft.jobIds = action.value || [];
        break;
      case constants.action.action_save_data_hospital:
        draft.hospitals = action.value || [];
        break;
      case constants.action.action_set_data_save_or_not:
        draft.data_change = action.value || false;
        break;
      case constants.action.action_edit:
        draft.isEdit = action.value || false;
        break;
      case constants.action.action_save_valueOnChangeCheck:
        draft.valueOnChangeCheck = action.value;
        break;
      case constants.action.action_set_birthday_change_or_not:
        draft.birthday_change = action.value || false;
        break;
      case constants.action.action_set_sequenceNo:
        draft.sequenceNo = action.value || false;
        break;
    }
  });

export default appReducer;
