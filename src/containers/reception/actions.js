import * as types from './constants';
import { createSingleAction } from 'utils/reduxActions'

export const fetchFailure = createSingleAction(types.FETCH_DATA_FAILURE);

export const updatePatient = createSingleAction(types.UPDATE_PATIENT);

export const checkIsCreate = createSingleAction(types.CHECK_IS_CREATE);

export const setIsEdit = createSingleAction(types.SET_IS_EDIT);

export const setEditType = createSingleAction(types.SET_EDIT_TYPE);

export const setDepartmentId = createSingleAction(types.SET_DEPARTMENT_ID);

export const setValueApointment = createSingleAction(types.SET_VALUE_APOINTMENT);

export const setIgnoreCheckInsurance = createSingleAction(types.SET_IGNORE_CHECKINSURANCE);

export const setDataChange = createSingleAction(types.SET_DATA_CHANGE);

export const fetchPatient = createSingleAction(types.FETCH_PATIENT);
export const fetchPatientSuccess = createSingleAction(types.FETCH_PATIENT_SUCCESS);

export const fetchPatients = createSingleAction(types.FETCH_PATIENTS);
export const fetchPatientsSuccess = createSingleAction(types.FETCH_PATIENTS_SUCCESS);

export const fetchPatientsAll = createSingleAction(types.FETCH_PATIENTS_ALL);
export const fetchPatientsAllSuccess = createSingleAction(types.FETCH_PATIENTS_All_SUCCESS);

export const openCloseCounter = createSingleAction(types.OPENCLOSE_COUNTER);
export const openCloseCounterSuccess = createSingleAction(types.OPENCLOSE_COUNTER_SUCCESS);

export const fetchRooms = createSingleAction(types.FETCH_ROOMS);
export const fetchRoomsSuccess = createSingleAction(types.FETCH_ROOMS_SUCCESS);

// get jobs
export const getJobs = createSingleAction(types.FETCH_JOBS);
export const getJobsSuccess = createSingleAction(types.FETCH_JOBS_SUCCESS);

// get hospitals
export const getHospitals = createSingleAction(types.FETCH_JOBS);

// get ethnicity
export const getEthnicity = createSingleAction(types.FETCH_ETHNICITY);
export const getEthnicitySuccess = createSingleAction(types.FETCH_ETHNICITY_SUCCESS);

// get country
export const getCountry= createSingleAction(types.FETCH_COUNTRY);
export const getCountrySuccess = createSingleAction(types.FETCH_COUNTRY_SUCCESS);

export const getProvinces= createSingleAction(types.FETCH_PROVINCES);
export const getProvincesSuccess = createSingleAction(types.FETCH_PROVINCES_SUCCESS);

export const getDistricts= createSingleAction(types.FETCH_DISTRICTS);
export const getDistrictsSuccess = createSingleAction(types.FETCH_DISTRICTS_SUCCESS);

export const getZones= createSingleAction(types.FETCH_ZONE);

export const createPatient= createSingleAction(types.CREATE_PATIENT);
export const createPatientSuccess = createSingleAction(types.CREATE_PATIENT_SUCCESS);

export const editPatient= createSingleAction(types.EDIT_PATIENT);
export const editPatientSuccess = createSingleAction(types.EDIT_PATIENT_SUCCESS);

export const clearPatient = createSingleAction(types.CLEAR_PATIENT);

export const fetchCounter = createSingleAction(types.FETCH_COUNTER);
export const fetchCounterSuccess = createSingleAction(types.FETCH_COUNTER_SUCCESS);

export const getPatientValue = createSingleAction(types.CHECK_PATIENT_VALUE);
export const getPatientValueSuccess = createSingleAction(types.CHECK_PATIENT_VALUE_SUCCESS);

export const getPatientPhone = createSingleAction(types.CHECK_PATIENT_PHONE);
export const getPatientPhoneSuccess = createSingleAction(types.CHECK_PATIENT_PHONE_SUCCESS);

export const getPatientIdNo = createSingleAction(types.CHECK_PATIENT_IDNO);
export const getPatientIdNoSuccess = createSingleAction(types.CHECK_PATIENT_IDNO_SUCCESS);

export const getPatientInsuranceNumber = createSingleAction(types.CHECK_PATIENT_INSURANCE);
export const getPatientInsuranceNumberSuccess = createSingleAction(types.CHECK_PATIENT_INSURANCE_SUCCESS);

export const getPatientInsuranceBarcode = createSingleAction(types.CHECK_PATIENT_INSURANCE_BARCODE);
export const getPatientInsuranceBarcodeSuccess = createSingleAction(types.CHECK_PATIENT_INSURANCE_BARCODE_SUCCESS);

export const getPatientInsurancePortal = createSingleAction(types.CHECK_PATIENT_INSURANCE_PORTAL);
export const getPatientInsurancePortalSuccess = createSingleAction(types.CHECK_PATIENT_INSURANCE_PORTAL_SUCCESS);

export const getPatientMultipeSuggest = createSingleAction(types.CHECK_PATIENT_MULTIPE_SUGGEST);
export const getPatientMultipeSuggestSuccess = createSingleAction(types.CHECK_PATIENT_MULTIPE_SUGGEST_SUCCESS);

export const nextPatient = createSingleAction(types.NEXT_PATIENT);
export const nextPatientSuccess = createSingleAction(types.NEXT_PATIENT_SUCCESS);
export const uploadImage = createSingleAction(types.UPLOAD_IMAGE);
export const uploadImageSuccess = createSingleAction(types.UPLOAD_IMAGE_SUCCESS);

export const scanId = createSingleAction(types.SCAN_ID);
export const scanIdSuccess = createSingleAction(types.SCAN_ID_SUCCESS);


