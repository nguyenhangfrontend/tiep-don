import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { prefix } from './constants';

export const receptionState = state => state[prefix] || initialState;

export const selectPatientUser = () =>
  createSelector(
    receptionState,
    receptionState => receptionState.patientUser,
  );

export const selectPatient = () =>
  createSelector(
    receptionState,
    receptionState => receptionState.patient,
  );

export const selectPatients = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.patients,
	);
export const selectPatientsAll = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.patientsAll,
	);

export const selectCounters = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.counters,
	);

export const selectCounterId = () =>
  createSelector(
    receptionState,
    state => state.counter_id,
  );

export const selectRooms = () =>
  createSelector(
    receptionState,
    state => state.rooms,
  );
export const getEthnicity = () =>
  createSelector(
    receptionState,
    state => state.ethnicity,
  );
  export const selectJobIds = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.jobIds,
	);

export const selectHospitals = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.hospitals,
	);

export const selectEthnicityIds = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.ethnicityIds,
	);
export const selectCountryIds = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.countryIds,
	);
export const selectProvinceIds = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.provinceIds,
	);
export const selectDistrictIds = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.districtIds,
	);
export const selectZoneIds = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.zoneIds,
	);
export const selectCreatePatient = () =>
  createSelector(
    receptionState,
    receptionState => receptionState.patient,
	);
export const selectPatientValue = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.patientsValue,
	);
export const selectCheckPhone = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.patientsPhone,
	);
export const selectCheckIdNo = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.patientsIdNo,
	);
export const selectIsCreate = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.isCreate,
	);
export const selectSetApoinment = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.isApointment,
	);
export const selectdataChange = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.isChangeValue,
	);
export const selectIsEdit = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.isEdit,
	);
export const selectEditType = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.editType,
	);
export const selectDepartmentId = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.departmentId,
	);
export const selectIgnoreCheckInsurance = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.ignoreCheckInsurance,
	);
export const selectLoadingLeft = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.loadingLeft,
	);
export const selectLoadingMiddle = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.loadingMiddle,
	);
export const selectLoadingRight = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.loadingRight,
	);
export const selectLoadingAll = () =>
	createSelector(
		receptionState,
		receptionState => receptionState.loadingAll,
	);