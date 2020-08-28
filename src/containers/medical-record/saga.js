/**
 * Gets the repositories of the user from Github
 */
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import medicalRecordProvider from 'data-access/medical-record-provider';
import {
  PATIENT_LIST,
  MEDICAL_TREATMENT_SHEET,
  MEDICAL_CODE_LIST,
  GET_MEDICAL_CODE_LASTEST,
  MEDICAL_BILLS,
  GET_ALL_MEDICAL_RECORDS,
  GET_ALL_SERVICE_NAME_START,
  GET_FORM_START,
  GET_INFO_USER_HAVE_MEDICAL_RECORD,
} from './constants';
import {
  getInfoUserHaveMedicalRecordSuccess,
  getInfoUserHaveMedicalRecordFailed,
  getListPatientSuccess,
  getListPatientFailure,
  getMedicalTreatmentSheetSuccess,
  getMedicalTreatmentSheetFailure,
  getMedicalCodeListSuccess,
  getMedicalCodeLastestSuccess,
  getMedicalCodeLastestFailed,
  getMedicalCodeListFailure,
  medicalBillsSuccess,
  medicalBillsFailure,
  getAllMedicalRecordsSuccess,
  getAllMedicalRecordsFailure,
  getAllServicesSuccess,
  getAllServicesFailure,
  getFormSuccess,
  getFormFailure,
} from './actions';

export function* patientList({ payload }) {
  try {
    const repos = yield call(medicalRecordProvider.showPatient, payload);
    yield put(getListPatientSuccess(repos.data));
  } catch (err) {
    yield put(getListPatientFailure(err));
  }
}

export function* medicalCodeList({ payload }) {
  try {
    const repos = yield call(medicalRecordProvider.getMedicalCodeList, payload);
    yield put(getMedicalCodeListSuccess(repos));
  } catch (err) {
    yield put(getMedicalCodeListFailure(err));
  }
}

export function* medicalCodeLastest({ payload }) {
  try {
    const { patientValue, history, url } = payload;
    const repos = yield call(
      medicalRecordProvider.getLastestMedicalCode,
      patientValue,
    );
    const { data } = repos;
    const { patientDocument } = data[0] || {};
    if (url) {
      let urlPush;
      if (url.slice(-1) === '/') {
        urlPush = url.substring(0, url.length - 1);
      } else {
        urlPush = url;
      }
      history.push(`${urlPush}/${patientDocument}`);
    }
  } catch (err) {
    yield put(getMedicalCodeLastestFailed(err));
  }
}

export function* medicalTreatmentSheet({ payload }) {
  try {
    const repos = yield call(
      medicalRecordProvider.getMedicalTreatmentSheet,
      payload,
    );
    const data = repos.data;
    let medicalTreatmentSheets = [];
    if (repos.code === 0) {
      medicalTreatmentSheets = data.sort((a, b) => {
        return a.actDate < b.actDate ? 1 : -1;
      });
    }
    yield put(getMedicalTreatmentSheetSuccess(medicalTreatmentSheets));
  } catch (err) {
    yield put(getMedicalTreatmentSheetFailure(err));
  }
}

export function* medicalBills({ payload }) {
  try {
    const repos = yield call(medicalRecordProvider.getMedicalBill, payload);
    yield put(medicalBillsSuccess(repos));
  } catch (err) {
    yield put(medicalBillsFailure(err));
  }
}

export function* getInfoUserFromMedicalCode({ payload }) {
  try {
    const repos = yield call(
      medicalRecordProvider.getInfoUserHaveMedicalRecord,
      payload,
    );
    const { data } = repos || {};
    const { patientValue } = data || {};
    const response = yield call(
      medicalRecordProvider.getMedicalCodeList,
      patientValue,
    );
    const { data: listMedicalCode } = response;
    yield put(getInfoUserHaveMedicalRecordSuccess(data));
    yield put(getMedicalCodeListSuccess(listMedicalCode));
  } catch (err) {
    yield put(getInfoUserHaveMedicalRecordFailed(err));
  }
}

