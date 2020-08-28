import produce from 'immer';
import * as type from './constants';
import constants from 'resources/strings';

export const initialState = {
  patientUser: {},
  patientId: null,
  rooms: [],
  jobIds: [],
  hospitals: [],
  countryIds: [],
  ethnicityIds: [],
  provinceIds: [],
  districtIds: [],
  patient: {},
  patients: [],
  patientsAll: [],
  patientHistories: [],
  counters: [],
  isHightlightPatient: false,
  patientsValue: [],
  isCreate: false,
  isApointment: false,
  isChangeValue: false,
  isEdit: false,
  editType: null,
  departmentId: null,
  ignoreCheckInsurance: true,
  loadingLeft: false,
  loadingRight: false,
  loadingMiddle: false,
  loadingAll: false,
};

const reception = (state = initialState, action) =>
  produce(state, draftState => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case constants.action.action_set_current_patient:
        draftState.patient = action.value || {};
        draftState.fromSuggestList = action.fromSuggestList;
        draftState.patientId = action.value ? action.value.id : '';
        draftState.patientHistories = [];
        draftState.technical_service_selected = [];
        draftState.technicalServiceSelectedToEdit = [];
        break;
      case constants.action.action_set_list_patient_histories:
        draftState.patientHistories = action.value;
        break;
      case constants.action.action_select_counter:
        draftState.counter = action.value;
        break;

      case constants.action.action_disabled_insurance_input:
        draftState.isDisabledInsuranceInput = action.value;
        break;
      case constants.action.action_disabled_service_input:
        draftState.isDisabledServiceInput = action.value;
        break;
      case constants.action.action_save_list_patient:
        draftState.list_patients = action.value;
        break;

      case type.FETCH_DATA_FAILURE:
        draftState.loadingAll = false;
        // draftState.loadingMiddle = false;
        // draftState.loadingLeft = false;
        draftState.error = false;
        break;

      case type.UPDATE_PATIENT:
        draftState.loadingAll = true;
        draftState.patientUser = action.payload;
        break;
      case type.UPDATE_PATIENT_SUCCESS:
        draftState.loadingAll = false;
        draftState.patientUser = action.payload;
        break;

      case type.FETCH_PATIENT:
        draftState.loadingAll = true;
        draftState.error = false;
        break;
      case type.FETCH_PATIENT_SUCCESS:
        draftState.loadingAll = false;
        draftState.patient = action.payload;
        break;
      case type.FETCH_PATIENT_FAILURE:
        draftState.loadingAll = false;
        draftState.patient = action.payload;
        break;

      case type.FETCH_ROOMS:
        draftState.error = false;
        break;
      case type.FETCH_ROOMS_SUCCESS:
        draftState.rooms = action.payload;
        break;

      case type.FETCH_JOBS:
        draftState.error = false;
        break;
      case type.FETCH_JOBS_SUCCESS:
        draftState.jobIds = action.payload;
        break;

      case type.FETCH_HOSPITALS:
        draftState.error = false;
        break;
      case type.FETCH_HOSPITALS_SUCCESS:
        draftState.hospitals = action.payload;
        break;

      case type.FETCH_ETHNICITY:
        draftState.error = false;
        break;
      case type.FETCH_ETHNICITY_SUCCESS:
        draftState.ethnicityIds = action.payload;
        break;

      case type.FETCH_COUNTRY_SUCCESS:
        draftState.countryIds = action.payload;
        break;

      case type.FETCH_PROVINCES_SUCCESS:
        draftState.provinceIds = action.payload;
        break;
      case type.FETCH_DISTRICTS_SUCCESS:
        draftState.districtIds = action.payload;
        break;

      case type.FETCH_ZONE_SUCCESS:
        draftState.zoneIds = action.payload;
        break;

      case type.CREATE_PATIENT_SUCCESS:
        draftState.loadingAll = false;
        draftState.patientCreate = action.payload;
        break;
      case type.CREATE_PATIENT:
        draftState.loadingAll = true;
        draftState.patientCreate = action.payload;
        break;
      case type.CREATE_PATIENT_FAILURE:
        draftState.loadingAll = false;
        draftState.patientCreate = action.payload;
        break;

      case type.CHECK_PATIENT_INSURANCE_BARCODE_SUCCESS:
        draftState.loadingAll = false;
        draftState.patientCreate = action.payload;
        break;
      case type.CHECK_PATIENT_INSURANCE_BARCODE:
        draftState.loadingAll = true;
        draftState.patientCreate = action.payload;
        break;
      case type.CHECK_PATIENT_INSURANCE_BARCODE_FAILURE:
        draftState.loadingAll = false;
        draftState.patientCreate = action.payload;
        break;

      case type.EDIT_PATIENT_SUCCESS:
        draftState.loadingAll = false;
        draftState.patientEdit = action.payload;
        break;
      case type.EDIT_PATIENT:
        draftState.loadingAll = true;
        draftState.patientEdit = action.payload;
        break;
      case type.EDIT_PATIENT_FAILURE:
        draftState.loadingAll = false;
        draftState.patientEdit = action.payload;
        break;

      case type.CLEAR_PATIENT:
        draftState.patient = {};
        break;

      case type.FETCH_COUNTER_SUCCESS:
        draftState.counters = action.payload;
        break;

      case type.FETCH_PATIENTS:
        draftState.loadingAll = true;
        draftState.patients = action.payload;
        break;
      case type.FETCH_PATIENTS_SUCCESS:
        draftState.loadingAll = false;
        draftState.patients = action.payload;
        break;

      case type.FETCH_PATIENTS_ALL:
        draftState.patientsAll = action.payload;
        break;
      case type.FETCH_PATIENTS_All_SUCCESS:
        draftState.patientsAll = action.payload;
        break;

      case type.CHECK_PATIENT_VALUE_SUCCESS:
        draftState.loadingAll = false;
        draftState.patientsValue = action.payload;
        break;
      case type.CHECK_PATIENT_VALUE:
        draftState.loadingAll = true;
        draftState.patientsValue = action.payload;
        break;

      case type.CHECK_PATIENT_PHONE_SUCCESS:
        draftState.loadingAll = false;
        draftState.patientsPhone = action.payload;
        break;
      case type.CHECK_PATIENT_PHONE:
        draftState.loadingAll = true;
        draftState.patientsPhone = action.payload;
        break;

      case type.CHECK_PATIENT_IDNO_SUCCESS:
        draftState.loadingAll = false;
        draftState.patientsIdNo = action.payload;
        break;
      case type.CHECK_PATIENT_IDNO:
        draftState.loadingAll = true;
        draftState.patientsIdNo = action.payload;
        break;

      case type.CHECK_PATIENT_INSURANCE:
        draftState.loadingAll = true;
        draftState.patientsIdNo = action.payload;
        break;
      case type.CHECK_PATIENT_INSURANCE_SUCCESS:
        draftState.loadingAll = false;
        draftState.patientsIdNo = action.payload;
        break;

      case type.CHECK_PATIENT_INSURANCE_PORTAL_SUCCESS:
        draftState.loadingAll = false;
        draftState.patientInsurance = action.payload;
        break;
      case type.CHECK_PATIENT_INSURANCE_PORTAL_FAILURE:
        draftState.loadingAll = false;
        draftState.patientInsurance = action.payload;
        break;
      case type.CHECK_PATIENT_INSURANCE_PORTAL:
        draftState.loadingAll = true;
        draftState.patientInsurance = action.payload;
        break;

      case type.CHECK_IS_CREATE:
        draftState.isCreate = action.payload;
        break;

      case type.SET_VALUE_APOINTMENT:
        draftState.isApointment = action.payload;
        break;

      case type.SET_DATA_CHANGE:
        draftState.isChangeValue = action.payload;
        break;

      case type.SET_IS_EDIT:
        draftState.isEdit = action.payload;
        break;

      case type.SET_EDIT_TYPE:
        draftState.editType = action.payload;
        break;

      case type.SET_DEPARTMENT_ID:
        draftState.departmentId = action.payload;
        break;

      case type.SET_IGNORE_CHECKINSURANCE:
        draftState.departmentId = action.payload;
        break;
    }
  });

export default reception;
