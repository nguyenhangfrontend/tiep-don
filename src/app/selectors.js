import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { prefix } from './constants';

export const receptionState = state => state[prefix] || initialState;

export const selectLayers = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.layers,
	);
