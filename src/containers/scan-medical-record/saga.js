/**
 * Gets the repositories of the user from Github
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import medicalRecordProvider from 'data-access/medical-record-provider';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

import {
  PATIENT_LIST,
  PATIENT_DOCUMENT,
  FETCH_FORMS,
  UPLOAD_FILES,
  SHOW_PDF
} from './constants';
import {

  searchPatientSuccess,
  fetchPatientSuccess,
  fetchFormsSuccess,
  uploadFilesSuccess,
  showPdfSuccess

} from './actions';

export function* searchpatient({ payload }) {
  try {
    const repos = yield call(medicalRecordProvider.searchPatient, payload);
    yield put(searchPatientSuccess(repos.data));
  } catch (err) {
    // yield put(getListPatientFailure(err));
  }
}
export function* fetchForms({ payload }) {
  
  try {
    const repos = yield call(medicalRecordProvider.fetchForms, payload);
    if(!isEmpty(repos.data)){
      const datas = repos.data.map(item => ({
        value: item.id,
        label: item.name,
      }))
      yield put(fetchFormsSuccess(datas));
    }
    
  } catch (err) {
    // yield put(getListPatientFailure(err));
  }
}

export function* fetPatientDocument({ payload }) {
  try {
    const repos = yield call(medicalRecordProvider.fetchPatientDocument, payload.param);
    yield put(fetchPatientSuccess(repos.data));
    
  } catch (err) {
    // yield put(getListPatientFailure(err));
  }
}

export function* uploadFiles({ payload }) {
 
  try {
    const repos = yield call(medicalRecordProvider.uploadFiles, payload.params);
    yield put(uploadFilesSuccess(repos.data));
    if(repos.code === 0){
      toast.success(`Upload file thành công !`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      yield put(payload.callback());
    }
    
  } catch (err) {
    // yield put(getListPatientFailure(err));
  }
}

export function* showPdf({ payload }) {
  try {
    const repos = yield call(medicalRecordProvider.showPdfFile, payload.param);
    const data = repos.data.arrayBuffer()
    yield put(payload.callback());
    yield put(showPdfSuccess(data));
    
    
  } catch (err) {
    // yield put(getListPatientFailure(err));
  }
}





/* END */

/**
 * Root saga manages watcher lifecycle
 */
export default function* medicalRecord() {
  // Watches for PATIENT_LIST actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  yield takeLatest(PATIENT_LIST, searchpatient);
  yield takeLatest(PATIENT_DOCUMENT, fetPatientDocument);
  yield takeLatest(FETCH_FORMS, fetchForms);
  yield takeLatest(FETCH_FORMS, fetchForms);
  yield takeLatest(UPLOAD_FILES, uploadFiles);
  yield takeLatest(SHOW_PDF, showPdf);

}
