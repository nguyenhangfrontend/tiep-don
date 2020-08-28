import { createSingleAction } from 'utils/reduxActions';
import * as types from './constants';

// get ListPatient data
export const getListPatient = createSingleAction(types.PATIENT_LIST);
export const getListPatientSuccess = createSingleAction(
  types.PATIENT_LIST_SUCCESS,
);
export const getListPatientFailure = createSingleAction(
  types.PATIENT_LIST_FAILURE,
);

// get MedicalTreatmentSheet data
export const getMedicalTreatmentSheet = createSingleAction(
  types.MEDICAL_TREATMENT_SHEET,
);
export const getMedicalTreatmentSheetSuccess = createSingleAction(
  types.MEDICAL_TREATMENT_SHEET_SUCCESS,
);
export const getMedicalTreatmentSheetFailure = createSingleAction(
  types.MEDICAL_TREATMENT_SHEET_FAILURE,
);

// get medicalCodeList data
export const getMedicalCodeList = createSingleAction(types.MEDICAL_CODE_LIST);
export const getMedicalCodeListSuccess = createSingleAction(
  types.MEDICAL_CODE_LIST_SUCCESS,
);
export const getMedicalCodeListFailure = createSingleAction(
  types.MEDICAL_CODE_LIST_FAILURE,
);

// get medicalBills data
export const medicalBills = createSingleAction(types.MEDICAL_BILLS);
export const medicalBillsSuccess = createSingleAction(
  types.MEDICAL_BILLS_SUCCESS,
);
export const medicalBillsFailure = createSingleAction(
  types.MEDICAL_BILLS_FAILURE,
);

// get all medical records
export const getAllMedicalRecords = createSingleAction(
  types.GET_ALL_MEDICAL_RECORDS,
);
export const getAllMedicalRecordsSuccess = createSingleAction(
  types.GET_ALL_MEDICAL_RECORDS_SUCCESS,
);
export const getAllMedicalRecordsFailure = createSingleAction(
  types.GET_ALL_MEDICAL_RECORDS_FAILURE,
);

// get all services to show submenu on medical records
export const getAllServices = createSingleAction(
  types.GET_ALL_SERVICE_NAME_START,
);
export const getAllServicesSuccess = createSingleAction(
  types.GET_ALL_SERVICE_NAME_SUCCESS,
);
export const getAllServicesFailure = createSingleAction(
  types.GET_ALL_SERVICE_NAME_FAILURE,
);

// get link print form service
export const getForm = createSingleAction(types.GET_FORM_START);
export const getFormSuccess = createSingleAction(types.GET_FORM_SUCCESS);
export const getFormFailure = createSingleAction(types.GET_FORM_FAILURE);

// clear cached state medical record
export const clearCached = createSingleAction(
  types.CLEAR_CACHED_DATA_ON_MEDICAL_RECORD,
);
// clear cached state medical record
export const clearInfoPatient = createSingleAction(types.CLEAR_INFO_PATIENT);

// clear linkform
export const clearLinkForm = createSingleAction(types.CLEAR_LINK_fORM);

// render submenu level 4
export const addDataShowSubMenu = createSingleAction(
  types.ADD_DATA_AND_CONDITION_TO_PDF,
);

// get info item medical from medical code
export const getInfoUserHaveMedicalRecord = createSingleAction(
  types.GET_INFO_USER_HAVE_MEDICAL_RECORD,
);
export const getInfoUserHaveMedicalRecordSuccess = createSingleAction(
  types.GET_INFO_USER_HAVE_MEDICAL_RECORD_SUCCESS,
);
export const getInfoUserHaveMedicalRecordFailed = createSingleAction(
  types.GET_INFO_USER_HAVE_MEDICAL_RECORD_FAILED,
);

// get medical code lastest from patient code
export const getMedicalCodeLastest = createSingleAction(
  types.GET_MEDICAL_CODE_LASTEST,
);
export const getMedicalCodeLastestSuccess = createSingleAction(
  types.GET_MEDICAL_CODE_LASTEST_SUCCESS,
);
export const getMedicalCodeLastestFailed = createSingleAction(
  types.GET_MEDICAL_CODE_LASTEST_FAILED,
);
