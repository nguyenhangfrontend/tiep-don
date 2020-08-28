import produce from 'immer'
import { xorBy } from 'lodash';
import * as type from './constants';

export const initialState = {
	loading: false,
	error: false,
	editData: {
		services: [],
		errors: [],
		group: {},
		sequences: [],
		rooms: {},
	},
	groupLv1: {},
	departments: [],
	dyeMethods: [],
	biopsyLocations: [],
	users: [],
	services: [],
	patientServices: [],
	patientOnPlanServices: [],
	uom: {},
};

const bookService = (state = initialState, action) =>
	produce(state, draftState => {
		switch (action.type) {
			case type.FETCH_DATA_FAILURE:
				draftState.loading = false;
				draftState.error = false;
				break;

			case type.UPDATE_DEPARTMENT:
				draftState.loading = true;
				draftState.error = false;
				break;
			case type.UPDATE_DEPARTMENT_SUCCESS:
				draftState.departments = action.payload;
				break;

			case type.USERS:
				draftState.loading = true;
				draftState.error = false;
				break;
			case type.USERS_SUCCESS:
				draftState.users = action.payload;
				break;

			case type.TECHNICAL_SERVICE:
				draftState.loading = true;
				draftState.error = false;
				break;
			case type.UPDATE_TECHNICAL_SERVICE:
				draftState.services = action.payload;
				action.payload.forEach(item => {
					if (item.uomId) {
						draftState.uom[item.uomId] = item.uom;
					}
					if (item.serviceGroupLevel1Id) {
						draftState.groupLv1[item.serviceGroupLevel1Id] = item.serviceGroupLevel1;
					}
				});
				break;

			case type.PATIENT_SERVICE:
				draftState.loading = true;
				draftState.error = false;
				break;
			case type.PATIENT_SERVICE_SUCCESS:
				draftState.patientServices = action.payload;
				break;

			case type.REMOVE_PATIENT_SERVICE:
				draftState.loading = true;
				draftState.error = false;
				break;
			case type.REMOVE_PATIENT_SERVICE_SUCCESS:
				draftState.patientServices = xorBy(draftState.patientServices, action.payload, 'id');
				draftState.patientOnPlanServices = xorBy(draftState.patientOnPlanServices, action.payload, 'id');
				break;

			case type.FETCH_DYE_METHODS:
				draftState.loading = true;
				draftState.error = false;
				break;
			case type.FETCH_DYE_METHODS_SUCCESS:
				draftState.dyeMethods = action.payload;
				break;

			case type.FETCH_BIOPSY_LOCATIONS:
				draftState.loading = true;
				draftState.error = false;
				break;
			case type.FETCH_BIOPSY_LOCATIONS_SUCCESS:
				draftState.biopsyLocations = action.payload;
				break;

			case type.PLAN_SERVICES:
				draftState.patientOnPlanServices = action.payload;
				break;

			case type.OPEN_EDIT_SERVICE:
				draftState.editData = {
					...draftState.editData,
					...action.payload,
				};
				break;
			case type.CLEAR_EDIT_SERVICE:
				draftState.editData = initialState.editData;
				break;

			case type.FETCH_SERVICE_ROOMS:
				draftState.loading = true;
				draftState.error = false;
				break;
			case type.FETCH_SERVICE_ROOMS_SUCCESS:
				draftState.editData.rooms = action.payload;
				break;
			case type.EDIT_SERVICE_CALL:
				draftState.loading = true;
				draftState.error = false;
				break;
			case type.EDIT_SERVICE_SUCCESS:
				draftState.loading = false;
				draftState.editData = {
					...draftState.editData,
					services: xorBy(draftState.editData.services, action.payload.success, 'id'),
				};
				draftState.patientServices = [
					...action.payload.success,
					...xorBy(draftState.patientServices, action.payload.success, 'id')
				];
				break;

			case type.ADD_SERVICE:
				draftState.loading = true;
				draftState.error = false;
				break;
			case type.ADD_SERVICE_SUCCESS:
				draftState.loading = false;
				draftState.patientServices = [
					...draftState.patientServices,
					...action.payload.success,
				];
				draftState.patientOnPlanServices = [
					...draftState.patientOnPlanServices,
					...action.payload.success,
				];
				break;

			default:
				break;
		}
	});

export default bookService;
