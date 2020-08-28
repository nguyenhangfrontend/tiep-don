/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import printProvider from 'data-access/print-provider';
import { receptionForm } from 'data-access/receive';

import { HISTORY_SIGNED, PDF_HOSPITALIZED } from './constants';
import {
  getpdfHospitalizedFailure,
  getpdfHospitalizedSuccess,
  getHistorySignedSuccess,
  getHistorySignedFailure,
} from './actions'

export function* historySigned({ payload }) {
  try {
    const repos = yield call(
      printProvider.historySigned,
      payload.patientDocument,
      payload.formValue,
      payload.recordId || '',
    )
    yield put(getHistorySignedSuccess(repos))
  } catch (err) {
    yield put(getHistorySignedFailure(err))
  }
}

export function* pdfHospitalized({ payload }) {
  try {
    const repos = yield call(printProvider.getPdfHospitalized, payload)
    yield put(getpdfHospitalizedSuccess(repos))
  } catch (err) {
    yield put(getpdfHospitalizedFailure(err))
  }
}

export function* receiveForm({ payload }) {
  try {
    const repos = yield call(printProvider.getPdfHospitalized, payload)
    yield put(getpdfHospitalizedSuccess(repos))
  } catch (err) {
    yield put(getpdfHospitalizedFailure(err))
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* medicalRecord() {
  // Watches for PATIENT_LIST actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(HISTORY_SIGNED, historySigned)
  yield takeLatest(PDF_HOSPITALIZED, pdfHospitalized)
}
