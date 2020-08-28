/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { prefix } from './constants';
import { get } from 'lodash';

export const selectMedicalRecordScan = state => state[prefix] || initialState;

export const selectGlobalState = state => state.global || {};
export const selectLoadingAll = () =>
	createSelector(
		selectMedicalRecordScan,
		selectMedicalRecordScan => selectMedicalRecordScan.loadingAll,
	);
export const selectPatientList = () =>
  createSelector(
    selectMedicalRecordScan,
    medicalRecordScanState => medicalRecordScanState.patientListScan,
  );

export const selectPatient = () =>
  createSelector(
    selectMedicalRecordScan,
    medicalRecordScanState => medicalRecordScanState.patient,
  );

export const selectForm = () =>
  createSelector(
    selectMedicalRecordScan,
    medicalRecordScanState => medicalRecordScanState.forms,
  );
export const selectFile = () =>
  createSelector(
    selectMedicalRecordScan,
    medicalRecordScanState => medicalRecordScanState.file,
  );