export function* getAllMedicalRecords({ payload }) {
  try {
    const response = yield call(
      medicalRecordProvider.getMedicalRecords,
      payload,
    );
    yield put(getAllMedicalRecordsSuccess(response.data));
  } catch (error) {
    yield put(getAllMedicalRecordsFailure(error));
  }
}

/* START CONST DANH CHO PHAN LAY DANH SACH TEN SUBMENU */
function getFuncCallWhenStart(idRowMenu) {
  return {
    [idRowMenu]: {
      funcCallWhenStart: medicalRecordProvider.getAllServicesName,
    },
  };
}

// tra ve object chua cac func se call khi bat dau, success, fail
const mapTypeMenuToFunc = idRowMenu => {
  const initialFunc = {
    funcCallWhenSuccess: services => getAllServicesSuccess(services, idRowMenu),
    funcCallWhenFailed: error => getAllServicesFailure(error),
  };
  return {
    ...initialFunc,
    ...getFuncCallWhenStart(idRowMenu)[idRowMenu],
  };
};
/* END */

/* START LAY LINK DE HIEN THI FORM */
function getFuncCallWhenStartGetForm(keyItem) {
  return {
    [keyItem]: {
      funcCallWhenStart: medicalRecordProvider.getLinkForm,
    },
  };
}

const mapKeyToFunc = keyItem => {
  const initialFunc = {
    funcCallWhenSuccess: services => getFormSuccess(services, keyItem),
    funcCallWhenFailed: error => getFormFailure(error),
  };
  return {
    ...initialFunc,
    ...getFuncCallWhenStartGetForm(keyItem)[keyItem],
  };
};

/* END */

/* 2 SAGA DUNG CHUNG CHO VIEC LAY DANH SACH TEN SUB MENU CAP 2 VA LAY LINK HIEN THI FILE PDF KHI CLICK SUBMENU */

// lay ra mang chua danh sach ten cac phan tu trong submenu cap 2 trong ho so benh an
export function* getServices({ payload }) {
  const { idRow, keyTotalMenu } = payload;
  const funcGetServices = mapTypeMenuToFunc(idRow);
  try {
    const response = yield call(funcGetServices.funcCallWhenStart, payload);
    const services =
      idRow === 'TreetmentSheet'
        ? response.data
        : response.data.map(item => ({
            id: item.id,
            name: item.serviceName,
            date: item.actDate,
          }));
    yield put(
      funcGetServices.funcCallWhenSuccess({ services, idRow, keyTotalMenu }),
    );
  } catch (error) {
    yield put(funcGetServices.funcCallWhenFailed(error));
  }
}

// lay ra duong link de tai form dich vu (ten dich vu trong submenu cap 2 o ho so benh an)
export function* getServiceForm({ payload }) {
  const { keyItem } = payload;
  const funcGetLink = mapKeyToFunc(keyItem);
  try {
    const response = yield call(funcGetLink.funcCallWhenStart, payload);
    const { data } = response || {};
    yield put(funcGetLink.funcCallWhenSuccess({ keyItem, data }));
  } catch (error) {
    yield put(funcGetLink.funcCallWhenFailed(error));
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

  yield takeLatest(PATIENT_LIST, patientList);
  yield takeLatest(MEDICAL_CODE_LIST, medicalCodeList);
  yield takeLatest(GET_MEDICAL_CODE_LASTEST, medicalCodeLastest);
  yield takeLatest(MEDICAL_TREATMENT_SHEET, medicalTreatmentSheet);
  yield takeLatest(MEDICAL_BILLS, medicalBills);
  yield takeLatest(GET_ALL_MEDICAL_RECORDS, getAllMedicalRecords);

  // effect lang nghe cac action gan nhat lay danh sach cac dich vu trong submenu
  yield takeEvery(GET_ALL_SERVICE_NAME_START, getServices);

  // effect lang nghe cac action gan nhat lay link pdf file dich vu
  yield takeLatest(GET_FORM_START, getServiceForm);

  yield takeLatest(
    GET_INFO_USER_HAVE_MEDICAL_RECORD,
    getInfoUserFromMedicalCode,
  );
}
