import { createSingleAction } from 'utils/reduxActions';
import * as types from './constants';

export const addEvent = createSingleAction(types.ADD_EVENT);
export const removeEvent = createSingleAction(types.REMOVE_EVENT);
export const addLayer = createSingleAction(types.ADD_LAYER);
export const removeLayer = createSingleAction(types.REMOVE_LAYER);
