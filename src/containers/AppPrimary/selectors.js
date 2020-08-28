import { get } from 'lodash';

export const selectTokenWithUserNotLogin = state =>
  get(state, 'Home.token', '');
