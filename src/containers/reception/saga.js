import ZoneDB from 'utils/IndexedDB/Zones';
import HospitalDB from 'utils/IndexedDB/Hospital';
import { call, put, takeLatest } from 'redux-saga/effects';
import { checkCode, getPropsDuplicate } from './utils';
import {
  fetchPatient,
  fetchWaitingPatient,
  fetchPatients,
} from 'data-access/users';
import { fetchRooms } from 'data-access/rooms';
import * as receiveServices from 'data-access/receive';
import * as type from './constants';
import * as actions from './actions';
import SuggestListModal from 'containers/reception/components/Middle/SuggesModal';
import InsuranceModal from 'containers/reception/components/Middle/InsuranceModal';

export function* getRooms({ payload }) {
  try {
    const repos = yield call(fetchRooms, payload);
    yield put(
      actions.fetchRoomsSuccess(
        repos.data.map(item => ({ ...item, value: item.id, label: item.name })),
      ),
    );
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}

export function* getPatient({ payload }) {
  try {
    const repos = yield call(
      payload.patientId ? fetchPatient : fetchWaitingPatient,
      payload,
    );
    yield put(actions.fetchPatientSuccess(repos.data));
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}

export function* getEthnicity({ payload }) {
  try {
    const res = yield call(receiveServices.fetchEthnicity, payload);
    yield put(
      actions.getEthnicitySuccess(
        res.data.map(item => ({ ...item, value: item.id, label: item.name })),
      ),
    );
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}

export function* getJobs({ payload }) {
  try {
    const res = yield call(receiveServices.fetchJobs, payload);
    yield put(
      actions.getJobsSuccess(
        res.data.map(item => ({ ...item, value: item.id, label: item.name })),
      ),
    );
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}

export function* getHospitals({ payload }) {
  try {
    const res = yield call(receiveServices.fetchHospital, payload);
    HospitalDB.putMore(res.data);
    // yield put(getHospitalsSuccess(res.data.map(item => ({ ...item, value: item.id, label: item.name }))));
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}
export function* getCountry({ payload }) {
  try {
    const res = yield call(receiveServices.fetchCountry, payload);
    yield put(
      actions.getCountrySuccess(
        res.data.map(item => ({ ...item, value: item.id, label: item.name })),
      ),
    );
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}
export function* getProvince({ payload }) {
  try {
    const res = yield call(receiveServices.fetchProvince, payload);
    yield put(
      actions.getProvincesSuccess(
        res.data.map(item => ({ ...item, value: item.id, label: item.name })),
      ),
    );
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}
export function* getDistrict({ payload }) {
  try {
    const res = yield call(receiveServices.fetchDistrict, payload);

    yield put(
      actions.getDistrictsSuccess(
        res.data.map(item => ({ ...item, value: item.id, label: item.name })),
      ),
    );
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}
export function* getZone({ payload }) {
  try {
    const res = yield call(receiveServices.fetchZone, payload);
    const districts = {};
    res.data.forEach(item => {
      districts[item.districtId] = item.districtId;
    });

    const data = Object.keys(districts)
      .map(key => parseFloat(key))
      .map(key => ({
        id: key,
        districtId: key,
        zones: res.data
          .filter(zone => zone.districtId === key)
          .map(zone => ({ ...zone, value: zone.id, label: zone.name })),
      }));

    ZoneDB.putMore(data);
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}
export function* createPatientReceive({ payload }) {
  try {
    const res = yield checkCode(
      receiveServices.createPatient,
      payload.body,
      'Tạo mới người bệnh',
    );
    if (res.code === 0) {
      payload.callback(res.data.id);
    }
    yield put(actions.createPatientSuccess(res.data));
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}

export function* editPatientReceive({ payload }) {
  try {
    const res = yield checkCode(
      receiveServices.editPatient,
      payload.body,
      'Sửa người bệnh ',
    );
    if (res.code === 0) {
      payload.callback(res.data.id);
      yield put(actions.fetchPatientSuccess(res.data));
    }
   
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}

export function* getCounter({ payload }) {
  try {
    const res = yield call(receiveServices.fetchCounter, payload);
    yield put(
      actions.fetchCounterSuccess(
        res.data.map(item => ({ ...item, value: item.id, label: item.name })),
      ),
    );
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}

export function* getPatients({ payload }) {
  try {
    const res = yield call(fetchPatients, payload.params);

    yield put(actions.fetchPatientsSuccess(res.data));
   
    payload.callback()

    
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}

export function* getPatientsAll({ payload }) {
  try {
    const res = yield call(fetchPatients, payload);
    
    yield put(actions.fetchPatientsAllSuccess(res.data));
   

    
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}

export function* getPatientValue({ payload }) {
  try {
    const res = yield call(receiveServices.getPatientValue, payload.param);
    yield put(actions.getPatientValueSuccess(res.data));
    if (res.data && res.data.length) {
      yield getPropsDuplicate(res.data, SuggestListModal, payload);
    }
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}

export function* getPatientPhone({ payload }) {
  try {
    const res = yield call(receiveServices.checkDupplicatePhone, payload.param);

    yield put(actions.getPatientPhoneSuccess(res.data));
    if (res.data.length > 0) {
      yield getPropsDuplicate(res.data, SuggestListModal, payload);
    }
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}

export function* getPatientIdNo({ payload }) {
  try {
    const res = yield call(receiveServices.checkDupplicateIdNo, payload.param);

    yield put(actions.getPatientIdNoSuccess(res.data));
    const data = [res.data];
    if (res.data) {
      yield getPropsDuplicate(data, SuggestListModal, payload);
    }
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}

export function* getPatientInsuranceNumber({ payload }) {
  try {
    const res = yield call(
      receiveServices.checkDupplicateInsuranceNumber,
      payload.param,
    );

    yield put(actions.getPatientInsuranceNumberSuccess(res.data));
    const data = [res.data];
    if (res.data) {
      yield getPropsDuplicate(data, SuggestListModal, payload);
      yield put(payload.getPatientInsurancePortal(payload.insurancePortal));
    }
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}

export function* getPatientInsuranceBarcode({ payload }) {
  try {
    
    const res = yield checkCode(
      receiveServices.checkBarcodeInsurance,
      payload.param,
    );
    const data = { ...res.data.insuranceCard, patientType: 2 };
    // yield put(actions.fetchPatientSuccess(data));
    if(res.data.insuranceCard){
      yield put(payload.callback(data));
    }
    
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}

export function* getPatientInsurancePortal({ payload }) {
  try {
    const res = yield checkCode(
      receiveServices.checkPortalInsurance,
      payload.params,
    );
    yield getPropsDuplicate(res.data || {}, InsuranceModal, payload);
    yield put(actions.getPatientInsurancePortalSuccess(res.data));
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}

export function* getPatientMultipeSuggest({ payload }) {
  try {
    const res = yield call(
      receiveServices.checkPatientMultipeSuggest,
      payload.params,
    );
    if(res.data.length){
      yield getPropsDuplicate(res.data || {}, SuggestListModal, payload);
    }
    
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}

    
export function* uploadImage({ payload }) {
  try {
    
    const res = yield checkCode(
      receiveServices.uploadImage,
      payload.param,
      'Chụp ảnh người bệnh ',
    );
    if(res.code === 0){
      payload.callback(res.data);
    }
    
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}

export function* scanId({ payload }) {
  try {
    
    const res = yield checkCode(
      receiveServices.scanId,
      payload.param,
      'Scan CMT/ Hộ chiếu ',
    );
    if(res.code === 0){
      payload.callback(res.data);
    }
    
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}
export function* nextPatient({ payload }) {
  try {
    const res = yield call(
      receiveServices.nextPatient,
      payload.param,
    );
    yield put(actions.fetchPatientsSuccess(res.data));
    yield put(payload.callback(res.data));
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}
export function* openCloseCounter({ payload }) {
  try {
    const res = yield call(
      receiveServices.openCloseCounter,
      payload.paramOpenCounter,
    );
    
    yield put(payload.callback(res.data));
  } catch (err) {
    yield put(actions.fetchFailure(err));
  }
}

export default function* reception() {
  yield takeLatest(type.FETCH_PATIENT, getPatient);
  yield takeLatest(type.FETCH_ROOMS, getRooms);
  yield takeLatest(type.FETCH_JOBS, getJobs);
  yield takeLatest(type.FETCH_HOSPITALS, getHospitals);
  yield takeLatest(type.FETCH_ETHNICITY, getEthnicity);
  yield takeLatest(type.FETCH_COUNTRY, getCountry);
  yield takeLatest(type.FETCH_PROVINCES, getProvince);
  yield takeLatest(type.FETCH_DISTRICTS, getDistrict);
  yield takeLatest(type.FETCH_ZONE, getZone);
  yield takeLatest(type.CREATE_PATIENT, createPatientReceive);
  yield takeLatest(type.FETCH_COUNTER, getCounter);
  yield takeLatest(type.FETCH_PATIENTS, getPatients);
  yield takeLatest(type.FETCH_PATIENTS_ALL, getPatientsAll);
  yield takeLatest(type.CHECK_PATIENT_VALUE, getPatientValue);
  yield takeLatest(type.CHECK_PATIENT_PHONE, getPatientPhone);
  yield takeLatest(type.CHECK_PATIENT_IDNO, getPatientIdNo);
  yield takeLatest(type.CHECK_PATIENT_INSURANCE, getPatientInsuranceNumber);
  yield takeLatest(type.CHECK_PATIENT_INSURANCE_BARCODE, getPatientInsuranceBarcode);
  yield takeLatest(type.CHECK_PATIENT_INSURANCE_PORTAL, getPatientInsurancePortal);
  yield takeLatest(type.CHECK_PATIENT_MULTIPE_SUGGEST, getPatientMultipeSuggest);
  yield takeLatest(type.NEXT_PATIENT, nextPatient);
  yield takeLatest(type.UPLOAD_IMAGE, uploadImage);
  yield takeLatest(type.SCAN_ID, scanId);
	yield takeLatest(type.EDIT_PATIENT, editPatientReceive);
	yield takeLatest(type.OPENCLOSE_COUNTER, openCloseCounter);
  
}
