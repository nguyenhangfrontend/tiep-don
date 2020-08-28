import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { prefix } from './constants';

export const bookServiceState = state => state[prefix] || initialState;

export const selectDepartments = () =>
	createSelector(
		bookServiceState,
		bookServiceState => bookServiceState.departments,
	);

export const selectUsers = () =>
	createSelector(
		bookServiceState,
		bookServiceState => bookServiceState.users,
	);

export const selectServices = () =>
	createSelector(
		bookServiceState,
		bookServiceState => bookServiceState.services,
	);

export const selectPatientOnPlanServices = () =>
	createSelector(
		bookServiceState,
		bookServiceState => bookServiceState.patientOnPlanServices,
	);

export const selectPatientServices = () =>
	createSelector(
		bookServiceState,
		bookServiceState => bookServiceState.patientServices,
	);


export const selectDyeMethods = () =>
	createSelector(
		bookServiceState,
		bookServiceState => bookServiceState.dyeMethods,
	);


export const selectBiopsyLocations = () =>
	createSelector(
		bookServiceState,
		bookServiceState => bookServiceState.biopsyLocations,
	);

export const selectEditData = () =>
	createSelector(
		bookServiceState,
		bookServiceState => bookServiceState.editData,
	);

export const selectUom = () =>
	createSelector(
		bookServiceState,
		bookServiceState => bookServiceState.uom,
	);

export const selectGroupLv1 = () =>
	createSelector(
		bookServiceState,
		bookServiceState => bookServiceState.groupLv1,
	);

