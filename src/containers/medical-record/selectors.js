/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { prefix, LIST_KEY } from './constants';
import { get } from 'lodash';

export const selectMedicalRecord = state => state[prefix] || initialState;

export const selectGlobalState = state => state.global || {};

export const selectPatientList = () =>
  createSelector(
    selectMedicalRecord,
    medicalRecordState => medicalRecordState.patientList,
  );

export const selectDataMenuPdf = () =>
  createSelector(
    selectMedicalRecord,
    medicalRecordState => medicalRecordState.dataMenuPdf,
  );

export const selectMedicalTreatmentSheets = () =>
  createSelector(selectMedicalRecord, state =>
    get(state, ['services', 'mhs', [LIST_KEY.TreetmentSheet]], []),
  );

export const selectMedicalCodeList = () =>
  createSelector(
    selectMedicalRecord,
    medicalRecordState => medicalRecordState.medicalCodeList,
  );

export const selectMedicalBills = () =>
  createSelector(
    selectMedicalRecord,
    medicalRecordState => medicalRecordState.medicalBills,
  );

export const selectAllMedicalRecords = () =>
  createSelector(selectMedicalRecord, state => state.allRecordsUrl || '');

// SELECTOR GET LINK TO PRINT FORM
export const getLinkForm = () =>
  createSelector(selectMedicalRecord, state => get(state, ['linkForm'], {}));

/* START */
export const getServices = () =>
  createSelector(selectMedicalRecord, state => get(state, 'services', {}));

export const selectAllSurgicalService = () =>
  createSelector(selectMedicalRecord, state =>
    get(state, ['services', 'mhs', [LIST_KEY.SurgicalBill]], []),
  );

export const selectAllSpecExamService = () =>
  createSelector(selectMedicalRecord, state =>
    get(state, ['services', 'mhs', [LIST_KEY.SpecExamForm]], []),
  );
/* END */

export const isLoading = () =>
  createSelector(selectMedicalRecord, state => get(state, 'loading', true));

export const selectDataShowMenuLv4 = () =>
  createSelector(selectMedicalRecord, state =>
    get(state, 'dataShowMenuLv4', {}),
  );

export const selectAccesToken = () =>
  createSelector(selectGlobalState, globalState =>
    get(globalState, ['userApp', 'loginToken'], ''),
  );

export const selectItemMedicalInfo = () =>
  createSelector(selectMedicalRecord, medicalRecordState =>
    get(medicalRecordState, 'itemMedicalRecordInfo', {}),
  );
