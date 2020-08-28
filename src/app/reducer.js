import produce from 'immer'
import {
	ADD_EVENT,
	REMOVE_EVENT,
	ADD_LAYER,
	REMOVE_LAYER,
} from './constants';
import { addLayer, addEvent, removeEvent, removeLayer } from './utils';

export const initialState = {
	layers: [],
};

const app = (state = initialState, action) =>
	produce(state, draftState => {
		const { layers } = state;

		switch (action.type) {
			case ADD_EVENT:
				draftState.layers = addEvent(layers, action.payload);
				break;
			case REMOVE_EVENT:
				draftState.layers = removeEvent(layers, action.payload);
				break;
			case ADD_LAYER:
				draftState.layers = addLayer(layers, action.payload);
				break;
			case REMOVE_LAYER:
				draftState.layers = removeLayer(layers, action.payload);
				break;
			default:
				break;
		}
	});

export default app;
