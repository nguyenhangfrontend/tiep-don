import { createSingleAction } from 'utils/reduxActions';
import * as types from './constants';

export const showModal = createSingleAction(types.SHOW_MODAL);
export const topModal = createSingleAction(types.TOP_MODAL);
export const replaceModal = createSingleAction(types.REPLACE_MODAL);
export const hideModal = createSingleAction(types.HIDE_MODAL);
